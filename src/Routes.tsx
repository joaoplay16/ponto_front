import { lazy, Suspense } from "react"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from "./App"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        // element: <HomePage />,
      },
    ],
  },
])

export function Routes() {
  return <RouterProvider router={router} />
}
