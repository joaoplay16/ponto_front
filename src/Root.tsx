import { Routes } from "./Routes"
import { AdminRoutes } from "./AdminRoutes"
import { useAuth } from "./contexts"
import { AuthRoutes } from "./AuhtRoutes"

const Root = () => {
  const { userInfo } = useAuth()

  const isLoggedIn = localStorage.getItem("isLoggedIn") 
  const isAdmin = localStorage.getItem("isAdmin") 

  if (isLoggedIn == "false") {
    return <AuthRoutes />
  }

  if ( ( isAdmin == "true")) {
    return <AdminRoutes />
  } else {
    return <Routes />
  }
}

export default Root
