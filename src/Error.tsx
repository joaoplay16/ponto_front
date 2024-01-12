import React, { Component, ErrorInfo } from "react"

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
        <div>
          <h1>Algo deu errado!</h1>
          <p>Desculpe, ocorreu um erro inesperado.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
