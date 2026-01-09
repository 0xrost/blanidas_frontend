import CreateRepairRequestForm from "@/presentation/pages/repair-request/create/CreateRepairRequestForm.tsx";
import DeviceInfoPanel from "@/presentation/pages/repair-request/create/DeviceInfoPanel.tsx";
import {Route} from "@/presentation/routes/repair-request/$equipmentId.tsx"
import type {Urgency} from "@/domain/entities/repair-request.ts";
import RequestSuccess from "@/presentation/pages/repair-request/create/RequestSuccess.tsx";
import BaseLayout from "@/presentation/components/layouts/BaseLayout.tsx";
import {useEquipmentById} from "@/presentation/hooks/entities/equipment.ts";
import {useCreateRepairRequest} from "@/presentation/hooks/entities/repair-request.ts";
import Notification from "@/presentation/components/layouts/Notification.tsx";
import EquipmentNotFound from "@/presentation/pages/repair-request/create/EquipmentNotFound.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";

interface RepairRequestFormData {
    description: string;
    urgencyLevel: Urgency;
    photos: string[];
}

const CreateRepairRequestPage = () => {
    const { equipmentId } = Route.useParams();

    const [showCreateRepairRequestErrorMessage, setShowCreateRepairRequestErrorMessage] = useTimedError<boolean>(false, 5000);

    const equipment = useEquipmentById(equipmentId);
    const createRepairRequest = useCreateRepairRequest()

    const sendForm = (data: RepairRequestFormData) => {
        createRepairRequest.mutate({
            ...data,
            equipmentId: equipmentId,
        }, {
            onSuccess: () => setShowCreateRepairRequestErrorMessage(false),
            onError: () => setShowCreateRepairRequestErrorMessage(true),
        })
    }
console.log(createRepairRequest)
    return (
        <BaseLayout>
            {equipment.isError
                ? <EquipmentNotFound />
                : (
                    <>
                        {createRepairRequest.isSuccess
                            ? <RequestSuccess repairRequestId={createRepairRequest.data.id.toString()} />
                            : (
                                <div className="space-y-6">
                                    <DeviceInfoPanel equipment={equipment.isLoading ? null : equipment.data!} isLoading={equipment.isLoading} />
                                    <CreateRepairRequestForm
                                        sendForm={sendForm}
                                        isLoading={equipment.isLoading}
                                        isSubmitting={createRepairRequest.isPending}
                                    />
                                    {showCreateRepairRequestErrorMessage &&
                                        <Notification type="error" message="На жаль, заявку зараз подати не вдалося. Спробуйте, будь ласка, пізніше" />
                                    }
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