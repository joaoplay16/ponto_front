import { useState, useEffect } from "react"
import DataTable, { TableColumn } from "react-data-table-component"
import { WorkingHoursData, apiService } from "../services/apiService"
import { getDayName, getMonth } from "../utils"
import { type WorkingHoursTableType } from "../types"
import Select from "./Select"
import { error } from "console"
import { AxiosError } from "axios"
import { WorkingHoursPerMonthCount } from "../types/workingHours"

const columns: TableColumn<WorkingHoursTableType>[] = [
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
    name: "Horas trabalhadas",
    selector: (row) => row.horas_trabalhadas
  }
]

export const WorkingHoursTable = ({
  userId,
  defaultPerPage,
  pagination
}: {
  userId: number
  defaultPerPage: number
  pagination: boolean
}) => {
  const [data, setData] = useState<WorkingHoursTableType[]>([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(4)
  const [perPage, setPerPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [totalWorkingHoursPerMonth, setTotalWorkingHoursPerMonth] = useState<
    string | null
  >(null)

  const fetchClockInData = async () => {
    setLoading(true)

    //A fórmula (currentPage - 1) * perPage é usada para calcular o deslocamento com base na página atual e no número de itens por página.

    //Se a página for a primeira (1), você não precisará pular nenhum registro, pois estará na primeira página. Se a página for a segunda (2), você precisará pular perPage registros para chegar à segunda página. Se a página for a terceira (3), você precisará pular 2 * perPage registros para chegar à terceira página, e assim por diante.

    const workingHoursData: WorkingHoursData =
      await apiService.userWorkingHoursReport({
        userId: userId,
        limit: perPage,
        offset: (currentPage - 1) * perPage,
        mes: selectedMonth,
        ano: selectedYear
      })

    const data: WorkingHoursTableType[] = workingHoursData.rows.map(
      (item) =>
        ({
          ...item,
          dia_da_semana: getDayName(item.dia_da_semana)
        }) as WorkingHoursTableType
    )

    setData(data)
    setTotalRows(workingHoursData.count)
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

    const workingHoursData: WorkingHoursData =
      await apiService.userWorkingHoursReport({
        userId: userId,
        limit: newPerPage,
        offset: (page - 1) * newPerPage,
        mes: selectedMonth,
        ano: selectedYear
      })

    const data: WorkingHoursTableType[] = workingHoursData.rows.map(
      (item) =>
        ({
          ...item,
          dia_da_semana: getDayName(item.dia_da_semana)
        }) as WorkingHoursTableType
    )

    setData(data)
    setPerPage(newPerPage)
    setCurrentPage(page)
    setLoading(false)
  }

  useEffect(() => {
    fetchClockInData()
  }, [currentPage, perPage, selectedYear, selectedMonth])

  useEffect(() => {
    apiService
      .userWorkingHoursPerMonthReport(userId, selectedMonth, selectedYear)
      .then((data: WorkingHoursPerMonthCount) => {
        setTotalWorkingHoursPerMonth(data.horas_trabalhadas)
      })
      .catch((error: AxiosError) => {
        console.log("Errro ao buscar horas trabalhadas totais", error)
      })
  }, [selectedYear, selectedMonth])

  const paginationComponentOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos"
  }

  return (
    <div className="flex flex-col ">
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
      {totalRows > 0 && (
        <div className="mb-2 self-end rounded-full bg-slate-600 px-6 py-1 text-[16px] text-gray-200">
          <span> Total de horas trabalhadas {totalWorkingHoursPerMonth}</span>
        </div>
      )}

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
      </div>
    </div>
  )
}

export default WorkingHoursTable
