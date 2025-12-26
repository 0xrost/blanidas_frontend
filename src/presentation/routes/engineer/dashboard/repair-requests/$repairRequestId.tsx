import {createFileRoute} from '@tanstack/react-router'
import RepairRequestDetailsPage from "@/presentation/pages/engineer/RepairRequestDetailsPage.tsx";

export const Route = createFileRoute(
    '/engineer/dashboard/repair-requests/$repairRequestId',
)({
    component: RepairRequestDetailsPage,
})
