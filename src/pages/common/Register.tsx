import { useForm } from "react-hook-form"
import { Button, ScreenTitle, ValidationError } from "../../components"
import { ChangeEvent, useState } from "react"
import { ApiErrorResponse, apiService } from "../../services/apiService"
import { AxiosError } from "axios"
import { Link } from "react-router-dom"
import { formatCellphone } from "../../utils"

type FormUpdateUserRegisterData = {
  name: string
  user_name: string
  phone: string
  email: string
  isAdmin: boolean
}

const UserRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormUpdateUserRegisterData>({
    mode: "onBlur",
    reValidateMode: "onBlur"
  })

  const [phoneNumber, setPhoneNumber] = useState<string>()

  const [registerStatus, setRegisterStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  async function onSubmit(data: FormUpdateUserRegisterData) {
    const { name, user_name, phone, email, isAdmin } = data

    apiService
      .registerUser({
        nome: name,
        nome_de_usuario: user_name,
        celular: phone.replace(/\D/g, ""),
        email,
        e_admin: isAdmin
      })
      .then((user) => {
        setRegisterStatus({
          success: true,
          message:
            "Continue seu cadastro. Um e-mail foi enviado com as instruções para continuar seu cadastro. "
        })
        reset()
        setPhoneNumber("")
      })
      .catch((error: AxiosError<ApiErrorResponse>) => {
        const errorMessage =
          error.response?.data.error || "Erro ao enviar email"

        setRegisterStatus({
          success: false,
          message: errorMessage
        })
        console.log(`${errorMessage} -> ${error.message}`)
      })
  }

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Remove todos os caracteres não numéricos exceto '-', '(' e ')'
    var numericValue = e.target.value.replace(/[^0-9\(\)-]/g, "") 

    setPhoneNumber(formatCellphone(numericValue || ""))
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-80 gap-2 rounded-xl bg-gray-200 p-6 text-sm text-slate-600 shadow-md">
        <h1 className="pb-2 text-2xl">Cadastro</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-1">
          <input
            type="text"
            id="name"
            className="focus:orange-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:ring-orange-500"
            placeholder="Nome*"
            {...register("name", {
              required: "Você deve digitar seu nome",
              minLength: {
                value: 3,
                message: "Nome muito curto"
              }
            })}
          />
          <ValidationError fieldError={errors.name} />

          <input
            type="text"
            id="user_name"
            className="focus:orange-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:ring-orange-500"
            placeholder="Nome de usuário*"
            {...register("user_name", {
              required: "Você deve digitar seu nome de usuário",
              minLength: {
                value: 4,
                message: "O nome de usuário ter pelo menos 4 caracteres"
              },
              pattern: {
                value: /^[^\s]{4,}$/,
                message: "O nome de usuário não pode conter espaços"
              }
            })}
          />
          <ValidationError fieldError={errors.user_name} />
          <input
            type="text"
            id="phone"
            className="focus:orange-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:ring-orange-500"
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
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <ValidationError fieldError={errors.phone} />
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
          <div className="flex  pt-4 text-[16px]">
            <span>
              Já tem uma conta?{" "}
              <Link className="text-blue-600/85" to={"/"}>
                Faça login aqui
              </Link>
            </span>
          </div>
          <div className="flex gap-2 self-center pt-2">
            <Button type="submit">Salvar</Button>
          </div>
          {registerStatus?.success && (
            <div
              role="alert"
              className="mt-1 self-center rounded-full bg-green-700/70 px-4 py-1 text-xs text-slate-200">
              Continue seu cadastro. Um e-mail foi enviado com as instruções
              para continuar seu cadastro.
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

export default UserRegister
