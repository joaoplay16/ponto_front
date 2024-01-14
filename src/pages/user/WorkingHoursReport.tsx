import { CardInfo, WorkingHoursTable } from "../../components"

const WorkingHoursReport = () => {
  return (
    <div className="flex flex-wrap gap-4 md:gap-16">
      <div className="">
        <WorkingHoursTable defaultPerPage={12} pagination userId={1} />
      </div>
        <CardInfo/>
    </div>
  )
}

export default WorkingHoursReport
