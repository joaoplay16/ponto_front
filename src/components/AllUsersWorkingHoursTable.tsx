import { useState, useEffect } from "react"
import DataTable, { TableColumn } from "react-data-table-component"
import { AllUsersWorkingHoursData, apiService } from "../services/apiService"
import { formatDate, getDayName, getMonth } from "../utils"
import Select from "./Select"
import { WorkingHoursWithUserTableType } from "../types/workingHours"
import { error } from "console"
import { AxiosError } from "axios"
import { useAuth } from "../contexts"

const columns: TableColumn<WorkingHoursWithUserTableType>[] = [
  {
    name: "Data",
    selector: (row) => row.data,
    sortable: true,
    format: (row) => { return formatDate(row.data) }
  },
  {
    name: "Dia da semana",
    selector: (row) => row.dia_da_semana
  },
  {
    name: "Nome",
    selector: (row) => row.usuario.nome,
    sortable: true
  },
  {
    name: "Nome de usuário",
    selector: (row) => row.usuario.cargo,
    sortable: true
  },
  {
    name: "Cargo",
    selector: (row) => row.usuario.nome_de_usuario
  },
  {
    name: "Horas trabalhadas",
    selector: (row) => row.horas_trabalhadas,
    sortable: true,
    format: (row) => { return row.horas_trabalhadas != null ? row.horas_trabalhadas : "Jornada incompleta"},
    wrap: true,
    minWidth: "150px"
  }
]

export const AllUsersWorkingHoursTable = ({
  defaultPerPage,
  pagination
}: {
  defaultPerPage: number
  pagination: boolean
}) => {
  const [data, setData] = useState<WorkingHoursWithUserTableType[]>([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(4)
  const [perPage, setPerPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedCargo, setSelectedCargo] = useState("")

  const { logout } = useAuth()

  const fetchAllUsersWorkingHours = async () => {
    setLoading(true)

    //A fórmula (currentPage - 1) * perPage é usada para calcular o deslocamento com base na página atual e no número de itens por página.

    //Se a página for a primeira (1), você não precisará pular nenhum registro, pois estará na primeira página. Se a página for a segunda (2), você precisará pular perPage registros para chegar à segunda página. Se a página for a terceira (3), você precisará pular 2 * perPage registros para chegar à terceira página, e assim por diante.

    apiService
      .allUsersWorkingHoursReport({
        limit: perPage,
        offset: (currentPage - 1) * perPage,
        mes: selectedMonth,
        ano: selectedYear,
        cargo: selectedCargo
      })
      .then((workingHoursData) => {
        const data: WorkingHoursWithUserTableType[] = workingHoursData.rows.map(
          (item) =>
            ({
              ...item,
              dia_da_semana: getDayName(item.dia_da_semana)
            }) as WorkingHoursWithUserTableType
        )

        setData(data)
        setTotalRows(workingHoursData.count)
        setLoading(false)
      })
      .catch((error: AxiosError) => {
        setLoading(false)

        if (error.response?.status == 403) {
          logout()
        }
        console.log(
          "Errro ao buscar horas trabalhadas dos usuários -> ",
          error.message
        )
      })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchAllUsersWorkingHours()
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)

    //A fórmula (page - 1) * newPerPage é usada para calcular o deslocamento com base na página atual e no número de itens por página.

    //Se a página for a primeira (1), você não precisará pular nenhum registro, pois estará na primeira página. Se a página for a segunda (2), você precisará pular newPerPage registros para chegar à segunda página. Se a página for a terceira (3), você precisará pular 2 * newPerPage registros para chegar à terceira página, e assim por diante.

    apiService
      .allUsersWorkingHoursReport({
        limit: perPage,
        offset: (currentPage - 1) * perPage,
        mes: selectedMonth,
        ano: selectedYear,
        cargo: selectedCargo
      })
      .then((workingHoursData) => {
        const data: WorkingHoursWithUserTableType[] = workingHoursData.rows.map(
          (item) =>
            ({
              ...item,
              dia_da_semana: getDayName(item.dia_da_semana)
            }) as WorkingHoursWithUserTableType
        )

        setData(data)
        setTotalRows(workingHoursData.count)
        setLoading(false)
      })
      .catch((error: AxiosError) => {
        setLoading(false)

        if (error.response?.status == 403) {
          logout()
        }
        console.log(
          "Errro ao buscar horas trabalhadas dos usuários -> ",
          error.message
        )
      })
    setCurrentPage(page)
  }

  useEffect(() => {
    fetchAllUsersWorkingHours()
  }, [currentPage, perPage, selectedYear, selectedMonth, selectedCargo])

  const paginationComponentOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos"
  }

  return (
    <div className="flex flex-col ">
      <div className="flex flex-grow-0 justify-end gap-2">
        <Select
          title={"Mês"}
          values={Array.from({ length: 12 }, (_, index) => index + 1)}
          defaultValue={selectedMonth}
          onSelect={function (selected): void {
            setSelectedMonth(selected as number)
          }}
          transformValue={function (value: string | number): string | number {
            if (typeof value == "number") {
              return getMonth(value) || value
            }
            return value
          }}
        />
        <Select
          title={"Ano"}
          values={Array.from({ length: 14 }, (_, index) => 2024 - index)}
          defaultValue={selectedYear}
          onSelect={function (selected: string | number): void {
            setSelectedYear(selected as number)
          }}
        />
        <Select
          title={"Cargo"}
          values={["colaborador", "gestor"]}
          defaultValue={"colaborador"}
          onSelect={function (selected: string | number): void {
            setSelectedCargo(selected as string)
          }}
        />
      </div>
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
        noDataComponent="Nenhum registro de horas trabalhadas encontrado"
      />
    </div>
  )
}

export default AllUsersWorkingHoursTable
