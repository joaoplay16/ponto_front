import { HTMLProps, ReactNode, useEffect, useRef, useState } from "react"
import { useAuth } from "../contexts"
import { Link } from "react-router-dom"
import { navigationRoutes } from "../RoutePaths"

interface HeaderProp extends HTMLProps<HTMLElement> {
  isMenuOpen: boolean
  openMenu: () => void
}

type HeaderItemProps = {
  title: string
  to: string
}

type HeaderItemDropdownProps = {
  title: string
  items: ReactNode[]
}

const HeaderItemDropdown = ({ title, items }: HeaderItemDropdownProps) => {
  const [isExpanded, setExpanded] = useState(true)
  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setExpanded((prev) => !prev)
  }

  return (
    <li className="flex flex-col ">
      <button
        onClick={handleExpand}
        className="hover:bg-slate-800/ 50 rounded px-2 py-1 text-left ring-2 ring-slate-500 duration-100 hover:text-orange-500 hover:ring-slate-400 focus:bg-slate-400/50 focus:hover:text-inherit ">
        {title}
      </button>
      <ul
        className={`overflow-hidden pl-2  transition-all duration-300 ease-linear ${isExpanded ? "max-h-40" : "max-h-0"}`}>
        {items.map((item, index) => (
          <li key={index} className="text-md text-base">
            {item}
          </li>
        ))}
      </ul>
    </li>
  )
}

const HeaderItem = ({ title, to }: HeaderItemProps) => {
  return (
    <li className="block">
      <Link
        to={to}
        className="block rounded px-2 py-1 ring-2 ring-slate-500 duration-100 hover:bg-slate-800/50 hover:text-orange-500 hover:ring-slate-400 focus:bg-slate-400/50 focus:hover:text-inherit ">
        {title}
      </Link>
    </li>
  )
}

const Header = ({ openMenu, isMenuOpen, ...props }: HeaderProp) => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOpenProfileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setProfileDropdownOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener("click", handleOutsideClick)

    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [])

  const { userInfo, logout } = useAuth()

  return (
    <>
      <nav className="bg-gray-800" {...props}>
        <div className="flex items-center justify-between py-0 pl-1 pr-6 lg:py-2">
          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            onClick={openMenu}>
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Abrir menu</span>

            <svg
              className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <svg
              className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12h18"></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18"></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 18h18"></path>
            </svg>
          </button>

          {/* Profile dropdown */}
          <div className="relative ml-3" ref={dropdownRef}>
            <button
              type="button"
              className="relative flex items-center gap-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={handleOpenProfileMenu}
              id="user-menu-button"
              aria-expanded={isProfileDropdownOpen}
              aria-haspopup="true">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Abrir perfil</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />

              <span className="font-medium text-slate-300">
                {userInfo.user?.nome}
              </span>
            </button>

            <div
              id="profile-menu"
              className={`absolute right-0 z-10 mt-2 w-48 origin-top-right transform rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition-transform focus:outline-none ${
                isProfileDropdownOpen ? "scale-100" : "scale-0"
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex={-1}>
              <Link
                to={navigationRoutes.user.profile}
                onClick={() => setProfileDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-0">
                Perfil
              </Link>
              <Link
                to={"/"}
                onClick={logout}
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-1">
                Sair
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <nav>
        <div
          className={`flex flex-col gap-2 overflow-hidden bg-gray-800 text-slate-300 duration-200 md:hidden ${isMenuOpen ? "max-h-68 px-4 py-2" : "max-h-0 p-0"}`}>
          <HeaderItem title="Dashboard" to={"/"} />
          <HeaderItemDropdown
            title="Relatórios"
            items={[
              <Link
                to={navigationRoutes.user.report.clockIn}
                className="mt-1 block rounded px-2 py-0.5 hover:bg-slate-600/50 hover:text-orange-400 ">
                Ponto
              </Link>,
              <Link
                to={navigationRoutes.user.report.wourkingHours}
                className="mt-1 block rounded px-2 py-0.5 hover:bg-slate-600/50 hover:text-orange-400 ">
                Horas trabalhadas
              </Link>
            ]}
          />
          <HeaderItem title="Calendário" to="#" />
          <HeaderItem title="Solicitações" to="#" />
          <HeaderItem title="Configurações" to="#" />
        </div>
      </nav>
    </>
  )
}

export default Header
