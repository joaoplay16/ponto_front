import { useEffect, useState, MouseEvent } from "react"

const DoClockIn = ({
  onClockInClick,
  clockInSuccess
}: {
  userId: number
  onClockInClick: (e: MouseEvent<HTMLButtonElement>) => void
  clockInSuccess: boolean | null
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [toogleButtonAnimation, setToogleButtonAnimation] = useState("")

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const formattedDateTime = currentDateTime.toLocaleString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })

  return (
    <div className="flex h-64 w-64 flex-col items-center justify-between rounded-xl bg-gray-200 p-3 text-slate-600 shadow-md ">
      <h4 className="text-center font-light">{formattedDateTime}</h4>
      <button
        onClick={(e) => {
          setToogleButtonAnimation("duration-500 ring-[16px] ring-opacity-0")
          onClockInClick(e)
        }}
        className={`h-32 w-32 rounded-full bg-slate-600 outline outline-4 outline-orange-500 ring-orange-500 ${toogleButtonAnimation}  ${
          clockInSuccess === null
            ? ""
            : clockInSuccess
              ? "outline-green-500"
              : "outline-red-500"
        }`}
        onTransitionEnd={() => {
          setToogleButtonAnimation("ring-opacity-100 ring-[0px]")
        }}>
        {clockInSuccess === null ? (
          ""
        ) : clockInSuccess ? (
          <span className="text-white">sucesso</span>
        ) : (
          <span className="text-white">erro</span>
        )}
      </button>
      <h4 className="text-center font-light ">
        Clique aqui para bater o ponto
      </h4>
    </div>
  )
}

export default DoClockIn
