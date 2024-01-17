import { AdminRoutes } from "./AdminRoutes"
import { AuthRoutes } from "./AuhtRoutes"
import { Routes } from "./Routes"
import { useAuth } from "./contexts"

const Root = () => {
  const { userInfo } = useAuth()
  const { user } = userInfo

  if (user === null || user === undefined) {
    return <AuthRoutes />
  }

  if (user.e_admin === 1) {
    return <AdminRoutes />
  } else {
    return <Routes />
  }
}

export default Root
