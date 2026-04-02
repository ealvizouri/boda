import { useState, useEffect } from "react";

// Update this with your actual wedding date
const WEDDING_DATE = new Date("2026-09-12T16:00:00");

function pad(n) {
  return String(n).padStart(2, "0");
}

function getCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Hero() {
  const [countdown, setCountdown] = useState(getCountdown());

  useEffect(() => {
    const id = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-papaya-whip-900"
    >
      {/* Decorative corner ornaments */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-muted-olive opacity-60" />
      <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-muted-olive opacity-60" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-muted-olive opacity-60" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-muted-olive opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="font-sans font-light tracking-[0.4em] uppercase text-muted-olive-300 text-sm mb-8">
          Tienen el honor de ser invitados a celebrar la boda de
        </p>

        <h1 className="font-display font-light text-deep-space-blue leading-none mb-2">
          <span className="block text-6xl md:text-8xl lg:text-9xl">Jackie</span>
          <span className="block font-light italic text-brick-red text-5xl md:text-7xl my-2 md:my-4">
            &amp;
          </span>
          <span className="block text-6xl md:text-8xl lg:text-9xl">
            Mariano
          </span>
        </h1>

        <div className="my-10 flex items-center justify-center gap-4">
          <span className="block h-px w-20 bg-muted-olive" />
          <p className="font-display italic text-steel-blue text-xl md:text-2xl tracking-wider">
            12 de septiembre de 2026
          </p>
          <span className="block h-px w-20 bg-muted-olive" />
        </div>

        <p className="font-sans font-light tracking-[0.3em] uppercase text-deep-space-blue-400 text-xs mb-12">
          Venue Name · City, Country
        </p>

        {/* Countdown */}
        {countdown && (
          <div className="grid grid-cols-4 gap-4 md:gap-8 mb-14 max-w-md mx-auto">
            {[
              { label: "Días", value: countdown.days },
              { label: "Horas", value: pad(countdown.hours) },
              { label: "Min", value: pad(countdown.minutes) },
              { label: "Seg", value: pad(countdown.seconds) },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="font-display text-4xl md:text-5xl text-brick-red font-light leading-none">
                  {value}
                </span>
                <span className="font-sans text-xs tracking-widest uppercase text-deep-space-blue-400 mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        <a href="#rsvp" className="btn-primary inline-block">
          Confirmar Asistencia
        </a>
      </div>

      {/* Scroll cue */}
      <a
        href="#details"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-olive opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Scroll down"
      >
        <span className="font-sans text-xs tracking-widest uppercase">
          Ver más
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="animate-bounce"
        >
          <path
            d="M8 0v20M1 14l7 8 7-8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
