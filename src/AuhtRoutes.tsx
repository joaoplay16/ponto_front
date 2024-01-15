import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./pages/common"
import { navigationRoutes } from "./RoutePaths"
import { lazy } from "react"

const Register = lazy(() => import("./pages/common/Register"))

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
  {}
])

export function AuthRoutes() {
  return <RouterProvider router={router} />
}
