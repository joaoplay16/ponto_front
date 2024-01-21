import { IMask } from "react-imask"

const pipe = IMask.createPipe({
  mask: "(00) 00000-0000"
})

function formatCellphone(number: string): string {
  return pipe(number)
}

export { formatCellphone }
