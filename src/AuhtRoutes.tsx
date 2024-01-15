import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./pages/common"
import { navigationRoutes } from "./RoutePaths"
import { lazy } from "react"

const Register = lazy(() => import("./pages/common/Register"))
const RegisterContinue = lazy(() => import("./pages/common/RegisterContinue"))

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Login />
  },
  {
    path: navigationRoutes.register,
    element: <Register />
  },
  {
    path: navigationRoutes.continueRegister,
    element: <RegisterContinue />
  },
  {}
])

export function AuthRoutes() {
  return <RouterProvider router={router} />
}
