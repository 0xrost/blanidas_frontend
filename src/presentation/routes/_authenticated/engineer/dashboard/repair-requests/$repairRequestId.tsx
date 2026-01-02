import {createFileRoute} from '@tanstack/react-router'
import RepairRequestDetailsPage from "@/presentation/pages/engineer/RepairRequestDetailsPage.tsx";

export const Route = createFileRoute(
    '/_authenticated/engineer/dashboard/repair-requests/$repairRequestId',
)({
    component: RepairRequestDetailsPage,
})
