export default function getDayName(day: number): string | undefined {
    const dayNames: Record<number, string> = {
      1: "Domingo",
      2: "Segunda",
      3: "Terça",
      4: "Quarta",
      5: "Quinta",
      6: "Sexta",
      7: "Sábado"
    };
  
    // Validar se o dia está no intervalo correto
    if (day >= 1 && day <= 7) {
      return dayNames[day];
    } else {
      console.error("Dia inválido. Informe um valor entre 1 e 7.");
      return undefined;
    }
  }