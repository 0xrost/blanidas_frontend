import { createFileRoute } from '@tanstack/react-router'
import EngineerDashboard from "@/presentation/pages/engineer/engineer-dashboard.tsx";

export const Route = createFileRoute('/engineer/dashboard/')({
  component: EngineerDashboard,
})
