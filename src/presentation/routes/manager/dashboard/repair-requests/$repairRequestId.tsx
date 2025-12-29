import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/manager/dashboard/repair-requests/$repairRequestId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/manager/dashboard/repair-request/$repairRequestId"!</div>
}
