import { createFileRoute } from '@tanstack/react-router'
import LoginPage from "@/presentation/pages/login/LoginPage.tsx";

export const Route = createFileRoute('/accounts/login')({
  component: LoginPage,
})
