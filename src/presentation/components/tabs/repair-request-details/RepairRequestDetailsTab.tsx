import DeviceInfoCard from "@/presentation/components/tabs/repair-request-details/DeviceInfoCard.tsx";
import {
    useDeleteRepairRequest,
    useRepairRequests,
    useUpdateRepairRequest
} from "@/presentation/hooks/entities/repair-request.ts";
import IssueCard from "@/presentation/components/tabs/repair-request-details/IssueCard.tsx";
import FailureTypesCard from "@/presentation/components/tabs/repair-request-details/FailureTypesCard.tsx";
import {useFailureTypes} from "@/presentation/hooks/entities/failure-type.ts";
import {useEffect, useMemo, useRef, useState} from "react";
import type {Status} from "@/domain/entities/repair-request.ts";
import StatusBarCard from "@/presentation/components/tabs/repair-request-details/StatusBarCard.tsx";
import SparePartCard from "@/presentation/components/tabs/repair-request-details/SparePartCard.tsx";
import SparePartCardModal from "@/presentation/components/tabs/repair-request-details/spare-part-modal/SparePartCardModal.tsx";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import NotesCard from "@/presentation/components/tabs/repair-request-details/NotesCard.tsx";
import StatusHistory from "@/presentation/components/tabs/repair-request-details/StatusHistory.tsx";
import RepairHistory from "@/presentation/components/tabs/repair-request-details/RepairHistory.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {FileText, Save, Trash} from "lucide-react";
import PhotosCard from "@/presentation/components/tabs/repair-request-details/PhotosCard.tsx";
import {useAuthSession} from "@/presentation/hooks/auth.ts";
import NotFoundTab from "@/presentation/components/tabs/not-found/NotFoundTab.tsx";
import type {RepairRequestStatusRecordCreate} from "@/domain/models/repair-request.ts";
import {Card} from "@/presentation/components/ui/card.tsx";
import {useNavigate} from "@tanstack/react-router";


function mergeUsedSpareParts(
    initial: RepairRequestUsedSparePartVM[],
    added: RepairRequestUsedSparePartVM[]
): RepairRequestUsedSparePartVM[] {
    const map = new Map<string, RepairRequestUsedSparePartVM>();

    for (const part of [...initial, ...added]) {
        if (!part.sparePart || !part.institution) continue;

        const key = `${part.sparePart.id}_${part.institution.id}`;
        if (!map.has(key)) {
            map.set(key, { ...part });
        } else {
            const existing = map.get(key)!;
            existing.quantity += part.quantity;
            if (part.note) existing.note = part.note;
        }
    }

    return Array.from(map.values());
}

interface RepairRequestUsedSparePartVM {
    note: string;
    quantity: number;
    sparePart: SparePart | null;
    institution: Institution | null;
}

