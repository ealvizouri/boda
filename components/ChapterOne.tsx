import ChapterIllustration from './ChapterIllustration'
import StoryChapter from './StoryChapter'

export default function ChapterOne() {
  return (
    <StoryChapter
      id="chapter-one"
      background="/assets/home/shared/background_green.png"
      className="text-[#faf1e1]"
    >
      <div className="flex w-full shrink-0 flex-col items-center md:w-5/12">
        <h2 className="mb-1 font-antarisk text-5xl drop-shadow md:text-6xl">
          Capítulo 1
        </h2>
        <p className="mb-5 font-news text-lg italic">El comienzo</p>
        <ChapterIllustration animation="/assets/home/Capitulo1/animation.gif" />
      </div>

      <div className="flex-1 text-center font-quattro text-sm md:text-left">
        <div className="font-antarisk text-3xl">2016</div>
        <p className="mb-5 text-xl font-semibold">El chico de los audífonos</p>
        <p className="mb-4 leading-relaxed">
          Apenas eran sus primeros días en la oficina y el aburrimiento ya se
          hacía notar, cortesía de un render eterno. Para matar el tiempo,
          Jackie giró la vista hacia el escritorio de al lado. Ahí estaba él:
          con los audífonos puestos y la mirada fija en un mar de gráficas
          bursátiles, completamente desconectado del entorno.
        </p>
        <p className="mb-4 leading-relaxed">
          Con la barra de carga estancada, la curiosidad fue más fuerte. —
          <span className="font-bold">¿Qué estás viendo?</span> —preguntó
          Jackie. Mariano se quitó los audífonos. Hablaron.
          <br />
          <span className="font-bold">
            Y no pararon de hacerlo, sin la menor idea de que esa breve charla
            de oficina estaba tejiendo el inicio de algo mucho más grande
          </span>
        </p>
      </div>
    </StoryChapter>
  )
}
