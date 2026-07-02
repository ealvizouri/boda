export default function RsvpDeclined({
  onChangeMyMind,
}: {
  onChangeMyMind: () => void
}) {
  return (
    <>
      <p className="mb-8 font-cormorant text-3xl leading-tight tracking-[0.15em] text-white">
        ¡Te vamos a
        <br />
        extrañar!
      </p>

      <p className="mb-6 font-quattro text-sm leading-relaxed text-white/85">
        Tu lugar hará falta en nuestra celebración, pero agradecemos
        infinitamente que te hayas tomado el tiempo de confirmar.
      </p>

      <p className="mb-12 font-quattro text-sm leading-relaxed text-white/85">
        Te enviamos un abrazo enorme y sabemos que tu cariño nos acompañará ese
        día.
      </p>

      <p className="mb-10 font-antarisk text-4xl text-[#faf1e1] md:text-5xl">
        Jackie &amp; Mariano
      </p>

      <button
        onClick={onChangeMyMind}
        className="cursor-pointer font-mono text-xs tracking-widest text-white/60 underline underline-offset-4 transition-colors hover:text-white/90"
      >
        ¡Cambié de opinión, mejor sí vamos!
      </button>
    </>
  )
}
