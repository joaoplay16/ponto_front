import { MouseEvent, useState } from "react"
import { DashboarItem, DoClockIn, Modal, ScreenTitle } from "../../components"
import ClockInTable from "../../components/ClockInTable"
import { useAuth } from "../../contexts"
import { apiService } from "../../services/apiService"

const Dashboard = () => {
  const { userInfo } = useAuth()
  const userId = userInfo.user?.id

  const [loadTrigger, setLoadTrigger] = useState<number>(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [clockInSuccess, setClockInSuccess] = useState<boolean | null>(null)

  const handleDoClokIn = () => {
    if (userId) {
      apiService
        .doClockIn(userId)
        .then(() => {
          setClockInSuccess(true)
          setLoadTrigger( prev => prev + 1)
          console.log("Sucesso ao bater o ponto")
        })
        .catch((error) => {
          setClockInSuccess(false)
          console.log("Erro ao bater o ponto")
        })

      setTimeout(() => {
        setClockInSuccess(null)
      }, 3000)
    }
  }

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
        {userId && (
          <>
            <DoClockIn
              userId={userId}
              onClockInClick={() => setModalOpen(true)}
              clockInSuccess={clockInSuccess}
            />
            <div className="">
              <ClockInTable
                userId={userId}
                defaultPerPage={8}
                pagination={true}
                loadTrigger={loadTrigger}
              />
            </div>
          </>
        )}
      </div>

      <Modal
        open={modalOpen}
        tittle={"Bater o ponto"}
        description={"Você vai bater o ponto mesmo?"}
        onPositiveButtonClick={() => {
          setModalOpen(false)
          handleDoClokIn()
        }}
        onNegativeButtonClick={() => {
          setModalOpen(false)
        }}
      />
    </>
  )
}

export default Dashboard
