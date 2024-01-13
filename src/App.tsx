import { useState } from "react"
import { Header, SideBarForUser } from "./components"

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
      </div>
    </div>
  )
}

export default App
