import { createFileRoute } from '@tanstack/react-router'
import StatisticsPage from "@/presentation/pages/manager/StatisticsPage.tsx";


export const Route = createFileRoute('/_authenticated/dashboard/manager/statistics')({
  component: StatisticsPage,

})

