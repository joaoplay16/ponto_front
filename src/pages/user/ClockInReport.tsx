import { CardInfo, ScreenTitle } from "../../components"
import ClockInTable from "../../components/ClockInTable"
import { useAuth } from "../../contexts"

const ClockInReport = () => {
  const { userInfo } = useAuth()

  return (
    <div>
      <ScreenTitle title="Relatório de ponto" />
      <hr className="border-t-2" />
      <h5 className="text-gray-600 text-sm md:text-[20px] my-1 md:my-3 ">
        Bem-vindo ao seu relatório de ponto. Aqui estão algumas informações
        essenciais
      </h5>
      <div className="flex flex-wrap gap-4 md:gap-16">
        <div className="">
          <ClockInTable
            defaultPerPage={12}
            pagination
            userId={userInfo.user?.id || 0}
          />
        </div>
        <CardInfo />
      </div>
    </div>
  )
}

export default ClockInReport
