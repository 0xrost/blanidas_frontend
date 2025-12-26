import CreateRepairRequestForm from "@/presentation/pages/repair-request/create/create-repair-request-form.tsx";
import DeviceInfoPanel from "@/presentation/pages/repair-request/create/device-info-panel.tsx";
import {Route} from "@/presentation/routes/repair-request/$equipmentId.tsx"
import type {UrgencyLevel} from "@/domain/entities/repair-request.ts";
import RequestSuccess from "@/presentation/pages/repair-request/create/request-success.tsx";
import BaseLayout from "@/presentation/components/layouts/base-layout.tsx";
import {useFindByIdEquipment} from "@/presentation/hooks/equipment.ts";
import {useCreateRepairRequest} from "@/presentation/hooks/repair-request.ts";

interface RepairRequestFormData {
    description: string;
    urgencyLevel: UrgencyLevel;
    photos: string[];
}

const CreateRepairRequestPage = () => {
    const { equipmentId } = Route.useParams();
    const equipmentQuery = useFindByIdEquipment(equipmentId);
    const repairRequestMutation = useCreateRepairRequest()

    const sendForm = (data: RepairRequestFormData) => {
        repairRequestMutation.mutate({
            ...data,
            equipmentId: equipmentId,
        })
    }

    return (
        <BaseLayout>
            {equipmentQuery.isError
                ? <p className="text-slate-900">Біда</p>
                : (
                    <>
                        {repairRequestMutation.isSuccess
                            ? <RequestSuccess repairRequestId={repairRequestMutation.data.id.toString()} />
                            : (
                                <div className="space-y-6">
                                    <DeviceInfoPanel equipment={equipmentQuery.isLoading ? null : equipmentQuery.data!} isLoading={equipmentQuery.isLoading} />
                                    <CreateRepairRequestForm sendForm={sendForm} isLoading={equipmentQuery.isLoading} isSubmitting={repairRequestMutation.isPending}/>
                                </div>
                            )
                        }
                    </>
                )
            }
        </BaseLayout>
    )
}

export default CreateRepairRequestPage;
export type { RepairRequestFormData };