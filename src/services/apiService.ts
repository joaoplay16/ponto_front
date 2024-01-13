import { type Ponto } from "../types/index"
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
}

export const apiService: ApiService = {
  userClockInReport: async ({ userId, limit = 10, offset = 0}) => {
    return (
      await api.get<PontosData>(
        `/usuario/${userId}/pontos?limit=${limit}&offset=${offset}`
      )
    ).data
  }
}
