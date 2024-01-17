import { CardInfo, ScreenTitle } from "../../components"
import ClockInTable from "../../components/ClockInTable"
import { useAuth } from "../../contexts"

const ClockInReport = () => {
  const { userInfo } = useAuth()
  const userId = userInfo.user?.id
  return (
    <div>
      <ScreenTitle title="Relatório de ponto" />
      <hr className="border-t-2" />
      <h5 className="my-1 text-sm text-gray-600 md:my-3 md:text-[20px] ">
        Bem-vindo ao seu relatório de ponto. Aqui estão algumas informações
        essenciais
      </h5>
      <div className="flex flex-wrap gap-4 md:gap-16">
        <div className="">
          {userId && (
            <ClockInTable defaultPerPage={12} pagination userId={userId} loadTrigger={0}/>
          )}
        </div>
        <CardInfo />
      </div>
    </div>
  )
}

export default ClockInReport
