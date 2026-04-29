import { createFileRoute } from '@tanstack/react-router'
import RepairRequestDetailsPage from "@/presentation/pages/repair-request/RepairRequestDetailsPage";

export const Route = createFileRoute(
  '/_authenticated/repair-requests/$repairRequestId',
)({
  component: RepairRequestDetailsPage,
})