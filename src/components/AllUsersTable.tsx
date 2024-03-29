import { useState, useEffect } from "react"
import DataTable, { TableColumn } from "react-data-table-component"
import { UsuariosData, apiService } from "../services/apiService"
import Select from "./Select"
import { Usuario } from "../types"
import { Link } from "react-router-dom"
import { formatCellphone } from "../utils"
import { AxiosError } from "axios"

const columns: TableColumn<Usuario>[] = [
  {
    name: "Nome",
    selector: (row) => row.nome_de_usuario,
    sortable: true,
    cell: (row) => {
      return (
        <Link
          className="text-blue-500 hover:text-orange-700"
          to={`/admin/usuario/${row.id}/perfil`}>
          {row.nome}
        </Link>
      )
    },
    center: true,
    wrap: true,
    minWidth: "230px"
  },
  {
    name: "Cargo",
    selector: (row) => row.cargo,
    wrap: true,
    minWidth: "130px"
  },
  {
    name: "Nome de usuário",
    selector: (row) => row.nome_de_usuario,
    sortable: true,
    wrap: true,
    minWidth: "150px"
  },
  {
    name: "E-mail",
    selector: (row) => row.email,
    sortable: true,
    wrap: true,
    minWidth: "230px"
  },
  {
    name: "Celular",
    selector: (row) => row.celular,
    wrap: true,
    minWidth: "150px",
    format: (row) => formatCellphone(row.celular)
  },
  {
    name: "Ativo",
    selector: (row) => row.ativo,
    sortable: true,
    format: (row) => {
      return row.ativo === 1 ? "sim" : "não"
    }
  }
]

export const AllUsersTable = ({
  defaultPerPage,
  pagination
}: {
  defaultPerPage: number
  pagination: boolean
}) => {
  const [data, setData] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(4)
  const [perPage, setPerPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCargo, setSelectedCargo] = useState("colaborador")

  const fetchAllUsersWorkingHours = async (
    cargo: string,
    limit: number,
    offset: number
  ) => {
    //A fórmula (currentPage - 1) * perPage é usada para calcular o deslocamento com base na página atual e no número de itens por página.

    //Se a página for a primeira (1), você não precisará pular nenhum registro, pois estará na primeira página. Se a página for a segunda (2), você precisará pular perPage registros para chegar à segunda página. Se a página for a terceira (3), você precisará pular 2 * perPage registros para chegar à terceira página, e assim por diante.
    setLoading(true)

    apiService
      .allUsersReport(cargo, limit, offset)
      .then((workingHoursData) => {
        setData(workingHoursData.rows)
        setTotalRows(workingHoursData.count)
      })
      .catch((error: AxiosError) => {
        console.log("Erro ao obter relatório de todos os usuários")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchAllUsersWorkingHours(
      selectedCargo,
      perPage,
      (currentPage - 1) * perPage
    )
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    fetchAllUsersWorkingHours(
      selectedCargo,
      newPerPage,
      (currentPage - 1) * newPerPage
    )

    setPerPage(newPerPage)
    setCurrentPage(page)
  }

  useEffect(() => {
    fetchAllUsersWorkingHours(
      selectedCargo,
      perPage,
      (currentPage - 1) * perPage
    )
  }, [currentPage, perPage, selectedCargo])

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

export default AllUsersTable
