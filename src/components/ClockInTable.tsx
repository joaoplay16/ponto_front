import { useState, useEffect } from "react"
import DataTable, { TableColumn } from "react-data-table-component"
import { apiService } from "../services/apiService"
import { PontoTable } from "../types/ponto"
import { getDayName } from "../utils"
import { AxiosError } from "axios"
import { useAuth } from "../contexts"

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
  pagination,
  loadTrigger
}: {
  userId: number
  defaultPerPage: number
  pagination: boolean
  loadTrigger: number
}) => {
  const [data, setData] = useState<PontoTable[]>([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(4)
  const [perPage, setPerPage] = useState(defaultPerPage)
  const [currentPage, setCurrentPage] = useState(1)

  const { logout } = useAuth()

  const fetchClockInData = async () => {
    setLoading(true)

    //A fórmula (currentPage - 1) * perPage é usada para calcular o deslocamento com base na página atual e no número de itens por página.

    //Se a página for a primeira (1), você não precisará pular nenhum registro, pois estará na primeira página. Se a página for a segunda (2), você precisará pular perPage registros para chegar à segunda página. Se a página for a terceira (3), você precisará pular 2 * perPage registros para chegar à terceira página, e assim por diante.

    apiService
      .userClockInReport({
        userId: userId,
        limit: perPage,
        offset: (currentPage - 1) * perPage
      })
      .then((pontosData) => {
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
      })
      .catch((error: AxiosError) => {
        if (error.response?.status == 403) {
          logout()
        }
        console.log("Erro ao buscar registro de pontos", error.response?.statusText)
      })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchClockInData()
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)

    //A fórmula (page - 1) * newPerPage é usada para calcular o deslocamento com base na página atual e no número de itens por página.

    //Se a página for a primeira (1), você não precisará pular nenhum registro, pois estará na primeira página. Se a página for a segunda (2), você precisará pular newPerPage registros para chegar à segunda página. Se a página for a terceira (3), você precisará pular 2 * newPerPage registros para chegar à terceira página, e assim por diante.

    apiService
      .userClockInReport({
        userId: userId,
        limit: newPerPage,
        offset: (page - 1) * newPerPage
      })
      .then((pontosData) => {
        const data: PontoTable[] = pontosData.rows.map(
          (item) =>
            ({
              ...item,
              dia_da_semana: getDayName(item.dia_da_semana)
            }) as PontoTable
        )

        setData(data)
        setLoading(false)
      })
      .catch((error: AxiosError) => {
        if (error.response?.status == 403) {
          logout()
        }
        console.log("Erro ao buscar registro de pontos", error.response?.statusText)
      })

    setPerPage(newPerPage)
    setCurrentPage(page)
  }

  useEffect(() => {
    fetchClockInData()
  }, [currentPage, perPage, loadTrigger])

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
