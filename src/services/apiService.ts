import {
  Usuario,
  type Ponto,
  WorkingHours,
  UsuarioComSenha
} from "../types/index"
import { WorkingHoursPerMonthCount } from "../types/workingHours"
import api from "./api"

export interface PontosData {
  count: number
  rows: Ponto[]
}

export interface WorkingHoursData {
  count: number
  rows: WorkingHours[]
}

export type ClockInReporParamns = {
  userId: number
  limit?: number
  offset?: number
}

export type WorkingHoursParamns = {
  userId: number
  mes: number
  ano: number
  limit?: number
  offset?: number
}

export interface UsuariosData {
  count: number
  rows: Usuario[]
}

type ApiService = {
  userClockInReport: (params: ClockInReporParamns) => Promise<PontosData>
  userWorkingHoursReport: (
    params: WorkingHoursParamns
  ) => Promise<WorkingHoursData>
  userWorkingHoursPerMonthReport: (
    userId: number,
    month: number,
    year: number
  ) => Promise<WorkingHoursPerMonthCount>
  doClockIn: (userId: number) => Promise<void>
  login: (email: string, password: string) => Promise<Usuario>
  logout: () => Promise<void>
  updateUser: (user: UsuarioComSenha) => Promise<[number]>
  allUsersReport: (
    cargo: string,
    limit?: number,
    offset?: number
  ) => Promise<UsuariosData>
}

export const apiService: ApiService = {
  userClockInReport: async ({ userId, limit = 10, offset = 0 }) => {
    return (
      await api.get<PontosData>(
        `/usuario/${userId}/pontos?limit=${limit}&offset=${offset}`
      )
    ).data
  },
  userWorkingHoursReport: async ({
    userId,
    mes,
    ano,
    limit = 10,
    offset = 0
  }) => {
    return (
      await api.get<WorkingHoursData>(
        `/usuario/${userId}/relatorio?mes=${mes}&ano=${ano}&limit=${limit}&offset=${offset}`
      )
    ).data
  },
  userWorkingHoursPerMonthReport: async (userId, month, year) => {
    return await api
      .get<WorkingHoursPerMonthCount>(
        `/usuario/${userId}/relatorio_mensal?mes=${month}&ano=${year}`
      )
      .then((data) => data.data)
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
    return await api.get(`/logout`)
  },
  updateUser: async (user: UsuarioComSenha) => {
    return (await api.post<[number]>(`/usuario/${user.id}/atualizar`, user))
      .data
  },
  allUsersReport: async (cargo, limit = 10, offset=0) => {
    return (
      await api.get<UsuariosData>(
        `/admin/usuarios?cargo=${cargo}&limit=${limit}&offset=${offset}`
      )
    ).data
  }
}
