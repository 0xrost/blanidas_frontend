import { createFileRoute } from '@tanstack/react-router'
import SparePartsListPage from "@/presentation/pages/engineer/SparePartsListPage.tsx";

export const Route = createFileRoute('/engineer/dashboard/spare-parts/')({
  component: SparePartsListPage,
})