import DeviceInfoCard from "@/presentation/components/tabs/repair-request-details/DeviceInfoCard.tsx";
import {useGetRepairRequest} from "@/presentation/hooks/repair-request.ts";
import {Route} from "@/presentation/routes/engineer/dashboard/repair-requests/$repairRequestId.tsx";
import IssueCard from "@/presentation/components/tabs/repair-request-details/IssueCard.tsx";
import FailureTypesCard from "@/presentation/components/tabs/repair-request-details/FailureTypesCard.tsx";
import {useListFailureTypes} from "@/presentation/hooks/failure-type.ts";
import {useEffect, useRef, useState} from "react";
import type {RepairRequest, RepairRequestStatus} from "@/domain/entities/repair-request.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";
import StatusBarCard from "@/presentation/components/tabs/repair-request-details/StatusBarCard.tsx";


const RepairRequestDetailsPage = () => {
    const { repairRequestId } = Route.useParams();
    const { data: repairRequest, isSuccess } = useGetRepairRequest(repairRequestId);
    const { data: failureTypes } = useListFailureTypes({ page: 1, limit: -1 });
    const [updatedRepairRequest, setUpdatedRepairRequest] = useState<RepairRequest | null>(null);
    const [selectedFailureTypeIds, setSelectedFailureTypeIds] = useState<number[]>([]);
    const [repairRequestStatus, setRepairRequestStatus] = useState<RepairRequestStatus | null>(null);

    const initializedRef = useRef(false);
    useEffect(() => {
        initializedRef.current = false;
    }, [repairRequestId]);

    useEffect(() => {
        if (!repairRequest || initializedRef.current) return;
        setSelectedFailureTypeIds(() => repairRequest.failureTypes.map(t => t.id));
        initializedRef.current = true;
    }, [repairRequestId, repairRequest]);

    const onSelectFailureType = (failureTypeId: number) => {
        setSelectedFailureTypeIds(prev => prev.includes(failureTypeId) ? prev : [failureTypeId, ...prev]);
    }

    const onDeselectFailureType = (failureTypeId: number) => {
        setSelectedFailureTypeIds(prev => prev.filter(id => id != failureTypeId));
    }

    if (!isSuccess) {
        return <div>sdfdsfdsfdssfdsfdsfds</div>
    }

    const lastState = repairRequest.stateHistory[repairRequest.stateHistory.length - 1];
    return (
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <DeviceInfoCard repairRequest={repairRequest} />
                    <IssueCard issue={repairRequest?.description} />
                    <FailureTypesCard
                        failureTypes={failureTypes ?? []}
                        selectedFailureTypeIds={selectedFailureTypeIds}
                        onSelectFailureType={onSelectFailureType}
                        onDeselectFailureType={onDeselectFailureType}
                    />
                    <StatusBarCard
                        status={repairRequestStatus ?? repairRequest.stateHistory[repairRequest.stateHistory.length - 1].status}
                        onStatusChange={setRepairRequestStatus}
                    />
                </div>
            </div>
        </main>
    );
};

export default RepairRequestDetailsPage;