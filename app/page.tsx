export const dynamic = 'force-dynamic'

import Hero from '@/components/Hero'
import Countdown from '@/components/Countdown'
import OurStory from '@/components/OurStory'
import StoryChapter, { type StoryChapterProps } from '@/components/StoryChapter'
import Details from '@/components/Details'
import DressCode from '@/components/DressCode'
import Programa from '@/components/Programa'
import RsvpForm from '@/components/RsvpForm'

const CHAPTERS: StoryChapterProps[] = [
  {
    number: 1,
    subtitle: 'El comienzo',
    heading: 'El chico de los audífonos',
    body: 'Eran sus primeros días en la oficina y el aburrimiento ya se hacía notar, un render interminable es capaz de eso. Fue entonces cuando se fijó en el chico de al lado: llevaba los audífonos puestos y miraba fijamente una pantalla llena de números y gráficas de la bolsa de valores, completamente perdido en su propio mundo. Mientras Jackie esperaba a que la barra de carga avanzara, la curiosidad terminó por ganar.',
    boldLine: '—¿Qué estás viendo? —preguntó.',
    afterBold: 'Mariano se bajó los audífonos. Hablaron. Y siguieron hablando, sin tener la menor idea de que esa pequeña conversación de oficina se convertiría en el primer hilo de algo mucho más grande.',
    background: '/assets/home/shared/background_green.png',
    animation: '/assets/home/section4/animation.gif',
    papel: '/assets/home/shared/papel_gif.png',
    flip: false,
  },
  {
    number: 2,
    subtitle: 'Dos años de amistad',
    heading: 'Primero, los mejores amigos',
    body: 'No fue un flechazo. Y eso, con el tiempo, resultó ser su mayor regalo. Durante dos años se conocieron sin filtros, sin poses, sin el peso de impresionar al otro.',
    boldLine: 'Construyeron una amistad tan sólida que cuando el amor llegó, ya tenía raíces profundas.',
    afterBold: 'Hoy, después de ocho años, siguen siendo eso: el mejor amigo del otro.',
    background: '/assets/home/shared/background_red.png',
    animation: '/assets/home/section5/animation.gif',
    papel: '/assets/home/shared/papel_gif.png',
    flip: true,
  },
  {
    number: 3,
    subtitle: 'Un hogar juntos',
    heading: 'Un hogar construido juntos',
    body: 'Dos años de amistad se convirtieron en amor — y dos años después de ser novios, decidieron dar el siguiente paso: compartir el mismo techo. Cinco años y medio más tarde, ese hogar sigue siendo el lugar favorito de los dos.',
    boldLine: 'El amor cotidiano — el de los martes por la noche y los domingos sin planes — era exactamente el que querían para siempre.',
    background: '/assets/home/shared/background_blue.png',
    animation: '/assets/home/section6/animation.gif',
    papel: '/assets/home/shared/papel_gif.png',
    flip: false,
  },
  {
    number: 4,
    subtitle: 'La propuesta',
    heading: 'Cuando el universo se alineó',
    body: '21 de enero de 2025. Mariano rentó una cabaña con un telescopio. Jackie miraba el cielo cuando él se arrodilló. Venus, Marte, Júpiter, Saturno, Urano y Neptuno.',
    boldLine: '"La infinidad de estrellas, todas las posibilidades... y aún así nos pudimos encontrar. ¿Te casarías conmigo?"',
    background: '/assets/home/shared/background_green.png',
    animation: null,
    papel: '/assets/home/shared/papel_gif.png',
    flip: true,
  },
]

export default function Home() {
  return (
    <div>
      <Hero />
      <Countdown />
      <OurStory />
      {CHAPTERS.map((chapter) => (
        <StoryChapter key={chapter.number} {...chapter} />
      ))}
      <Details />
      <DressCode />
      <Programa />
      <RsvpForm />
    </div>
  )
}
