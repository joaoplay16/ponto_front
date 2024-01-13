import { HTMLProps } from "react"
import { Sidebar, SideBarItem, SideBarItemDropdown } from "./index"

const SidebarForUser = (props: HTMLProps<HTMLElement>) => {
  return (
    <Sidebar {...props}>
      <SideBarItem title="Dashboard" to="#" />
      <SideBarItemDropdown
        title="Relatórios"
        items={[
          <a
            href="#"
            className="block rounded px-2 py-0 hover:bg-slate-600/50 hover:text-orange-400 ">
            Horas trabalhadas
          </a>,
        ]}
      />
      <SideBarItem title="Calendário" to="#" />
      <SideBarItem title="Solicitações" to="#" />
      <SideBarItem title="Configurações" to="#" />
    </Sidebar>
  )
}

export default SidebarForUser
