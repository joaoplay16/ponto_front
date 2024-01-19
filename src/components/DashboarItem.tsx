type DashboarItemProps = {
  title: string
  info: string
  smallInfo: string
}

const DashboarItem = ({ title, info, smallInfo }: DashboarItemProps) => {
  return (
    <div className="flex h-24 w-48 sm:w-56 sm:h-28 flex-col justify-between rounded-xl bg-gray-200 px-3 py-2 text-slate-600 shadow-md">
      <div className="flex w-full items-baseline justify-between">
        <span className="text-sm md:text-[22px] font-medium ">{title}</span>
        <span className="flex-shrink-0 rounded-full bg-cyan-900/60 px-2 text-[14px] text-slate-100">
          {smallInfo}
        </span>
      </div>
      <span className="text-sm md:text-[22px]">{info}</span>
    </div>
  )
}

export default DashboarItem
