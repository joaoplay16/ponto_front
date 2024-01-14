import { DashboarItem, DoClockIn, ScreenTitle } from "../../components"
import ClockInTable from "../../components/ClockInTable"
import { useAuth } from "../../contexts"

const Dashboard = () => {
  const { userInfo } = useAuth()

  return (
    <>
      <ScreenTitle title="Dashboard" />
      <hr className="mb-6 border-t-2" />

      <div className="mb-4 flex flex-wrap justify-center gap-3 md:justify-start md:gap-6">
        <DashboarItem title="Faltas" smallInfo="este mês" info="8 Faltas" />
        <DashboarItem
          title="Horas trabalhadas"
          smallInfo="este mês"
          info="36:00:58 saldo atual"
        />
        <DashboarItem
          title="Horas trabalhadas"
          smallInfo="este mês"
          info="36:00:58 saldo atual"
        />
        <DashboarItem
          title="Horas trabalhadas"
          smallInfo="hoje"
          info="04:30:58 saldo atual"
        />
        <DashboarItem
          title="Dias trabalhados"
          smallInfo="este mês"
          info="52 %"
        />
      </div>

      <ScreenTitle title="Ponto" />
      <hr className="mb-2 border-t-2 pb-4" />
      <div className="flex flex-col gap-4 md:gap-10 lg:flex lg:flex-row">
        <DoClockIn userId={userInfo.user?.id || 0}/>
        <div className="">
          <ClockInTable
            userId={userInfo.user?.id || 0}
            defaultPerPage={4}
            pagination={false}
          />
        </div>
      </div>
    </>
  )
}

export default Dashboard
