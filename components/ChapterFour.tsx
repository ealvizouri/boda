import ChapterIllustration from './ChapterIllustration'
import StoryChapter from './StoryChapter'

export default function ChapterFour() {
  return (
    <StoryChapter
      background="/assets/home/shared/background_green.png"
      flip
      className="text-[#faf1e1]"
    >
      <div className="flex w-full shrink-0 flex-col items-center md:w-5/12">
        <h2 className="mb-1 font-antarisk text-5xl drop-shadow md:text-6xl">
          Capítulo 4
        </h2>
        <p className="mb-5 font-news text-lg font-bold">La propuesta</p>
        <ChapterIllustration
          papel="/assets/home/shared/papel_gif.png"
          animation="/assets/home/Capitulo4/animation.gif"
          animationClassName="w-[55%] h-[55%]"
        />
      </div>

      <div className="flex-1 text-center font-quattro text-sm md:text-left">
        <p className="mb-5 text-xl font-semibold">
          Cuando el universo se alineó
        </p>
        <p className="mb-4 leading-relaxed">
          21 de enero de 2025. Mariano rentó una cabaña con un telescopio.
          Jackie miraba el cielo cuando él se arrodilló. Venus, Marte, Júpiter,
          Saturno, Urano y Neptuno.
        </p>
        <p className="font-bold italic">
          &ldquo;La infinidad de estrellas, todas las posibilidades... y aún así
          nos pudimos encontrar. ¿Te casarías conmigo?&rdquo;
        </p>
      </div>
    </StoryChapter>
  )
}
