import { BG_PAPER, PROGRAMA_BACKGROUND, SELLO_ROJO, SHADOW } from '@/lib/images'
import CarIcon from '@/public/assets/home/Programa/car.svg'
import CookwearIcon from '@/public/assets/home/Programa/cookwear.svg'
import CrystalBallIcon from '@/public/assets/home/Programa/crystal_ball.svg'
import RingsIcon from '@/public/assets/home/Programa/rings.svg'
import TableIcon from '@/public/assets/home/Programa/table.svg'
import Image from 'next/image'

const EVENTS = [
  {
    time: '5:00 PM',
    label: 'Ceremonia',
    icon: <RingsIcon width={90} height={90} />,
  },
  {
    time: '6:10 PM',
    label: 'Recepción',
    icon: <TableIcon width={120} height={120} />,
  },
  {
    time: '6:50 PM',
    label: 'Cena',
    icon: <CookwearIcon width={110} height={110} />,
  },
  {
    time: '8:55 PM',
    label: '¡A bailar!',
    icon: <CrystalBallIcon width={110} height={110} />,
  },
  {
    time: '3:00 AM',
    label: 'Bye bye',
    icon: <CarIcon width={90} height={90} />,
  },
]

export default function Programa() {
  return (
    <section
      id="programa"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20"
    >
      <Image
        src={PROGRAMA_BACKGROUND}
        alt=""
        fill
        className="object-cover object-top-left md:object-center"
      />

      <div className="relative z-10 mx-auto w-full max-w-[320px] md:max-w-lg">
        <div className="mb-8 text-center">
          <h2 className="font-cormorant text-4xl tracking-[0.15em] text-white text-shadow-2xs">
            PROGRAMA
          </h2>
        </div>

        {/* Wax seal overlapping top of card */}
        <div className="relative z-20 -mb-9 flex justify-center">
          <Image
            src={SELLO_ROJO}
            alt=""
            width={80}
            height={80}
            className="drop-shadow-lg"
          />
        </div>

        {/* Timeline card */}
        <div className="relative px-6 pt-14 pb-32 shadow-2xl">
          {/* Drop shadow beneath card */}
          <div className="absolute top-0 -left-21 z-0 h-full w-21">
            <Image src={SHADOW} alt="" fill className="object-fill" />
          </div>

          <Image src={BG_PAPER} alt="" fill className="object-cover" />

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
                  <div className="md:hidden">{icon}</div>
                  <div className="hidden items-center justify-end md:flex">
                    {i % 2 === 0 ? (
                      icon
                    ) : (
                      <div className="text-right text-[#4b4e40]">
                        <p className="font-quattro text-sm leading-tight font-semibold">
                          {time}
                        </p>
                        <p className="mt-0.5 font-mono text-xs font-light">
                          {label}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Center dot */}
                <div></div>
                <div className="absolute left-1/2 z-10 h-2.5 w-2.5 shrink-0 -translate-x-1/2 rounded-full bg-[#7d7e74]" />

                {/* Text — right side on mobile, alternates on desktop */}
                <div className="flex-1 pl-6">
                  <div className="text-center text-[#4b4e40] md:hidden">
                    <p className="font-quattro text-sm leading-tight font-semibold">
                      {time}
                    </p>
                    <p className="mt-0.5 font-mono text-xs font-light">
                      {label}
                    </p>
                  </div>
                  <div className="hidden items-center md:flex">
                    {i % 2 === 0 ? (
                      <div className="text-[#4b4e40]">
                        <p className="font-mono text-sm leading-tight font-semibold">
                          {time}
                        </p>
                        <p className="mt-0.5 font-mono text-xs font-light">
                          {label}
                        </p>
                      </div>
                    ) : (
                      icon
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
