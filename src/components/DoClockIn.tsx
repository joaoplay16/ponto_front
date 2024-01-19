import React, { useState, useEffect, MouseEvent } from "react"
import { apiService } from "../services/apiService"

const DoClockIn = ({
  userId,
  onClockIn
}: {
  userId: number
  onClockIn: () => void
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [clockInSuccess, setClockInSuccess] = useState<boolean | null>(null)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const handleDoClokIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    apiService
      .doClockIn(userId)
      .then(() => {
        onClockIn()
        setClockInSuccess(true)
        console.log("Sucesso ao bater o ponto")
      })
      .catch((error) => {
        setClockInSuccess(false)
        console.log("Erro ao bater o ponto")
      })

    setTimeout(() => {
      setClockInSuccess(null)
    }, 3000)
  }

  const formattedDateTime = currentDateTime.toLocaleString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })

  return (
    <div className="flex h-64 w-64 flex-col items-center justify-between rounded-xl bg-gray-200 p-3 text-slate-600 shadow-md">
      <h4 className="text-center font-light">{formattedDateTime}</h4>
      <button
        onClick={handleDoClokIn}
        className={`h-32 w-32 rounded-full bg-slate-600 ring-4 ${
          clockInSuccess === null
            ? ""
            : clockInSuccess
              ? "ring-green-500"
              : "ring-red-500"
        }`}>
        $
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
