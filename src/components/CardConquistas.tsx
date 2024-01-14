const CardConquistas = () => (
  <div className="flex max-h-52 max-w-80 flex-col gap-2 overflow-y-auto rounded-xl bg-gray-200 px-3 py-2 text-sm text-slate-600 shadow-md">
    <h5 className="text-xl">Conquistas e Reconhecimentos</h5>
    <p>Seu desempenho tem sido consistente. Continue assim!</p>

    <div className="flex flex-wrap justify-start gap-x-4 gap-y-1">
      <div className="mb-2 self-start rounded-full bg-blue-800/55 px-1 py-0 text-[16px] text-gray-100">
        <span> Funcionário do Mês</span>
      </div>
      <div className="mb-2 self-start rounded-full bg-blue-800/55 px-1 py-0 text-[16px] text-gray-100">
        <span> Inovação Destacada</span>
      </div>
      <div className="mb-2 self-start rounded-full bg-blue-800/55 px-1 py-0 text-[16px] text-gray-100">
        <span> Certificado de Excelência</span>
      </div>
      <div className="mb-2 self-start rounded-full bg-blue-800/55 px-1 py-0 text-[16px] text-gray-100">
        <span> Meta Superada</span>
      </div>
      <div className="mb-2 self-start rounded-full bg-blue-800/55 px-1 py-0 text-[16px] text-gray-100">
        <span> Prêmio de Inovação Tecnológica</span>
      </div>
    </div>
  </div>
)

export default CardConquistas
