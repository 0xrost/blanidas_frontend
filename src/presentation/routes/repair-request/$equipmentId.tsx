import { createFileRoute } from '@tanstack/react-router'
import CreateRepairRequestPage from "@/presentation/pages/repair-request/create/CreateRepairRequestPage.tsx";

export const Route = createFileRoute('/repair-request/$equipmentId')({
  component: CreateRepairRequestPage,
})
