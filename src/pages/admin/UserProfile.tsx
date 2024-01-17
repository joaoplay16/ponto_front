import { Button, CardConquistas, ScreenTitle } from "../../components"
import { useAuth } from "../../contexts"
import { ChangeEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Usuario } from "../../types"
import { ApiErrorResponse, apiService } from "../../services/apiService"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"

const UserProfile = () => {
  const { id } = useParams()

  const [user, setUser] = useState<Usuario | null>(null)

  const [updateStatus, setUpdateStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const fetchUser = async () => {
    if (id !== undefined) {
      apiService
        .getUser(Number(id))
        .then((user) => {
          setUser(user)
        })
        .catch((error: AxiosError<ApiErrorResponse>) => {
          const errorMessage =
            error.response?.data.error || "Usuario não encontrado"
          setUpdateStatus({
            success: false,
            message: errorMessage
          })

          console.log(errorMessage, error.response?.statusText)
        })
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const { handleSubmit } = useForm({})

  async function onSubmit() {
    if (user) {
      const { criado_em, ...userToUpdate } = user
      apiService
        .updateUser({ ...userToUpdate, ativo: user.ativo == 1 ? 0 : 1 })
        .then((affectedRows) => {
          if (affectedRows[0] > 0) {
            setUpdateStatus({
              success: true,
              message: "Atualizado com sucesso"
            })
            fetchUser()
          }
        })
        .catch((error: AxiosError<ApiErrorResponse>) => {
          const errorMessage =
            error.response?.data.error || "Falha ao atualizar"

          setUpdateStatus({
            success: false,
            message: errorMessage
          })

          console.log(errorMessage, error.response?.statusText)
        })
    }
  }

  return (
    <div className="">
      <ScreenTitle title="Perfil" />
      <hr className="mb-3 border-t-2" />
      <h5 className="my-1 text-sm text-gray-600 md:my-3 md:text-[20px] ">
        Você está na área administrativa para visualização do perfil do
        colaborador.
      </h5>

      <div className="flex flex-wrap gap-8">
        <div className="w-80">
          <div className="flex max-w-96 flex-col gap-2 rounded-xl bg-gray-200 px-3 py-2 text-sm text-slate-600 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-28 w-28 rounded-full border-4 border-orange-400 bg-slate-600"></img>
            <span className="font-medium">{user?.nome}</span>
            <span className="font-medium">
              Nome de usuário{" "}
              <span className="font-normal">{user?.nome_de_usuario}</span>
            </span>
            <span className="font-medium">
              E-mail <span className="font-normal">{user?.email}</span>
            </span>
            <span className="font-medium">
              Celular
              <span className="font-normal">{user?.celular}</span>
            </span>
            <span className="font-medium">
              Cargo <span className="font-normal">{user?.cargo}</span>
            </span>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Button type="submit">
                {user?.ativo ? "Desativar" : "Ativar"}
              </Button>
            </form>
          </div>
          {updateStatus?.success && (
            <div
              role="alert"
              className="mt-1 self-center rounded-full bg-green-700/70 px-4 py-1 text-xs text-slate-200">
              {updateStatus.message}
            </div>
          )}
          ,
          {updateStatus?.success == false && (
            <div
              role="alert"
              className="mt-1 self-center rounded-full bg-red-700/70 px-4 py-1 text-xs text-slate-200">
              {updateStatus.message}
            </div>
          )}
        </div>
        <CardConquistas />
      </div>
    </div>
  )
}

export default UserProfile
