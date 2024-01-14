import { useEffect } from "react"
import { DashboarItem, DoClockIn, ScreenTitle } from "../../components"
import { apiService } from "../../services/apiService"
import ClockInTable from "../../components/ClockInTable"

const Dashboard = () => {
  useEffect(() => {
    apiService.userClockInReport({ userId: 1 }).then((data) => {
      console.log("PONTO", data.rows)
    })
  }, [])

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
        <DoClockIn />
        <div className="">
          <ClockInTable userId={1} defaultPerPage={4} pagination={false} />
        </div>
      </div>
    </>
  )
}

export default Dashboard
