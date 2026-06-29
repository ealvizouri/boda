import ChapterIllustration from './ChapterIllustration'
import StoryChapter from './StoryChapter'

export default function ChapterThree() {
  return (
    <StoryChapter
      id="chapter-three"
      background="/assets/home/shared/background_blue.png"
      className="text-[#670626]"
    >
      <div className="flex w-full shrink-0 flex-col items-center md:w-5/12">
        <h2 className="mb-1 font-antarisk text-5xl drop-shadow md:text-6xl">
          Capítulo 3
        </h2>
        <p className="mb-5 font-news text-lg italic">Un hogar juntos</p>
        <ChapterIllustration animation="/assets/home/Capitulo3/animation.gif" />
      </div>

      <div className="flex-1 text-center font-mono text-sm md:text-left">
        <p className="mb-5 text-xl font-semibold">Un hogar construido juntos</p>
        <p className="mb-4 leading-relaxed">
          Dos años de amistad se convirtieron en amor — y dos años después de
          ser novios, decidieron dar el siguiente paso: compartir el mismo
          techo. Cinco años y medio más tarde, ese hogar sigue siendo el lugar
          favorito de los dos.
        </p>
        <p className="text-base font-bold italic">
          El amor cotidiano — el de los martes por la noche y los domingos sin
          planes — era exactamente el que querían para siempre.
        </p>
      </div>
    </StoryChapter>
  )
}
