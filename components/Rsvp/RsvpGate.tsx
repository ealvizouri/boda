export default function RsvpGate({
  onSelect,
}: {
  onSelect: (attending: boolean) => void
}) {
  return (
    <>
      <p className="mb-1 font-mono text-sm font-light text-white/75">
        Favor de confirmar antes del
      </p>
      <p className="mb-10 font-cormorant text-2xl font-semibold text-white">
        1 de Agosto
      </p>

      <p className="mb-8 font-cormorant text-2xl text-white italic">
        ¿Nos acompañas?
      </p>

      <div className="mb-10 flex flex-col gap-4">
        <button
          onClick={() => onSelect(true)}
          className="w-full rounded-full bg-white py-4 font-mono text-sm tracking-[0.15em] text-deep-space-blue transition-colors hover:bg-white/90"
        >
          ¡Ahí estaré!
        </button>
        <button
          onClick={() => onSelect(false)}
          className="w-full rounded-full border border-white/70 py-4 font-mono text-sm tracking-[0.15em] text-white transition-colors hover:bg-white/10"
        >
          No podré asistir
        </button>
      </div>

      <p className="mb-3 font-mono text-xs leading-relaxed font-light text-white/55">
        Nos encantan los pequeños pero en esta ocasión hemos decidido que la
        celebración sea{' '}
        <strong className="font-semibold text-white/75">
          solo para adultos
        </strong>
      </p>
      <p className="font-mono text-xs leading-relaxed font-light text-white/45">
        Agradecemos tu comprensión y esperamos que este día sea una oportunidad
        para que disfrutes y te relajes al máximo con nosotros
      </p>
    </>
  )
}
