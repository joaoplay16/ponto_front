import {
  Usuario,
  type Ponto,
  WorkingHours,
  UsuarioComSenha
} from "../types/index"
import {
  WorkingHoursPerMonthCount,
  WorkingHoursWithUser
} from "../types/workingHours"
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

export interface AllUsersWorkingHoursData {
  count: number
  rows: WorkingHoursWithUser[]
}

export type AllUsersWorkingHoursParamns = {
  cargo?: string
  mes?: number | string
  ano?: number | string
  limit?: number
  offset?: number
}

export type UserRegisterParamns = {
  nome: string
  nome_de_usuario: string
  email: string
  celular: string
  e_admin: boolean
}

export type FinishUserRegisterParamns = {
  usuario: string
  senha: string
}

export type FinishUserPasswordChangeParamns = {
  token: string
  senha: string
}

export type ApiErrorResponse = {
  error: string
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
  registerUser: (params: UserRegisterParamns) => Promise<Usuario>
  allUsersReport: (
    cargo: string,
    limit?: number,
    offset?: number
  ) => Promise<UsuariosData>
  allUsersWorkingHoursReport: (
    params: AllUsersWorkingHoursParamns
  ) => Promise<AllUsersWorkingHoursData>
  getUser: (id:number) => Promise<Usuario>
  finishUserRegister: (params: FinishUserRegisterParamns) => Promise<[number]>
  requestPasswordChange: (email: string) => Promise<void>
  finishUserPasswordChange: (params: FinishUserPasswordChangeParamns) => Promise<[number]>
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
  },
  allUsersWorkingHoursReport: async function ({
    cargo= "",
    mes = "",
    ano = "",
    limit = 10,
    offset = 0
  }: AllUsersWorkingHoursParamns): Promise<AllUsersWorkingHoursData> {
    return (
      await api.get<AllUsersWorkingHoursData>(
        `/admin/ponto/relatorio?cargo=${cargo}&mes=${mes}&ano=${ano}&limit=${limit}&offset=${offset}`
      )
    ).data
  },
  registerUser: async (paramns: UserRegisterParamns) => {
    return (await api.post<Usuario>(`/usuario/criar`, paramns))
      .data
  },
  getUser: async (id) => {
    return (await api.get<Usuario>(`/usuario/${id}`))
      .data
  },
  finishUserRegister: async (paramns: FinishUserRegisterParamns) => {
    return (await api.post<[number]>(`/usuario/registro`, paramns))
      .data
  },
  requestPasswordChange: async (email) => {
    return await api.get(`/usuario/redefinir_senha?email=${email}`)
  },
  finishUserPasswordChange: async (params: FinishUserPasswordChangeParamns) => {
    return (await api.post<[number]>(`/usuario/nova_senha`, params))
      .data
  },
}
