import { BG_BLUE, CHAPTER_THREE_ANIMATION } from '@/lib/images'
import ChapterIllustration from './ChapterIllustration'
import StoryChapter from './StoryChapter'

export default function ChapterThree() {
  return (
    <StoryChapter
      id="chapter-three"
      background={BG_BLUE}
      className="text-[#670626]"
    >
      <div className="flex w-full shrink-0 flex-col items-center md:w-5/12">
        <h2 className="mb-1 font-antarisk text-5xl drop-shadow md:text-6xl">
          Capítulo 3
        </h2>
        <p className="mb-5 font-news text-lg italic">Un hogar juntos</p>
        <ChapterIllustration animation={CHAPTER_THREE_ANIMATION} />
      </div>

      <div className="flex-1 text-center font-quattro text-sm md:text-left">
        <div className="font-antarisk text-3xl">2020</div>
        <p className="mb-5 text-xl font-semibold">Un hogar construido juntos</p>
        <p className="mb-4 leading-relaxed">
          Dos años después de ser novios, decidieron dar el siguiente paso:
          <br />
          <span className="font-bold">compartir el mismo techo.</span>
        </p>
        <p className="mb-4 leading-relaxed">
          Cinco años llenos de complicidad y crecimiento consolidaron ese
          espacio como el lugar favorito de los dos.
        </p>
        <p className="">
          <span className="font-bold">El amor cotidiano — </span>el de los
          martes por la noche y los domingos sin planes{' '}
          <span className="font-bold">
            — era exactamente el que querían para siempre
          </span>
          .
        </p>
      </div>
    </StoryChapter>
  )
}
