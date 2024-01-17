import { CardInfo, ScreenTitle, WorkingHoursTable } from "../../components"
import { useAuth } from "../../contexts"

const WorkingHoursReport = () => {
  const { userInfo } = useAuth()
  const userId = userInfo.user?.id

  return (
    <div>
      <ScreenTitle title="Relatório de horas trabalhadas" />
      <hr className="border-t-2" />
      <h5 className="my-1 text-sm text-gray-600 md:my-3 md:text-[20px] ">
        Bem-vindo ao seu relatório de horas trabalhadas. Aqui estão algumas
        informações essenciais
      </h5>
      <div className="flex flex-wrap gap-4 md:gap-16">
        <div className="">
          {userId && (
            <WorkingHoursTable
              defaultPerPage={12}
              pagination
              userId={userId}
            />
          )}
        </div>
        <CardInfo />
      </div>
    </div>
  )
}

export default WorkingHoursReport
