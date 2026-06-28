import cn from '@/lib/cn'
import Image from 'next/image'
import { ReactNode } from 'react'

interface StoryChapterProps {
  background: string
  flip?: boolean
  className?: string
  children: ReactNode
}

export default function StoryChapter({
  background,
  flip = false,
  className,
  children,
}: StoryChapterProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10',
        className,
      )}
    >
      <Image src={background} alt="" fill className="object-cover" />

      <div
        className={`relative z-10 mx-auto flex w-full max-w-sm flex-col items-center md:max-w-4xl md:gap-14 ${flip ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      >
        {children}
      </div>
    </section>
  )
}
