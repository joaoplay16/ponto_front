import { useState, useEffect } from "react"
import DataTable, { TableColumn } from "react-data-table-component"
import { PontosData, apiService } from "../services/apiService"
import { PontoTable } from "../types/ponto"
import { getDayName } from "../utils"

const columns: TableColumn<PontoTable>[] = [
  {
    name: "Data",
    selector: (row) => row.data,
    sortable: true
  },
  {
    name: "Dia da semana",
    selector: (row) => row.dia_da_semana
  },
  {
    name: "Hora entrada",
    selector: (row) => row.hora_entrada
  },
  {
    name: "Hora saída",
    selector: (row) => row.hora_saida || "Pendente"
  }
]

export const ClockInTable = ({
  userId,
  defaultPerPage,
  pagination
}: {
  userId: number
  defaultPerPage: number
  pagination: boolean
}) => {
  const [data, setData] = useState<PontoTable[]>([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(4)
  const [perPage, setPerPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchClockInData = async () => {
    setLoading(true)

    //A fórmula (currentPage - 1) * perPage é usada para calcular o deslocamento com base na página atual e no número de itens por página.

    //Se a página for a primeira (1), você não precisará pular nenhum registro, pois estará na primeira página. Se a página for a segunda (2), você precisará pular perPage registros para chegar à segunda página. Se a página for a terceira (3), você precisará pular 2 * perPage registros para chegar à terceira página, e assim por diante.

    const pontosData: PontosData = await apiService.userClockInReport({
      userId: userId,
      limit: perPage,
      offset: (currentPage - 1) * perPage
    })

    const data: PontoTable[] = pontosData.rows.map(
      (item) =>
        ({
          ...item,
          dia_da_semana: getDayName(item.dia_da_semana)
        }) as PontoTable
    )

    setData(data)
    setTotalRows(pontosData.count)
    setLoading(false)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchClockInData()
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)

    //A fórmula (page - 1) * newPerPage é usada para calcular o deslocamento com base na página atual e no número de itens por página.

    //Se a página for a primeira (1), você não precisará pular nenhum registro, pois estará na primeira página. Se a página for a segunda (2), você precisará pular newPerPage registros para chegar à segunda página. Se a página for a terceira (3), você precisará pular 2 * newPerPage registros para chegar à terceira página, e assim por diante.

    const pontosData: PontosData = await apiService.userClockInReport({
      userId: userId,
      limit: newPerPage,
      offset: (page - 1) * newPerPage
    })

    const data: PontoTable[] = pontosData.rows.map(
      (item) =>
        ({
          ...item,
          dia_da_semana: getDayName(item.dia_da_semana)
        }) as PontoTable
    )

    setData(data)
    setPerPage(newPerPage)
    setCurrentPage(page)
    setLoading(false)
  }

  useEffect(() => {
    fetchClockInData()
  }, [currentPage, perPage])

  const paginationComponentOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos"
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      pagination={pagination}
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      paginationComponentOptions={paginationComponentOptions}
      paginationRowsPerPageOptions={[4, 8, 12, 20]}
      paginationPerPage={defaultPerPage}
      noDataComponent="Nenhum registro de ponto encontrado"
    />
  )
}

export default ClockInTable
