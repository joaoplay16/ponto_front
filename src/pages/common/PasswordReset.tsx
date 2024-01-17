import { useForm } from "react-hook-form"
import { Button, ValidationError } from "../../components"
import { Link, useNavigate } from "react-router-dom"
import { navigationRoutes } from "../../RoutePaths"
import { useAuth } from "../../contexts"
import { AxiosError } from "axios"
import { useState } from "react"
import { ApiErrorResponse, apiService } from "../../services/apiService"

type FormPasswordResetData = {
  email: string
}

const PasswordReset = () => {
  const navigator = useNavigate()
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormPasswordResetData>({
    mode: "onBlur",
    reValidateMode: "onBlur"
  })

  async function onSubmit(data: FormPasswordResetData) {
    apiService
      .requestPasswordChange(encodeURIComponent(data.email))
      .then(() => {
        setPasswordChangeStatus({
          success: true,
          message: "E-mail enviado"
        })
      })
      .catch((error: AxiosError<ApiErrorResponse>) => {
        var errorMessage = error.response?.data.error || "Erro ao enviar email"

        setPasswordChangeStatus({
          success: false,
          message: errorMessage
        })

        console.log(errorMessage, error.response?.statusText)
      })
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-80 gap-2 rounded-xl bg-gray-200 p-6 text-sm text-slate-600 shadow-md">
        <h1 className="pb-2 text-2xl">Redefinir senha</h1>
        <p className="pb-2">
          Digite seu endereço de email para receber as instruções para redefinir
          a senha.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-1">
          <input
            type="email"
            id="email"
            className="focus:orange-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:ring-orange-500"
            placeholder="E-mail*"
            {...register("email", {
              required: "Você deve digitar seu e-mail",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de e-mail inválido"
              }
            })}
          />
          <ValidationError fieldError={errors.email} />

          <Button className="mt-4">Enviar</Button>
        </form>

        {passwordChangeStatus?.success == false && (
          <div
            role="alert"
            className="mt-1 self-center rounded-full bg-red-700/70 px-4 py-1 text-xs text-slate-200">
            {passwordChangeStatus.message}
          </div>
        )}
        {passwordChangeStatus?.success == true && (
          <div
            role="alert"
            className="mt-1 self-center rounded-full bg-green-700/70 px-4 py-1 text-xs text-slate-200">
            {passwordChangeStatus.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default PasswordReset
