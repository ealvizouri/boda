import Hero from './components/Hero'
import Details from './components/Details'
import OurStory from './components/OurStory'
import RsvpForm from './components/RsvpForm'
import GuestList from './components/GuestList'

const NAV_LINKS = [
  { href: '#details', label: 'Detalles' },
  { href: '#story', label: 'Nuestra Historia' },
  { href: '#rsvp', label: 'Confirmación' },
  { href: '#guests', label: 'Invitados' },
]

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-papaya-whip/90 backdrop-blur-sm border-b border-muted-olive-800">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#home" className="font-display text-xl text-deep-space-blue tracking-wide">
            M <span className="text-brick-red italic">&amp;</span> J
          </a>
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-sans text-xs tracking-widest uppercase text-deep-space-blue-400 hover:text-brick-red transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#rsvp" className="md:hidden font-sans text-xs tracking-widest uppercase text-brick-red">
            Confirmar
          </a>
        </div>
      </nav>

      <main>
        <Hero />
        <Details />
        <OurStory />
        <RsvpForm />
        <GuestList />
      </main>

      <footer className="bg-deep-space-blue-100 py-12 text-center">
        <p className="font-display text-2xl font-light text-papaya-whip tracking-wider mb-2">
          Mariano <span className="italic text-brick-red">&amp;</span> Jackie
        </p>
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-steel-blue-300">
          12 de septiembre de 2026
        </p>
        <p className="mt-4 font-sans text-xs text-deep-space-blue-400 tracking-wider">
          #MarianoYJackie2026
        </p>
      </footer>
    </div>
  )
}
