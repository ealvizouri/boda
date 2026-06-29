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
        <p className="mb-5 text-xl font-semibold">El chico de los audífonos</p>
        <p className="mb-4 leading-relaxed">
          Eran sus primeros días en la oficina y el aburrimiento ya se hacía
          notar, un render interminable es capaz de eso.
        </p>
        <p className="mb-4 leading-relaxed">
          Fue entonces cuando se fijó en el chico de al lado: llevaba los
          audífonos puestos y miraba fijamente una pantalla llena de números y
          gráficas de la bolsa de valores, completamente perdido en su propio
          mundo.
        </p>
        <p className="mb-4 leading-relaxed">
          Mientras Jackie esperaba a que la barra de carga avanzara, la
          curiosidad terminó por ganar.
        </p>
        <p className="mb-2 text-white">
          <span className="font-bold">—¿Qué estás viendo?</span> —preguntó.
        </p>
        <p className="mb-4 leading-relaxed">
          Mariano se bajó los audífonos. Hablaron.
        </p>
        <p className="font-bold">
          Y siguieron hablando, sin tener la menor idea de que esa pequeña
          conversación de oficina se convertiría en el primer hilo de algo mucho
          más grande.
        </p>
      </div>
    </StoryChapter>
  )
}
