import { HTMLProps, ReactNode, MouseEvent, useState } from "react"
import { Link } from "react-router-dom"

type SideBarItemProps = {
  title: string
  to: string
}

type SideBarItemDropdownProps = {
  title: string
  items: ReactNode[]
}
export const SideBarItemDropdown = ({
  title,
  items
}: SideBarItemDropdownProps) => {
  const [isExpanded, setExpanded] = useState(true)
  const handleExpand = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setExpanded((prev) => !prev)
  }

  return (
    <li className="flex flex-col ">
      <button
        onClick={handleExpand}
        className="rounded px-2 py-1 text-left duration-100 hover:bg-slate-800/50 hover:text-orange-500 focus:bg-slate-400/50 focus:hover:text-inherit ">
        {title}
      </button>
      <ul
        className={`overflow-hidden pl-6 transition-all duration-300 ease-linear ${isExpanded ? "max-h-40" : "max-h-0"}`}>
        {items.map((item, index) => (
          <li key={index} className="text-md text-base">
            {item}
          </li>
        ))}
      </ul>
    </li>
  )
}

export const SideBarItem = ({ title, to: link }: SideBarItemProps) => {
  return (
    <li className="block">
      <Link
        to={link}
        className="block rounded px-2 py-1 duration-100 hover:bg-slate-800/50 hover:text-orange-500 focus:bg-slate-400/50 focus:hover:text-inherit ">
        {title}
      </Link>
    </li>
  )
}

const SideBar = (props: HTMLProps<HTMLElement>) => {
  return (
    <aside id="sidebar" {...props}>
      <div className="overflow-hidden bg-gray-800 md:block md:py-2 lg:py-3">
        <h3 className="text-center font-medium text-slate-200 md:text-xl lg:text-2xl">
          EmPonto
        </h3>
      </div>
      <div className="p-5">
        <ul className="flex flex-grow flex-col gap-1 overflow-hidden text-sm/3 text-slate-200 md:text-lg lg:gap-2 lg:text-xl">
          {props.children}
        </ul>
      </div>
    </aside>
  )
}

export default SideBar
