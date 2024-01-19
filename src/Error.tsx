import React, { Component, ErrorInfo } from "react"
import { Bulb } from "./assets"

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error: ", error, errorInfo)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col md:flex-row  gap-8 md:gap-4 h-screen w-screen items-center justify-center p-4 text-gray-700">
        <div className="">
          <h1 className="text-[#C76B43] text-2xl md:text-4xl">
            OOPS! <span className="text-gray-600">Algo deu errado</span>
          </h1>
          <h2 className="text-lg md:text-2xl md:pt-2">
            Desculpe, ocorreu um erro inesperado.
          </h2>
        </div>
          <img className="order-first md:-order-last" src={Bulb} width={250} height={250} alt="" />
      </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
