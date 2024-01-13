import { HTMLProps, MouseEvent, useState } from "react"

interface HeaderProp extends HTMLProps<HTMLElement> {
  isMenuOpen: boolean
  openMenu: () => void
}

const Header = ({ openMenu, isMenuOpen, ...props }: HeaderProp) => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const handleOpenProfileMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setProfileDropdownOpen((prev) => !prev)
  }

  return (
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
        <div className="relative ml-3">
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

            <span className="font-medium text-slate-300"> João </span>
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
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-0">
              Perfil
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-1">
              Sair
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
