import MonogramaWhite from '@/public/assets/home/shared/monograma_white.svg'
import DoubleChevronDown from './DoubleChevronDown'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-screen flex-col items-center justify-between overflow-hidden"
    >
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/assets/home/Hero/background_desktop.png"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/home/Hero/background.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      <div className="relative z-10 flex flex-col items-center pt-40 text-center md:pt-28">
        <h1 className="mb-6 font-antarisk text-[90px] leading-none text-[#faf1e1] md:text-[130px]">
          <div className="leading-[0.9]">
            Jackie
            <span className="relative top-8 -left-2.5">&amp;</span>
          </div>
          <div className="pl-20 leading-[0.9]">
            <span className="relative -top-1">Mariano</span>
          </div>
        </h1>
      </div>

      <div className="relative -top-10 z-10 w-full pb-20">
        <div className="w-full text-center">
          <div className="my-4 mb-7 flex w-full justify-center">
            <MonogramaWhite width={65} height={65} />
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-cormorant text-[20px] font-light tracking-[0.45em] text-[#faf1e1]/90 uppercase md:tracking-[0.35em]">
              Are Getting Married
            </p>
            <div className="flex justify-center">
              <hr className="h-0.5 w-48 bg-white" />
            </div>
            <p className="font-cormorant text-[18px] font-bold text-[#faf1e1]/75">
              17 &bull; OCTUBRE &bull; 2026
            </p>
          </div>
        </div>
      </div>
      <DoubleChevronDown hashtag="intro" className="bottom-16" />
    </section>
  )
}
