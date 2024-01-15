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

export type WorkingHoursWithUser = WorkingHours & {
    usuario: Usuario
}

export type WorkingHoursWithUserTableType = WorkingHoursWithUser & {
    dia_da_semana: string,
}



export default WorkingHours