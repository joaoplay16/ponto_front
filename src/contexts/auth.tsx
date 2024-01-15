import React, { ReactNode, createContext, useContext, useState } from "react"
import { Usuario } from "../types"
import { apiService } from "../services/apiService"

interface UserInfo {
  isUserLoggedIn: boolean
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
  const [userInfo, setUserInfo] = useState<UserInfo>({
    isUserLoggedIn: false,
    user: null
  })
  const login = async (email: string, password: string) => {
    return apiService.login(email, password).then((user) => {
      setUserInfo({
        isUserLoggedIn: true,
        user: user
      })
      return user
    })
  }

  const logout = () => {
    apiService.logout()
    setUserInfo({
      isUserLoggedIn: true,
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

export { AuthProvider, AuthContext, useAuth }
