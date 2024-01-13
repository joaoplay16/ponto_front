import { useState } from "react"
import { Header, SideBarForUser } from "./components"
import { Outlet } from "react-router-dom"

function App() {
  const [isMenuOpen, setMenuOpen] = useState(true)

  return (
    <div className="flex h-screen ">
      <SideBarForUser
        className={`w-0  bg-gray-700 ${
          isMenuOpen ? "md:w-52" : "md:w-0"
        } flex-shrink-0 duration-200 `}
      />
      <div className="h-full w-full">
        <Header
          className="bg-gray-700 md:flex-grow"
          isMenuOpen={isMenuOpen}
          openMenu={() => {
            setMenuOpen(!isMenuOpen)
          }}
        />
        <div className="flex flex-col p-4 md:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
