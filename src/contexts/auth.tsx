import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import { apiService } from "../services/apiService"
import { Usuario } from "../types"
import { LoginInfo, getStoredLoginInfo, storeLoginInfo } from "../utils"

interface UserInfo {
  user: Usuario | null
}

export interface AuthContextProps {
  login: (email: string, password: string) => Promise<Usuario>
  logout: () => void
  userInfo: UserInfo
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}

const AuthContext = createContext<AuthContextProps | null>(null)

function AuthProvider({ children }: { children: ReactNode }) {
  const storedLoginInfo = getStoredLoginInfo()

  const [userInfo, setUserInfo] = useState<UserInfo>({
    user: storedLoginInfo.user
  })

  useEffect(() => {
    const login = getStoredLoginInfo()
    setUserInfo({
      user: login.user
    })
  }, [])

  useEffect(() => {
    storeLoginInfo({
      user: userInfo.user
    } as LoginInfo)
  }, [userInfo])

  const login = async (email: string, password: string) => {
    return apiService.login(email, password).then((user) => {
      setUserInfo({
        user: user
      })
      return user
    })
  }

  const logout = () => {
    apiService.logout()
    setUserInfo({
      user: null
    })
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userInfo,
        setUserInfo
      }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("AuthContext deve ser usado com <AuthContext.Provider>")
  }

  return context
}

export { AuthContext, AuthProvider, useAuth }

