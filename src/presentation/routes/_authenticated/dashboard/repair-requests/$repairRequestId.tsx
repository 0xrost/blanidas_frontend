import { createFileRoute } from '@tanstack/react-router'
import RepairRequestDetailsPage from "@/presentation/pages/repair-request/RepairRequestDetailsPage";

export const Route = createFileRoute(
  '/_authenticated/dashboard/repair-requests/$repairRequestId',
)({
  component: RepairRequestDetailsPage,
})