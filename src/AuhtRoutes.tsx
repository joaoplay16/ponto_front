import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { navigationRoutes as navRoutes } from "./RoutePaths"
import { lazy, Suspense } from "react"
import {Login} from "./pages/common"

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: (
        <Login />
    )
  }
])

export function AuthRoutes() {
  return <RouterProvider router={router} />
}
