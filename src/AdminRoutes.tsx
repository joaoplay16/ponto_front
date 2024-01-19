import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import App from "./App"
import ErrorBoundary from "./Error"
import { navigationRoutes as navRoutes } from "./RoutePaths"
import { Profile } from "./pages/user"

const Dashboard = lazy(() => import("./pages/admin/Dashboard"))
const WorkingHoursReport = lazy(
  () => import("./pages/admin/WorkingHoursReport")
)
const UsersReport = lazy(() => import("./pages/admin/UsersReport"))
const UserRegister = lazy(() => import("./pages/admin/UserRegister"))
const UserProfile = lazy(() => import("./pages/admin/UserProfile"))

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Navigate to={"/"} />
  },
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
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
      {
        path: navRoutes.admin.register_user,
        element: (
          <Suspense fallback={<div>Carregando</div>}>
            <UserRegister />
          </Suspense>
        )
      },
      {
        path: navRoutes.admin.user_profile,
        element: (
          <Suspense fallback={<div>Carregando</div>}>
            <UserProfile />
          </Suspense>
        )
      },
      {
        path: navRoutes.admin.profile,
        element: (
          <Suspense fallback={<div>Carregando</div>}>
            <Profile />
          </Suspense>
        )
      }
    ]
  }
])

export function AdminRoutes() {
  return <RouterProvider router={router} />
}