interface Props { repairRequestId: string }
const RepairRequestDetailsPage = ({ repairRequestId }: Props) => {
    const authSession = useAuthSession();
    const isManager = authSession?.currentUser.role === "manager";

    const { data: failureTypes } = useFailureTypes(UnlimitedPagination);
    const { data: repairRequest, isSuccess, refetch } = useRepairRequestById(repairRequestId);
    const { data: repairHistoryPagination } = useRepairRequests(
        { page: 1, limit: 5 },
        {
            equipmentId: repairRequest?.equipment.id.toString() ?? "",
            idNotEqualTo: repairRequestId
        },
        {
            sortBy: "date",
            sortOrder: "desc",
        }
    )

    const updateRepairRequest = useUpdateRepairRequest();
    const deleteRepairRequest = useDeleteRepairRequest();
    const navigate = useNavigate();

    const [showDeleteFailMessage, setShowDeleteFailMessage] = useState<boolean>(false);
    const [showUpdateFailMessage, setShowUpdateFailMessage] = useState<boolean>(false);
    const [showUpdateSuccessMessage, setShowUpdateSuccessMessage] = useState<boolean>(false);

    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);
    const [showFinishUpdateConfirmationModal, setShowFinishUpdateConfirmationModal] = useState<boolean>(false);

    const [selectedFailureTypeIds, setSelectedFailureTypeIds] = useState<number[]>([]);
    const [repairRequestStatus, setRepairRequestStatus] = useState<Status | null>(null);
    const [initialUsedSpareParts, setInitialUsedSpareParts] = useState<RepairRequestUsedSparePartVM[]>([]);
    const [newUsedSpareParts, setNewUsedSpareParts] = useState<RepairRequestUsedSparePartVM[]>([]);
    const [notes, setNotes] = useState<string | null>(null);

    const [showSparePartModal, setShowSparePartModal] = useState(false);
    const lastStatus = repairRequest?.statusHistory[repairRequest?.statusHistory.length - 1];

    const allUsedSpareParts = useMemo(() =>
        mergeUsedSpareParts(initialUsedSpareParts, newUsedSpareParts), [initialUsedSpareParts, newUsedSpareParts])

    const onRepairRequestDelete = () => {
        setShowDeleteConfirmationModal(false)
        deleteRepairRequest.mutate(repairRequestId, {
            onSuccess: () => {navigate({to: isManager ? "/manager/dashboard" : "/engineer/dashboard/repair-requests"})},
            onError: () => {setShowDeleteFailMessage(true)},
        });
    }

    const onRepairRequestUpdate = () => {
        const statusHistory: RepairRequestStatusRecordCreate = {
            status: repairRequestStatus ?? 'not_taken',
            assignedEngineerId: authSession!.currentUser.id ?? null,
        }

        updateRepairRequest.mutate({
            id: repairRequestId,
            managerNote: isManager ? notes : null,
            engineerNote: !isManager ? notes : null,
            failureTypesIds: selectedFailureTypeIds,
            statusHistory: (repairRequestStatus !== lastStatus?.status) ? statusHistory : null,
            usedSpareParts: allUsedSpareParts.map(part => ({
                    note: part.note,
                    quantity: part.quantity,
                    sparePartId: part.sparePart!.id.toString(),
                    institutionId: part.institution!.id.toString(),
                }))
        }, {
            onSuccess: () => {
                setShowUpdateFailMessage(false)
                setShowUpdateSuccessMessage(true)
                void refetch()
            },
            onError: () => setShowUpdateFailMessage(true),
        })
    }

    useEffect(() => {
        if (showUpdateFailMessage) {
            setShowUpdateFailMessage(false);
        }
        if (showUpdateSuccessMessage) {
            setShowUpdateSuccessMessage(false);
        }
    }, [notes, repairRequestStatus, newUsedSpareParts, selectedFailureTypeIds]);

    const initialized = useRef(false);
    useEffect(() => {
        if (!repairRequest || initialized.current) return;
        setNotes(isManager ? repairRequest.managerNote : repairRequest.engineerNote);
        setSelectedFailureTypeIds(repairRequest.failureTypes.map(t => t.id));
        setRepairRequestStatus(repairRequest.statusHistory[repairRequest.statusHistory.length - 1].status);
        setInitialUsedSpareParts(repairRequest.usedSpareParts);

        initialized.current = true;
    }, [repairRequest, isManager]);

    const isReadonly = repairRequest?.statusHistory[0].status === "finished";

    if (!isSuccess) {
        return <NotFoundTab redirectTo={isManager
            ? "/manager/dashboard"
            : "/engineer/dashboard/repair-requests"} />
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <DeviceInfoCard repairRequest={repairRequest} />
                        <IssueCard issue={repairRequest?.issue} />
                        <PhotosCard />
                        <FailureTypesCard
                            isReadonly={isReadonly}
                            failureTypes={failureTypes?.items ?? []}
                            selectedFailureTypeIds={selectedFailureTypeIds}
                            onSelectFailureType={(x) => setSelectedFailureTypeIds(prev => prev.includes(x) ? prev : [x, ...prev])}
                            onDeselectFailureType={(x) => setSelectedFailureTypeIds(prev => prev.filter(id => id != x))}
                        />
                        {!isReadonly &&
                            <StatusBarCard
                                status={repairRequestStatus ?? lastStatus!.status}
                                onStatusChange={setRepairRequestStatus}
                            />
                        }
                        <SparePartCard
                            isReadonly={isReadonly}
                            usedSpareParts={allUsedSpareParts}
                            onOpenModal={() => setShowSparePartModal(true)}
                            onDeleteSparePart={(x) => {
                                setNewUsedSpareParts((prev) =>
                                    prev.filter(vm =>
                                        vm.institution?.id !== x.institution?.id ||
                                        vm.sparePart?.id !== x.sparePart?.id
                                    ));
                                setInitialUsedSpareParts((prev) =>
                                    prev.filter(vm =>
                                        vm.institution?.id !== x.institution?.id ||
                                        vm.sparePart?.id !== x.sparePart?.id
                                    ))
                            }}
                        />
                        {!isReadonly &&
                            <NotesCard
                                isReadonly={isReadonly}
                                notes={notes ?? ""}
                                setNotes={setNotes}
                                title={"Коментар " + (isManager ? "менеджера" : "інженера")}
                            />
                        }
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 space-y-6 sm:space-x-6 lg:space-x-0">
                            <StatusHistory statusHistory={repairRequest?.statusHistory} />
                            <RepairHistory repairHistory={repairHistoryPagination?.items ?? []} />
                        </div>
                        {isReadonly &&
                            <>
                                {repairRequest?.managerNote &&
                                    <NotesCard
                                        isReadonly={isReadonly}
                                        notes={repairRequest.managerNote}
                                        setNotes={setNotes}
                                        title="Коментар менеджера"
                                    />
                                }
                                {repairRequest?.engineerNote &&
                                    <NotesCard
                                        isReadonly={isReadonly}
                                        notes={repairRequest.engineerNote}
                                        setNotes={setNotes}
                                        title="Коментар інженера"
                                    />
                                }
                            </>
                        }
                        <div className="space-y-3">
                            {!isReadonly &&
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        if (repairRequestStatus === "finished") {
                                            setShowFinishUpdateConfirmationModal(true);
                                            return;
                                        }

                                        onRepairRequestUpdate()
                                    }}
                                    className="w-full h-12 flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-100"
                                    disabled={
                                        notes === (isManager ? repairRequest.managerNote : repairRequest?.engineerNote) &&
                                        repairRequestStatus === lastStatus?.status &&
                                        newUsedSpareParts?.length === 0 &&
                                        initialUsedSpareParts.length === repairRequest?.usedSpareParts.length &&
                                        repairRequest?.usedSpareParts.every(part => {
                                            const match = initialUsedSpareParts.find(x =>
                                                part.sparePart?.id === x.sparePart?.id &&
                                                part.institution?.id === x.institution?.id &&
                                                part.quantity === x.quantity &&
                                                part.note === x.note
                                            );
                                            return !!match;
                                        }) &&
                                        selectedFailureTypeIds.length === repairRequest?.failureTypes.length &&
                                        selectedFailureTypeIds.every(id => new Set(repairRequest.failureTypes.map(ft => ft.id)).has(id))
                                    }
                                >
                                    <Save className="w-5 h-5"/>
                                    Зберегти заявку
                                </Button>
                            }
                            {showUpdateFailMessage &&
                                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-md shadow-sm mt-2 text-center">
                                    Не вдалося оновити заявку. Спробуйте ще раз
                                </div>
                            }
                            {showUpdateSuccessMessage && !isReadonly &&
                                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2 rounded-md shadow-sm mt-2 text-center">
                                    Заявка успішно оновлена
                                </div>
                            }
                            <Button
                                variant="outline"
                                className="w-full h-12 flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-100"
                            >
                                <FileText className="w-5 h-5" />
                                Експортувати звіт (PDF)
                            </Button>
                            {isManager &&
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowDeleteConfirmationModal(true)}
                                        className="w-full h-8 flex items-center justify-center gap-2 border-red-400 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    >
                                        <Trash className="w-5 h-5" />
                                        Видалити заявку
                                    </Button>
                                    {showDeleteFailMessage && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-md shadow-sm mt-2 text-center">
                                            Не вдалося видалити заявку. Спробуйте ще раз
                                        </div>
                                    )}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {showSparePartModal &&
                <SparePartCardModal
                    onHideSparePartModal={() => setShowSparePartModal(false)}
                    newUsedSpareParts={newUsedSpareParts}
                    setUsedSpareParts={setNewUsedSpareParts}
                />
            }
            {showFinishUpdateConfirmationModal &&
                <div className="fixed inset-0 backdrop-blur-[2px] bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <Card className="bg-white max-w-2xl w-full">
                        <div className="p-6">
                            <div className="text-center">
                                <h3 className="text-center text-slate-900">Ви впевнені, що хочете змінити статус на "Завершено"?</h3>
                                <span className="size-1">Після цього ви не зможете редагувати заявку або вносити зміни</span>
                            </div>
                            <div className="flex flex-row gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => {setShowFinishUpdateConfirmationModal(false)}}
                                    className="flex-1"
                                >
                                    Скасувати
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={onRepairRequestUpdate}
                                    className="flex-1 border-gray-300 hover:bg-gray-100"
                                >
                                    <Trash className="w-5 h-5" />
                                    Видалити заявку
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            }
            {showDeleteConfirmationModal &&
                <div className="fixed inset-0 backdrop-blur-[2px] bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <Card className="bg-white max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-center text-slate-900 mb-4">Ви впевнені, що хочете видалити заявку?</h3>
                            <div className="flex flex-row gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => {setShowDeleteConfirmationModal(false)}}
                                    className="flex-1"
                                >
                                    Скасувати
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={onRepairRequestDelete}
                                    className="flex-1 border-red-400 text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                    <Trash className="w-5 h-5" />
                                    Видалити заявку
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            }
        </>
    );
};

export default RepairRequestDetailsPage;
export type { RepairRequestUsedSparePartVM };