import { DashboarItem, ScreenTitle } from "../../components"

const Dashboard = () => {
  return (
    <>
      <ScreenTitle title="Dashboard" />
      <hr className="mb-6 border-t-2" />

      <div className="mb-4 flex flex-wrap justify-center gap-3 md:justify-start md:gap-6">
        <DashboarItem title="Faltas" smallInfo="este mês" info="38 Faltas" />
        <DashboarItem title="Colaboradores" smallInfo="" info="23 ativos" />
        <DashboarItem
          title="Férias"
          smallInfo="este mês"
          info="3 colaboradores"
        />
        <DashboarItem title="Solicitações" smallInfo="" info="1 solicitação" />
        <DashboarItem title="Jornada" smallInfo="agora" info="15 trabalhando" />
        <DashboarItem
          title="Aniversariantes"
          smallInfo="este mês"
          info="2 colaboradores"
        />
        <DashboarItem
          title="Horas trabalhadas"
          smallInfo="este mês"
          info="3253 horas"
        />
        <DashboarItem title="Locais de trabalho" smallInfo="" info="2" />
      </div>
    </>
  )
}

export default Dashboard
