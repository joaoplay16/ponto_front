import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./pages/common"
import { navigationRoutes } from "./RoutePaths"
import { lazy, Suspense } from "react"

const Register = lazy(() => import("./pages/common/Register"))
const RegisterContinue = lazy(() => import("./pages/common/RegisterContinue"))
const PasswordReset = lazy(() => import("./pages/common/PasswordReset"))
const CreatePassword = lazy(() => import("./pages/common/CreatePassword"))

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Login />
  },
  {
    path: navigationRoutes.register,
    element: (
      <Suspense>
        <Register />
      </Suspense>
    )
  },
  {
    path: navigationRoutes.continueRegister,
    element: (
      <Suspense>
        <RegisterContinue />
      </Suspense>
    )
  },
  {
    path: navigationRoutes.forgotPassword,
    element: (
      <Suspense>
        <PasswordReset />
      </Suspense>
    )
  },
  {
    path: navigationRoutes.changePassword,
    element: (
      <Suspense>
        <CreatePassword />
      </Suspense>
    )
  }
])

export function AuthRoutes() {
  return <RouterProvider router={router} />
}
