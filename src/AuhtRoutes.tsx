import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import ErrorBoundary from "./Error"
import { Login } from "./pages/common"
import { navigationRoutes } from "./RoutePaths"

const Register = lazy(() => import("./pages/common/Register"))
const RegisterContinue = lazy(() => import("./pages/common/RegisterContinue"))
const PasswordReset = lazy(() => import("./pages/common/PasswordReset"))
const CreatePassword = lazy(() => import("./pages/common/CreatePassword"))
const router = createBrowserRouter([
  {
    path: "/*", // Redireciona de volta para o login ao acessar rotas desconhecidas
    element: <Navigate to={"/"} />
  },
  {
    path: "/",
    index: true,
    element: (
      <ErrorBoundary>
        <Login />
      </ErrorBoundary>
    )
  },
  {
    path: navigationRoutes.register,
    element: (
      <Suspense>
        <ErrorBoundary>
          <Register />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: navigationRoutes.continueRegister,
    element: (
      <Suspense>
        <ErrorBoundary>
          <RegisterContinue />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: navigationRoutes.forgotPassword,
    element: (
      <Suspense>
        <ErrorBoundary>
          <PasswordReset />
        </ErrorBoundary>
      </Suspense>
    )
  },
  {
    path: navigationRoutes.changePassword,
    element: (
      <Suspense>
        <ErrorBoundary>
          <CreatePassword />
        </ErrorBoundary>
      </Suspense>
    )
  }
])

export function AuthRoutes() {
  return <RouterProvider router={router} />
}
