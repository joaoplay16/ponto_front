import { useForm } from "react-hook-form"
import { Button, ValidationError } from "../../components"
import { Link, useNavigate } from "react-router-dom"
import { navigationRoutes } from "../../RoutePaths"
import { useAuth } from "../../contexts"
import { AxiosError } from "axios"
import { useState } from "react"
import { ApiErrorResponse } from "../../services/apiService"

type FormUpdateLoginData = {
  email: string
  password: string
}

const Login = () => {
  const { login } = useAuth()

  const navigator = useNavigate()
  const [loginStatus, setLoginStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormUpdateLoginData>({
    mode: "onBlur",
    reValidateMode: "onBlur"
  })

  async function onSubmit(data: FormUpdateLoginData) {
    login(data.email, data.password)
      .then((user) => {
        console.log("USUARIO LOGADO", user)
        navigator("/")
      })
      .catch((error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data.error || "Erro ao fazer login"
        setLoginStatus({
            success: false,
            message: errorMessage
        })

        console.log(`${errorMessage} -> ${error.message}`)
      })
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-80 gap-2 rounded-xl bg-gray-200 p-6 text-sm text-slate-600 shadow-md">
        <h1 className="pb-2 text-2xl">Login</h1>
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
          <div className="flex justify-between pb-3 pt-1">
            <div className="flex self-end ">
              <label htmlFor="email" className=" mr-2 text-[16px]">
                Salvar login?
              </label>
              <input
                type="checkbox"
                id="admin"
                className="focus:orange-500 block w-4 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:ring-orange-500"
              />
            </div>
            <Link
              to={navigationRoutes.forgotPassword}
              className="text-[16px] hover:text-orange-600">
              Esqueceu a senha?
            </Link>
          </div>
          <Button>Login</Button>

          <div className="flex  pt-4 text-[16px]">
            <span>
              Não tem uma conta?{" "}
              <Link className="text-blue-600/85" to={navigationRoutes.register}>
                Crie uma aqui
              </Link>
            </span>
          </div>
        </form>

        {loginStatus?.success == false && (
          <div
            role="alert"
            className="mt-1 self-center rounded-full bg-red-700/70 px-4 py-1 text-xs text-slate-200">
            {loginStatus.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
