import DeviceInfoCard from "@/presentation/components/tabs/repair-request-details/DeviceInfoCard.tsx";
import {
    useDeleteRepairRequest, useRepairRequestById,
    useRepairRequests,
    useUpdateRepairRequest
} from "@/presentation/hooks/entities/repair-request.ts";
import IssueCard from "@/presentation/components/tabs/repair-request-details/IssueCard.tsx";
import FailureTypesCard from "@/presentation/components/tabs/repair-request-details/FailureTypesCard.tsx";
import {useFailureTypes} from "@/presentation/hooks/entities/failure-type.ts";
import {useEffect, useMemo, useState} from "react";
import type {Status} from "@/domain/entities/repair-request.ts";
import StatusBarCard from "@/presentation/components/tabs/repair-request-details/StatusBarCard.tsx";
import SparePartCard from "@/presentation/components/tabs/repair-request-details/spare-parts/SparePartCard.tsx";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import NotesCard from "@/presentation/components/tabs/repair-request-details/NotesCard.tsx";
import StatusHistory from "@/presentation/components/tabs/repair-request-details/StatusHistory.tsx";
import RepairHistory from "@/presentation/components/tabs/repair-request-details/RepairHistory.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Save, Trash} from "lucide-react";
import PhotosCard from "@/presentation/components/tabs/repair-request-details/PhotosCard.tsx";
import {useAuthSession} from "@/presentation/hooks/auth.ts";
import NotFoundTab from "@/presentation/components/tabs/not-found/NotFoundTab.tsx";
import type {RepairRequestStatusRecordCreate} from "@/domain/models/repair-request.ts";
import {UnlimitedPagination} from "@/domain/pagination.ts";
import {SortByNameAsc} from "@/domain/sorting.ts";
import DeleteModal from "@/presentation/components/tabs/repair-request-details/DeleteModal.tsx";


interface RepairRequestUsedSparePartVM {
    note: string;
    quantity: number;
    sparePart: SparePart;
    institution: Institution;
}

