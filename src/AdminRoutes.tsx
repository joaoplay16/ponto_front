import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import { navigationRoutes as navRoutes } from "./RoutePaths"
import { lazy, Suspense } from "react"

const Dashboard = lazy(() => import("./pages/admin/Dashboard"))
const WorkingHoursReport = lazy(() => import("./pages/admin/WorkingHoursReport"))
const UsersReport = lazy(() => import("./pages/admin/UsersReport"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Carregando</div>}>
            <Dashboard />
          </Suspense>
        )
      },
      {
        path: navRoutes.admin.report.wourkingHours,
        element: (
          <Suspense fallback={<div>Carregando</div>}>
            <WorkingHoursReport />
          </Suspense>
        )
      },
      {
        path: navRoutes.admin.report.wourkingHours,
        element: (
          <Suspense fallback={<div>Carregando</div>}>
            <WorkingHoursReport />
          </Suspense>
        )
      },
      {
        path: navRoutes.admin.report.users,
        element: (
          <Suspense fallback={<div>Carregando</div>}>
            <UsersReport />
          </Suspense>
        )
      },
    ]
  }
])

export function AdminRoutes() {
  return <RouterProvider router={router} />
}
