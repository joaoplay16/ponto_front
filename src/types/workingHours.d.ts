import Usuario from "./usuario"

type WorkingHours = {
    data: string,
    dia_da_semana: number,
    horas_trabalhadas: string
}

export type WorkingHoursTableType = {
    data: string,
    dia_da_semana: string,
    horas_trabalhadas: string
}

export type WorkingHoursPerMonthCount = {
    usuario_id: number,
    mes: number
    horas_trabalhadas: string
}

export type WorkingHoursWithUser = WorkingHours & Usuario

export default WorkingHours