import { createFileRoute } from '@tanstack/react-router'
import CreateRepairRequestPage from "@/presentation/pages/repair-request/create/create-repair-request-page.tsx";

export const Route = createFileRoute('/repair-request/$equipmentId')({
  component: CreateRepairRequestPage,
})
