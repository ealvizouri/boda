import { BG_GREEN, CHAPTER_FOUR_ANIMATION } from '@/lib/images'
import ChapterIllustration from './ChapterIllustration'
import StoryChapter from './StoryChapter'

export default function ChapterFour() {
  return (
    <StoryChapter
      id="chapter-four"
      background={BG_GREEN}
      flip
      className="text-[#faf1e1]"
    >
      <div className="flex w-full shrink-0 flex-col items-center md:w-5/12">
        <h2 className="mb-1 font-antarisk text-5xl drop-shadow md:text-6xl">
          Capítulo 4
        </h2>
        <p className="mb-5 font-news text-lg font-bold">La propuesta</p>
        <ChapterIllustration animation={CHAPTER_FOUR_ANIMATION} />
      </div>

      <div className="flex-1 text-center font-quattro text-sm md:text-left">
        <div className="font-antarisk text-3xl">2025</div>

        <p className="mb-5 text-xl font-semibold">
          Cuando el universo se alineó
        </p>
        <p className="mb-4 leading-relaxed">
          21 de enero de 2025. Seis planetas alineados en el firmamento: Venus,
          Marte, Júpiter, Saturno, Urano y Neptuno. Un espectáculo cósmico que
          no volvería a repetirse en décadas.
        </p>
        <p className="mb-4 leading-relaxed">
          Esa misma noche, en una cabaña bajo ese cielo extraordinario, Jackie
          miraba las estrellas cuando Mariano se arrodilló. El cosmos ya lo
          tenía planeado, pero faltaba la pregunta más importante:
        </p>
        <p className="font-bold italic">
          &ldquo;La infinidad de estrellas, todas las posibilidades... y aún así
          nos pudimos encontrar. ¿Te casarías conmigo?&rdquo;
        </p>
      </div>
    </StoryChapter>
  )
}
