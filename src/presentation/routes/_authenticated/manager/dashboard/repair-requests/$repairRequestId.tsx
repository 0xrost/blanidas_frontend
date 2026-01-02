import { createFileRoute } from '@tanstack/react-router'
import RepairRequestDetailsPage from "@/presentation/pages/manager/RepairRequestDetailsPage.tsx";

export const Route = createFileRoute(
  '/_authenticated/manager/dashboard/repair-requests/$repairRequestId',
)({
  component: RepairRequestDetailsPage,
})