interface Props {
    repairRequestId: string
    goToDashboard: () => void
}
const RepairRequestDetailsTab = ({ repairRequestId, goToDashboard }: Props) => {
    const { data: failureTypes } = useFailureTypes({pagination: UnlimitedPagination, sorting: SortByNameAsc});
    const { data: repairRequest, isSuccess, refetch } = useRepairRequestById(repairRequestId);
    const { data: repairHistoryPagination } = useRepairRequests({
        pagination: { page: 1, limit: 5 },
        filters: {
            equipmentId: repairRequest?.equipment.id.toString() ?? "",
            idNotEqualTo: repairRequestId
        },
        sorting: { sortBy: "date", sortOrder: "desc" }
    })

    const authSession = useAuthSession();
    const isManager = authSession?.currentUser.role === "manager";
    const isReadonly = repairRequest?.lastStatus === "finished";

    const updateRepairRequest = useUpdateRepairRequest();
    const deleteRepairRequest = useDeleteRepairRequest();

    const [showDeleteFailMessage, setShowDeleteFailMessage] = useState<boolean>(false);
    const [showUpdateFailMessage, setShowUpdateFailMessage] = useState<boolean>(false);
    const [showUpdateSuccessMessage, setShowUpdateSuccessMessage] = useState<boolean>(false);

    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);

    const [selectedFailureTypeIds, setSelectedFailureTypeIds] = useState<string[]>([]);
    const [repairRequestStatus, setRepairRequestStatus] = useState<Status | null>(null);
    const [notes, setNotes] = useState<string | null>(null);
    const [usedSparePartsToUpdate, setUsedSparePartsToUpdate] = useState<RepairRequestUsedSparePartVM[]>([]);
    const [areUsedSparePartsDirty, setAreUsedSparePartsDirty] = useState<boolean>(false);


    const onRepairRequestDelete = () => {
        setShowDeleteConfirmationModal(false)
        deleteRepairRequest.mutate(repairRequestId, {
            onSuccess: goToDashboard,
            onError: () => {setShowDeleteFailMessage(true)},
        });
    }

    const onRepairRequestUpdate = () => {
        const statusHistory: RepairRequestStatusRecordCreate = {
            status: repairRequestStatus ?? 'not_taken',
            assignedEngineerId: authSession?.currentUser.id ?? null,
        }

        updateRepairRequest.mutate({
            id: repairRequestId,
            managerNote: isManager ? notes : null,
            engineerNote: !isManager ? notes : null,
            failureTypesIds: selectedFailureTypeIds,
            statusHistory: (repairRequestStatus !== repairRequest?.lastStatus) ? statusHistory : null,
            usedSpareParts: usedSparePartsToUpdate.map(part => ({
                    note: part.note,
                    quantity: part.quantity,
                    sparePartId: part.sparePart.id,
                    institutionId: part.institution.id,
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
        setShowUpdateFailMessage(false);
        setShowUpdateSuccessMessage(false);
    }, [notes, repairRequestStatus, usedSparePartsToUpdate, selectedFailureTypeIds]);

    useEffect(() => {
        if (!repairRequest) return;

        setNotes(isManager ? repairRequest.managerNote : repairRequest.engineerNote);
        setSelectedFailureTypeIds(repairRequest.failureTypes.map(t => t.id));
        setRepairRequestStatus(repairRequest.lastStatus);
    }, [repairRequestId, repairRequest, isManager]);

    const initialFailureTypeIds = useMemo(
        () => new Set(repairRequest?.failureTypes.map(ft => ft.id)),
        [repairRequest]
    );

    const isFailureTypesDirty =
        selectedFailureTypeIds.length !== initialFailureTypeIds.size ||
        selectedFailureTypeIds.some(id => !initialFailureTypeIds.has(id));

    const isNotesDirty = notes !== (isManager ? repairRequest?.managerNote : repairRequest?.engineerNote);
    const isStatusDirty = repairRequestStatus !== repairRequest?.lastStatus;

    const isDirty =
        isNotesDirty ||
        isStatusDirty ||
        areUsedSparePartsDirty ||
        isFailureTypesDirty;

    if (!isSuccess) {
        return <NotFoundTab redirectTo={isManager
                ? "/manager/dashboard/repair-requests"
                : "/engineer/dashboard/repair-requests"
            }
        />
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <DeviceInfoCard repairRequest={repairRequest} />
                        <IssueCard issue={repairRequest?.issue} />
                        {repairRequest?.photos?.length > 0 && (
                            <PhotosCard photos={repairRequest.photos} />
                        )}
                        <FailureTypesCard
                            isReadonly={isReadonly}
                            failureTypes={isReadonly ? (repairRequest?.failureTypes ?? []) : (failureTypes?.items ?? [])}
                            selectedFailureTypeIds={selectedFailureTypeIds}
                            onSelectFailureType={(x) => setSelectedFailureTypeIds(prev => prev.includes(x) ? prev : [x, ...prev])}
                            onDeselectFailureType={(x) => setSelectedFailureTypeIds(prev => prev.filter(id => id != x))}
                        />
                        {!isReadonly &&
                            <StatusBarCard
                                status={repairRequestStatus ?? repairRequest?.lastStatus}
                                onStatusChange={setRepairRequestStatus}
                            />
                        }
                        <SparePartCard
                            isReadonly={isReadonly}
                            setIdDirty={setAreUsedSparePartsDirty}
                            usedSpareParts={repairRequest?.usedSpareParts ?? []}
                            setUsedSparePartsToUpdate={setUsedSparePartsToUpdate}
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
                                    onClick={onRepairRequestUpdate}
                                    className="w-full h-12 flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-100"
                                    disabled={!isDirty}
                                >
                                    <Save className="w-5 h-5"/>
                                    Зберегти зміни
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
            <DeleteModal
                delete_={onRepairRequestDelete}
                close={() => setShowDeleteConfirmationModal(false)}
                isOpen={showDeleteConfirmationModal}
            />
        </>
    );
};

export default RepairRequestDetailsTab;
export type { RepairRequestUsedSparePartVM };