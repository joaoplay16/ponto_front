import { Usuario, type Ponto } from "../types/index"
import api from "./api"

export interface PontosData {
  count: number
  rows: Ponto[]
}

export type ClockInReporParamns = {
  userId: number
  limit?: number
  offset?: number
}
type ApiService = {
  userClockInReport: (params: ClockInReporParamns) => Promise<PontosData>
  doClockIn: (userId: number) => Promise<void>
  login: (email: string, password: string) => Promise<Usuario>,
  logout: () => Promise<void>
}

export const apiService: ApiService = {
  userClockInReport: async ({ userId, limit = 10, offset = 0 }) => {
    return (
      await api.get<PontosData>(
        `/usuario/${userId}/pontos?limit=${limit}&offset=${offset}`
      )
    ).data
  },
  // http://localhost:8088/usuario/1/registrar_ponto
  doClockIn: async (userId: number) => {
    return await api.get(`/usuario/${userId}/registrar_ponto`)
  },
  login: async (email, password) => {
    return (
      await api.post<Usuario>(`/login`, {
        email,
        senha: password
      })
    ).data
  },
  logout: async () => {
    return (
      await api.get(`/logout`)
    )
  }
}
