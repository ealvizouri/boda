import ChapterIllustration from './ChapterIllustration'
import StoryChapter from './StoryChapter'

export default function ChapterTwo() {
  return (
    <StoryChapter
      id="chapter-two"
      background="/assets/home/shared/background_red.png"
      flip
      className="text-[#faf1e1]"
    >
      <div className="flex w-full shrink-0 flex-col items-center md:w-5/12">
        <h2 className="mb-2 font-antarisk text-5xl drop-shadow md:text-6xl">
          Capítulo 2
        </h2>
        <p className="mb-5 font-news text-base italic">Dos años de amistad</p>
        <ChapterIllustration animation="/assets/home/Capitulo2/animation.gif" />
      </div>

      <div className="flex-1 text-center font-quattro text-sm md:text-left">
        <div className="font-antarisk text-3xl">2018</div>
        <p className="mb-5 text-xl font-semibold">
          Primero, los mejores amigos
        </p>
        <p className="mb-4 leading-relaxed">
          No fue un flechazo. Y eso, con el tiempo, resultó ser su mayor regalo.
          Durante dos años se conocieron sin filtros, sin poses, sin el peso de
          impresionar al otro.
        </p>
        <p className="mb-4 leading-relaxed">
          Construyeron una amistad tan sólida que cuando el amor llegó, ya tenía
          raíces profundas y{' '}
          <span className="font-bold">
            dos años después de aquel primer encuentro, comenzaron oficialmente
            su noviazgo
          </span>
          .
        </p>
        <p className="leading-relaxed">
          Hoy, tras ocho años compartiendo la vida, la fórmula sigue siendo la
          misma:
          <br />
          <span className="font-bold">
            antes que nada, son el mejor amigo del otro.
          </span>
        </p>
      </div>
    </StoryChapter>
  )
}
