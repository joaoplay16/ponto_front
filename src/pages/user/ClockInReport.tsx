import { CardInfo } from "../../components"
import ClockInTable from "../../components/ClockInTable"

const ClockInReport = () => {
  return (
    <div className="flex flex-wrap gap-4 md:gap-16">
      <div className="">
        <ClockInTable defaultPerPage={12} pagination userId={1} />
      </div>
        <CardInfo/>
    </div>
  )
}

export default ClockInReport
