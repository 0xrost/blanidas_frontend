import { createFileRoute } from '@tanstack/react-router'
import StatisticsPage from "@/presentation/pages/manager/StatisticsPage.tsx";


export const Route = createFileRoute('/_authenticated/manager/dashboard/statistics')({
  component: StatisticsPage,

})

