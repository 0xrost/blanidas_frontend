import { createFileRoute } from '@tanstack/react-router'
import LoginPage from "@/presentation/pages/login/login-page.tsx";

export const Route = createFileRoute('/accounts/login')({
  component: LoginPage,
})
