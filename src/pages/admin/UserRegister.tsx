import { useForm } from "react-hook-form"
import { Button, ScreenTitle, ValidationError } from "../../components"
import { ChangeEvent, useState } from "react"
import { ApiErrorResponse, apiService } from "../../services/apiService"
import { AxiosError } from "axios"

type FormUpdateUserRegisterData = {
  name: string
  user_name: string
  phone: string
  email: string
  isAdmin: boolean
}

const WorkingHoursReport = () => {
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
        celular: phone,
        email,
        e_admin: isAdmin
      })
      .then((user) => {
        setRegisterStatus({
          success: true,
          message: "Usuário cadastrado com sucesso"
        })
        reset()
        setPhoneNumber("")
      })
      .catch((error: AxiosError<ApiErrorResponse>) => {
        const errorMessage =
          error.response?.data.error || "Falha ao cadastrar usuário"
          setRegisterStatus({
            success: false,
            message: errorMessage
          })
          console.log(`${errorMessage} -> ${error.message}`)
      })
  }

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    var numericValue = e.target.value.replace(/\D/g, "") // Remove todos os caracteres não numéricos
    numericValue = numericValue.slice(0, 11) // limita para 11 digitos
    setPhoneNumber(numericValue)
  }

  return (
    <div>
      <ScreenTitle title="Cadastro de colaborador" />
      <hr className="border-t-2" />
      <h5 className="my-1 text-sm text-gray-600 md:my-3 md:text-[20px] ">
      Você está na área administrativa para cadastro de colaboradores.
      </h5>
      <div className="flex max-w-96 flex-col items-center gap-2 rounded-xl bg-gray-200 px-3 py-2 text-sm text-slate-600 shadow-md">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="h-28 w-28 rounded-full border-4 border-orange-400 bg-slate-600"></img>
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
                value: 11,
                message: "O número deve ter pelo menos 11 digitos"
              },
              pattern: {
                value: /^[0-9]+$/,
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
          <div className="flex self-end ">
            <label htmlFor="email" className=" mr-2 text-sm">
              É administrador?{" "}
            </label>
            <input
              type="checkbox"
              id="admin"
              className="focus:orange-500 block w-4 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:ring-orange-500"
            />
          </div>
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

export default WorkingHoursReport
