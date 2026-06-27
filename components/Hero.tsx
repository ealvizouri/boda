import Image from 'next/image'
import DoubleChevronDown from './DoubleChevronDown'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-screen flex-col items-center justify-between overflow-hidden"
    >
      <Image
        src="/assets/home/section1/background.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      {/* <div className="absolute inset-0 bg-black/30" /> */}

      <div className="relative z-10 flex flex-col items-center pt-60 text-center">
        <h1 className="relative -left-4 mb-6 font-script text-[90px] leading-none text-[#faf1e1] md:text-[130px]">
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
          <div className="my-4 flex w-full justify-center">
            <Image
              src="/assets/home/shared/monograma_white.svg"
              alt="Monograma M&J"
              width={60}
              height={60}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-cormorant text-[18px] font-light text-[#faf1e1]/90 uppercase">
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
      <DoubleChevronDown className="bottom-5" />
    </section>
  )
}
