import cn from '@/lib/cn'
import { SHADOW_BOTTOM } from '@/lib/images'
import Image from 'next/image'

interface ChapterIllustrationProps {
  animation: string
  animationClassName?: string
}

export default function ChapterIllustration({
  animation,
  animationClassName,
}: ChapterIllustrationProps) {
  return (
    <div className="relative mb-5 flex w-full justify-center">
      {/* Drop shadow beneath card */}
      <div className="absolute -bottom-21 z-10 h-21 w-full">
        <Image src={SHADOW_BOTTOM} alt="" fill className="object-fill" />
      </div>
      <div
        className={cn(
          'w-full overflow-hidden rounded-3xl bg-[#fbfaf3]',
          animationClassName,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={animation} alt="" className="w-full max-w-none" />
      </div>
    </div>
  )
}
