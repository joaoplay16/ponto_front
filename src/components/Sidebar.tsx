import { HTMLProps } from "react"

export const SideBarItem = ({
  title,
  to: link
}: {
  title: string
  to: string
}) => {
  return (
    <li className="block">
      <a
        href={link}
        className="block rounded px-2 py-1 duration-100 hover:bg-slate-800/50 hover:text-orange-500 focus:bg-slate-400/50 focus:hover:text-inherit ">
        {title}
      </a>
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
