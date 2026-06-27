import Image from 'next/image'

const EVENTS = [
  {
    time: '5:00 PM',
    label: 'Ceremonia',
    icon: '/assets/home/programa/rings.svg',
  },
  {
    time: '6:10 PM',
    label: 'Recepción',
    icon: '/assets/home/programa/table.svg',
  },
  {
    time: '6:50 PM',
    label: 'Cena',
    icon: '/assets/home/programa/cookwear.svg',
  },
  {
    time: '8:55 PM',
    label: '¡A bailar!',
    icon: '/assets/home/programa/crystal_ball.svg',
  },
  { time: '3:00 AM', label: 'Bye bye', icon: '/assets/home/programa/car.svg' },
]

export default function Programa() {
  return (
    <section
      id="programa"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20"
    >
      <Image
        src="/assets/home/programa/background.jpeg"
        alt=""
        fill
        className="object-cover object-top-left md:object-center"
      />
      {/* <div className="absolute inset-0 bg-black/45" /> */}

      <div className="relative z-10 mx-auto w-full max-w-[320px] md:max-w-lg">
        <div className="mb-8 text-center">
          <h2 className="font-cormorant text-4xl tracking-[0.15em] text-white text-shadow-2xs">
            PROGRAMA
          </h2>
        </div>

        {/* Wax seal overlapping top of card */}
        <div className="relative z-20 -mb-9 flex justify-center">
          <Image
            src="/assets/home/shared/sello_rojo.png"
            alt=""
            width={80}
            height={80}
            className="drop-shadow-lg"
          />
        </div>

        {/* Timeline card */}
        <div className="relative overflow-hidden px-6 pt-14 pb-32 shadow-2xl">
          <Image
            src="/assets/home/programa/background_paper.png"
            alt=""
            fill
            className="object-cover"
          />

          <div className="relative z-10 flex flex-col">
            {/* Vertical center line */}
            <div className="absolute top-[-10%] bottom-0 left-1/2 h-[10%] w-[0.5px] -translate-x-1/2 bg-[#7d7e74]" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-[#7d7e74]" />
            <div className="absolute top-full bottom-[-10%px] left-1/2 h-[5%] w-[0.5px] -translate-x-1/2 bg-[#7d7e74]" />

            {EVENTS.map(({ time, label, icon }, i) => (
              <div
                key={time}
                className={`relative flex items-center ${i < EVENTS.length - 1 ? 'mb-6' : ''}`}
              >
                {/* Icon — left side on mobile, alternates on desktop */}
                <div className="flex flex-1 justify-end pr-6">
                  <div className="md:hidden">
                    <Image
                      src={icon}
                      alt={label}
                      width={80}
                      height={80}
                      className=""
                    />
                  </div>
                  <div className="hidden items-center justify-end md:flex">
                    {i % 2 === 0 ? (
                      <Image
                        src={icon}
                        alt={label}
                        width={90}
                        height={90}
                        className=""
                      />
                    ) : (
                      <div className="text-right">
                        <p className="font-sans text-sm leading-tight font-semibold text-deep-space-blue">
                          {time}
                        </p>
                        <p className="mt-0.5 font-sans text-xs font-light text-deep-space-blue-400">
                          {label}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Center dot */}
                <div className="z-10 h-2.5 w-2.5 shrink-0 rounded-full bg-gray-400" />

                {/* Text — right side on mobile, alternates on desktop */}
                <div className="flex-1 pl-6">
                  <div className="md:hidden">
                    <p className="font-sans text-sm leading-tight font-semibold text-deep-space-blue">
                      {time}
                    </p>
                    <p className="mt-0.5 font-sans text-xs font-light text-deep-space-blue-400">
                      {label}
                    </p>
                  </div>
                  <div className="hidden items-center md:flex">
                    {i % 2 === 0 ? (
                      <div>
                        <p className="font-sans text-sm leading-tight font-semibold text-deep-space-blue">
                          {time}
                        </p>
                        <p className="mt-0.5 font-sans text-xs font-light text-deep-space-blue-400">
                          {label}
                        </p>
                      </div>
                    ) : (
                      <Image
                        src={icon}
                        alt={label}
                        width={54}
                        height={54}
                        className="opacity-70"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
