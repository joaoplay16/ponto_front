import { CardInfo } from "../../components"
import ClockInTable from "../../components/ClockInTable"
import { useAuth } from "../../contexts"

const ClockInReport = () => {

  const { userInfo } = useAuth()

  return (
    <div className="flex flex-wrap gap-4 md:gap-16">
      <div className="">
        <ClockInTable defaultPerPage={12} pagination userId={userInfo.user?.id || 0} />
      </div>
        <CardInfo/>
    </div>
  )
}

export default ClockInReport
