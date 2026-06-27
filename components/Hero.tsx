import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <Image
        src="/assets/home/section1/background.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="font-script text-white leading-none mb-6">
          <span className="block text-[76px] md:text-[110px] leading-[0.9]">Jackie &amp;</span>
          <span className="block text-[76px] md:text-[110px] leading-[0.9]">Mariano</span>
        </h1>

        <div className="my-4 w-14 h-14 opacity-90">
          <Image
            src="/assets/home/shared/monograma.svg"
            alt="Monograma M&J"
            width={56}
            height={56}
          />
        </div>

        <p className="font-engravers text-white/90 tracking-[0.35em] text-[11px] uppercase mb-2">
          Are Getting Married
        </p>
        <p className="font-engravers text-white/75 tracking-[0.2em] text-[11px]">
          17 &bull; Octubre &bull; 2026
        </p>
      </div>

      <a
        href="#countdown"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 hover:text-white/90 transition-colors"
        aria-label="Continuar"
      >
        <svg width="22" height="13" viewBox="0 0 22 13" fill="none" className="animate-bounce">
          <path d="M2 2l9 9 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg width="22" height="13" viewBox="0 0 22 13" fill="none" className="animate-bounce [animation-delay:200ms] -mt-1">
          <path d="M2 2l9 9 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}
