export default function RsvpSuccess({ onReset }: { onReset: () => void }) {
  return (
    <>
      <p className="mb-4 font-cormorant text-3xl text-white italic">
        ¡Gracias!
      </p>
      <p className="mb-8 font-mono text-sm leading-relaxed font-light text-white/70">
        Tu respuesta ha sido registrada. Esperamos celebrar este día especial
        contigo.
      </p>
      <button
        onClick={onReset}
        className="font-mono text-xs tracking-widest text-white/60 uppercase underline underline-offset-4 transition-colors hover:text-white/90"
      >
        Enviar otra respuesta
      </button>
    </>
  )
}
