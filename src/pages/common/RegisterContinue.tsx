import { useForm } from "react-hook-form"
import { Button, ValidationError } from "../../components"
import { useState } from "react"
import { ApiErrorResponse, apiService } from "../../services/apiService"
import { AxiosError } from "axios"
import { useLocation, useNavigate } from "react-router-dom"

type FormContinueRegisterData = {
  password: string
  repeatPassword: string
}

const RegisterContinue = () => {
  const navigator = useNavigate()

  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)

  const username = queryParams.get("usuario")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormContinueRegisterData>({
    mode: "onBlur",
    reValidateMode: "onBlur"
  })

  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null)

  const [registerStatus, setRegisterStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  async function onSubmit(data: FormContinueRegisterData) {
    const { password, repeatPassword } = data
    const passwordMatch = password == repeatPassword
    setPasswordMatch(passwordMatch)
    if (username && passwordMatch) {
      apiService
        .finishUserRegister({
          usuario: username,
          senha: password
        })
        .then((user) => {
          setRegisterStatus({
            success: true,
            message: "Cadastro finalizado com sucesso "
          })
          reset()
          setTimeout(() => {
            navigator("/")
          }, 2000)
        })
        .catch((error: AxiosError<ApiErrorResponse>) => {
          const errorMessage =
            error.response?.data.error || "Erro ao enviar email"

          setRegisterStatus({
            success: false,
            message: errorMessage
          })

          console.log(errorMessage, error.response?.statusText)
        })
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-80 gap-2 rounded-xl bg-gray-200 p-6 text-sm text-slate-600 shadow-md">
        <h1 className="pb-2 text-2xl">
          Continue seu cadastro{" "}
          <span className="text-orange-400">{username}</span>
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-1">
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
            <Button type="submit">Salvar</Button>
          </div>
          {registerStatus?.success && (
            <div
              role="alert"
              className="mt-1 self-center rounded-full bg-green-700/70 px-4 py-1 text-xs text-slate-200">
              {registerStatus.message}
            </div>
          )}
          {registerStatus?.success == false && (
            <div
              role="alert"
              className="mt-1 self-center rounded-full bg-red-700/70 px-4 py-1 text-xs text-slate-200">
              {registerStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default RegisterContinue
