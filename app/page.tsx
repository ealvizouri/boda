export const dynamic = 'force-dynamic'

import ChapterFour from '@/components/ChapterFour'
import ChapterOne from '@/components/ChapterOne'
import ChapterThree from '@/components/ChapterThree'
import ChapterTwo from '@/components/ChapterTwo'
import Countdown from '@/components/Countdown'
import Details from '@/components/Details'
import DressCode from '@/components/DressCode'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import MesaDeRegalos from '@/components/MesaDeRegalos'
import OurStory from '@/components/OurStory'
import Programa from '@/components/Programa'
import Rsvp from '@/components/Rsvp'

export default function Page() {
  return (
    <div>
      <Hero />
      <Intro />
      <Countdown />
      <OurStory />
      <ChapterOne />
      <ChapterTwo />
      <ChapterThree />
      <ChapterFour />
      <Details />
      <DressCode />
      <Programa />
      <MesaDeRegalos />
      <Rsvp />
    </div>
  )
}
