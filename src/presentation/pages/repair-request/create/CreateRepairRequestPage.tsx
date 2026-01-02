import CreateRepairRequestForm from "@/presentation/pages/repair-request/create/CreateRepairRequestForm.tsx";
import DeviceInfoPanel from "@/presentation/pages/repair-request/create/DeviceInfoPanel.tsx";
import {Route} from "@/presentation/routes/repair-request/$equipmentId.tsx"
import type {Urgency} from "@/domain/entities/repair-request.ts";
import RequestSuccess from "@/presentation/pages/repair-request/create/RequestSuccess.tsx";
import BaseLayout from "@/presentation/components/layouts/BaseLayout.tsx";
import {useEquipmentById} from "@/presentation/hooks/entities/equipment.ts";
import {useCreateRepairRequest} from "@/presentation/hooks/entities/repair-request.ts";
import {useState} from "react";
import Notification from "@/presentation/components/layouts/Notification.tsx";
import EquipmentNotFound from "@/presentation/pages/repair-request/create/EquipmentNotFound.tsx";

interface RepairRequestFormData {
    description: string;
    urgencyLevel: Urgency;
    photos: string[];
}

const CreateRepairRequestPage = () => {
    const [showCreateRepairRequestErrorMessage, setShowCreateRepairRequestErrorMessage] = useState<boolean>(false);

    const { equipmentId } = Route.useParams();
    const equipmentQuery = useEquipmentById(equipmentId);
    const createRepairRequest = useCreateRepairRequest()

    const sendForm = (data: RepairRequestFormData) => {
        setShowCreateRepairRequestErrorMessage(false)
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
            {equipmentQuery.isError
                ? <EquipmentNotFound />
                : (
                    <>
                        {createRepairRequest.isSuccess
                            ? <RequestSuccess repairRequestId={createRepairRequest.data.id.toString()} />
                            : (
                                <div className="space-y-6">
                                    <DeviceInfoPanel equipment={equipmentQuery.isLoading ? null : equipmentQuery.data!} isLoading={equipmentQuery.isLoading} />
                                    <CreateRepairRequestForm
                                        sendForm={sendForm}
                                        isLoading={equipmentQuery.isLoading}
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