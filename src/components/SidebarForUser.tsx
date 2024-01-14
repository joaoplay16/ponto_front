import { HTMLProps } from "react"
import { Sidebar, SideBarItem, SideBarItemDropdown } from "./index"
import { navigationRoutes } from "../RoutePaths"
import { Link } from "react-router-dom"

const SidebarForUser = (props: HTMLProps<HTMLElement>) => {
  return (
    <Sidebar {...props}>
      <SideBarItem title="Dashboard" to="/" />
      <SideBarItemDropdown
        title="Relatórios"
        items={[
          <Link
          className="block rounded px-2 py-0 hover:bg-slate-600/50 hover:text-orange-400 "
          to={navigationRoutes.user.report.clockIn}>
          Ponto
        </Link>,
          <Link
            className="block rounded px-2 py-0 hover:bg-slate-600/50 hover:text-orange-400 "
            to={navigationRoutes.user.report.wourkingHours}>
            Horas trabalhadas
          </Link>
        ]}
      />
      <SideBarItem title="Calendário" to="#" />
      <SideBarItem title="Solicitações" to="#" />
      <SideBarItem title="Configurações" to="#" />
    </Sidebar>
  )
}

export default SidebarForUser
