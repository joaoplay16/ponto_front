function getMonth(month: number): string | undefined {
  const monthNames: Record<number, string> = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro"
  }

  // Validar se o dia está no intervalo correto
  if (month >= 1 && month <= 12) {
    return monthNames[month]
  } else {
    console.error("Mês inválido. Informe um valor entre 1 e 12.")
    return undefined
  }
}

export { getMonth }
