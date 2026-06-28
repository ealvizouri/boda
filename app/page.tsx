export const dynamic = 'force-dynamic'

import ChapterFour from '@/components/ChapterFour'
import ChapterOne from '@/components/ChapterOne'
import ChapterThree from '@/components/ChapterThree'
import ChapterTwo from '@/components/ChapterTwo'
import Countdown from '@/components/Countdown'
import Details from '@/components/Details'
import DressCode from '@/components/DressCode'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'
import Programa from '@/components/Programa'
import RsvpForm from '@/components/RsvpForm'

export default function Page() {
  return (
    <div>
      <Hero />
      <Countdown />
      <OurStory />
      <ChapterOne />
      <ChapterTwo />
      <ChapterThree />
      <ChapterFour />
      <Details />
      <DressCode />
      <Programa />
      <RsvpForm />
    </div>
  )
}
