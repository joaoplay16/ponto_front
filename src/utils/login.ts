import { Usuario } from "../types"

export type LoginInfo = {
  user: Usuario | null
}

function storeLoginInfo(userInfo: LoginInfo) {
  localStorage.setItem("userInfo", JSON.stringify(userInfo))
}

function getStoredLoginInfo(): LoginInfo {
  const userInfo: LoginInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")

  return userInfo
}

export { getStoredLoginInfo, storeLoginInfo }
