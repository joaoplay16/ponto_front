import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import { navigationRoutes as navRoutes } from "./RoutePaths"
import { lazy, Suspense } from "react"

const Dashboard = lazy(() => import("./pages/user/Dashboard"))
const ClockInReport = lazy(() => import("./pages/user/ClockInReport"))
const WorkingHoursReport = lazy(() => import("./pages/user/WorkingHoursReport"))

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
        path: navRoutes.user.report.wourkingHours,
        element: (
          <Suspense fallback={<div>Carregando</div>}>
            <WorkingHoursReport />
          </Suspense>
        )
      },
      {
        path: navRoutes.user.report.clockIn,
        element: (
          <Suspense fallback={<div>Carregando</div>}>
            <ClockInReport />
          </Suspense>
        )
      }
    ]
  }
])

export function Routes() {
  return <RouterProvider router={router} />
}
