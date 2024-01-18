import { useState, useEffect } from "react"
import DataTable, { TableColumn } from "react-data-table-component"
import { UsuariosData, apiService } from "../services/apiService"
import Select from "./Select"
import { Usuario } from "../types"
import { Link } from "react-router-dom"

const columns: TableColumn<Usuario>[] = [
  {
    name: "Nome",
    selector: (row) => row.nome,
    sortable: true
  },
  {
    name: "Dia da semana",
    selector: (row) => row.cargo
  },
  {
    name: "Nome",
    selector: (row) => row.nome_de_usuario,
    sortable: true,
    cell: (row, rowIndex, column, id) => {
        return(
          <Link className="hover:text-orange-700" to={`/admin/usuario/${row.id}/perfil`}>
            {row.nome}
          </Link>
        )
    }
  },
  {
    name: "Nome de usuário",
    selector: (row) => row.email,
    sortable: true
  },
  {
    name: "Cargo",
    selector: (row) => row.celular
  },
  {
    name: "Ativo",
    selector: (row) => row.ativo,
    sortable: true,
    format: (row) => { return row.ativo ===  1 ? "sim" : "não"}
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

  const fetchAllUsersWorkingHours = async () => {
    setLoading(true)

    //A fórmula (currentPage - 1) * perPage é usada para calcular o deslocamento com base na página atual e no número de itens por página.

    //Se a página for a primeira (1), você não precisará pular nenhum registro, pois estará na primeira página. Se a página for a segunda (2), você precisará pular perPage registros para chegar à segunda página. Se a página for a terceira (3), você precisará pular 2 * perPage registros para chegar à terceira página, e assim por diante.

    const workingHoursData: UsuariosData = await apiService.allUsersReport(
      selectedCargo,
      perPage,
      (currentPage - 1) * perPage
    )

    setData(workingHoursData.rows)
    setTotalRows(workingHoursData.count)
    setLoading(false)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchAllUsersWorkingHours()
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)

    //A fórmula (page - 1) * newPerPage é usada para calcular o deslocamento com base na página atual e no número de itens por página.

    //Se a página for a primeira (1), você não precisará pular nenhum registro, pois estará na primeira página. Se a página for a segunda (2), você precisará pular newPerPage registros para chegar à segunda página. Se a página for a terceira (3), você precisará pular 2 * newPerPage registros para chegar à terceira página, e assim por diante.

    const workingHoursData: UsuariosData = await apiService.allUsersReport(
      selectedCargo,
      perPage,
      (currentPage - 1) * perPage
    )

    setData(workingHoursData.rows)
    setPerPage(newPerPage)
    setCurrentPage(page)
    setLoading(false)
  }

  useEffect(() => {
    fetchAllUsersWorkingHours()
  }, [currentPage, perPage, selectedCargo])

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
    </div>
  )
}

export default AllUsersTable
