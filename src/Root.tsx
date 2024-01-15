import { Routes } from "./Routes"
import { AdminRoutes } from "./AdminRoutes"
import { useAuth } from "./contexts"
import { AuthRoutes } from "./AuhtRoutes"

const Root = () => {
  const { userInfo } = useAuth()

  if (userInfo.user == null) {
    return <AuthRoutes />
  }

  if (userInfo.user.e_admin) {
    return <AdminRoutes />
  } else {
    return <Routes />
  }
}

export default Root
