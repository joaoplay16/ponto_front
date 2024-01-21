import { useForm } from "react-hook-form"
import {
  Button,
  CardConquistas,
  ScreenTitle,
  ValidationError
} from "../../components"
import { useAuth } from "../../contexts"
import { ChangeEvent, useEffect, useState } from "react"
import { ApiErrorResponse, apiService } from "../../services/apiService"
import { AxiosError } from "axios"
import { Usuario } from "../../types"
import { formatCellphone } from "../../utils"

type FormUpdateProfileData = {
  phone: string
  password: string
  repeatPassword: string
}

const Profile = () => {
  const { userInfo, logout } = useAuth()

  const [user, setUser] = useState<Usuario | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null)
  const [updateStatus, setUpdateStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  useEffect(() => {
    if (userInfo?.user?.id)
      apiService
        .getUser(userInfo?.user?.id)
        .then((user) => {
          setUser(user)
        })
        .catch((error: AxiosError<ApiErrorResponse>) => {
          if (error.response?.status == 403) {
            logout()
          }

          const errorMessage =
            error.response?.data.error || "Erro ao atualizar usuário"

          setUpdateStatus({ success: false, message: errorMessage })

          console.log(`${errorMessage} -> ${error.message}`)
        })
    setUpdateStatus(null)
  }, [editMode])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormUpdateProfileData>({
    mode: "onBlur",
    reValidateMode: "onBlur"
  })

  const [phoneNumber, setPhoneNumber] = useState<string>()



  useEffect(() => {
    setPhoneNumber(formatCellphone(user?.celular || ""))
  }, [user?.celular])

  async function onSubmit(data: FormUpdateProfileData) {
    const { password, repeatPassword } = data
    const passwordMatch = password == repeatPassword
    setPasswordMatch(passwordMatch)

    if (!passwordMatch) return

    if (userInfo.user) {
      if (!user) return

      const { id, nome, nome_de_usuario, ativo, cargo, e_admin, email } = user

      apiService
        .updateUser({
          id,
          nome,
          nome_de_usuario,
          cargo,
          e_admin,
          ativo,
          email,
          celular: data.phone.replace(/\D/g, "")
        })
        .then((affectedRows) => {
          // if (affectedRows[0] > 0) {
          setUpdateStatus({
            success: true,
            message: "Atualizado com sucesso"
          })
          reset()
          setPhoneNumber(data.phone)
          // }
        })
        .catch((error: AxiosError<ApiErrorResponse>) => {
          if (error.response?.status == 403) {
            logout()
          }

          const errorMessage =
            error.response?.data.error || "Erro ao atualizar usuário"

          setUpdateStatus({ success: false, message: errorMessage })

          console.log(`${errorMessage} -> ${error.message}`)
        })
    }
  }

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Remove todos os caracteres não numéricos exceto '-', '(' e ')'
    var numericValue = e.target.value.replace(/[^0-9\(\)-]/g, "") 

    setPhoneNumber(formatCellphone(numericValue || ""))
  }

  return (
    <div className="">
      <ScreenTitle title="Perfil" />
      <hr className="mb-3 border-t-2" />
      <div className="flex flex-wrap gap-8">
        <div className="w-80">
          {!editMode && (
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
              Celular <span className="font-normal">{formatCellphone(user?.celular || "")}</span>
              </span>
              <span className="font-medium">
                Cargo <span className="font-normal">{user?.cargo}</span>
              </span>
              <div className="self-start">
                <Button onClick={() => setEditMode(true)}>
                  Alterar perfil
                </Button>
              </div>
            </div>
          )}

          {/* ATUALIZAR */}

          {editMode && (
            <div className="flex max-w-96 flex-col items-center gap-2 rounded-xl bg-gray-200 px-3 py-2 text-sm text-slate-600 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="h-28 w-28 rounded-full border-4 border-orange-400 bg-slate-600"></img>
              <span className="font-medium">{user?.nome}</span>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-1">
                <input
                  type="tel"
                  id="phone"
                  className="focus:orange-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:ring-orange-500"
                  value={phoneNumber}
                  placeholder="Celular*"
                  {...register("phone", {
                    required: "Você deve digitar seu numéro",
                    minLength: {
                      value: 15,
                      message: "O número deve ter pelo menos 11 digitos"
                    },
                    pattern: {
                      value: /^[0-9\(\) -]+$/,
                      message: "Por favor, insira apenas números"
                    }
                  })}
                  onChange={handlePhoneNumberChange}
                />
                <ValidationError fieldError={errors.phone} />
                <input
                  type="password"
                  id="password"
                  className="focus:orange-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:ring-orange-500"
                  placeholder="Senha"
                  {...register("password", {
                    minLength: {
                      value: 8,
                      message: "A senha deve ter no mínimo 8 caracteres"
                    },
                    pattern: {
                      value: /^[^\s]{8,}$/,
                      message: "A senha não pode conter espaços"
                    }
                  })}
                />
                <ValidationError fieldError={errors.password} />
                <input
                  type="password"
                  id="repeatPassword"
                  className="focus:orange-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:ring-orange-500"
                  placeholder="Repita a senha"
                  {...register("repeatPassword", {
                    minLength: {
                      value: 8,
                      message: "A senha deve ter no mínimo 8 caracteres"
                    },
                    pattern: {
                      value: /^[^\s]{8,}$/,
                      message: "A senha não pode conter espaços"
                    }
                  })}
                />
                <ValidationError fieldError={errors.repeatPassword} />
                {passwordMatch == false && (
                  <div role="alert" className="mt-1 text-xs text-red-500">
                    As senhas não são iguais
                  </div>
                )}
                <div className="flex gap-2 self-center pt-2">
                  <Button type="submit">Atualizar</Button>
                  <Button
                    className="bg-red-700"
                    type="button"
                    onClick={() => setEditMode(false)}>
                    Cancelar
                  </Button>
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
              </form>
            </div>
          )}
        </div>
        <CardConquistas />
      </div>
    </div>
  )
}

export default Profile
