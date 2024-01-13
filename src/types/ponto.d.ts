type Ponto = {
    id: number,
    data: string,
    dia_da_semana: number,
    hora_entrada: string,
    hora_saida: string?
}


export type PontoTable = Ponto & {
    id: number,
    data: string,
    dia_da_semana: string,
    hora_entrada: string,
    hora_saida: string?
  }

export default Ponto