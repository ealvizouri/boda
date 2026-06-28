import cn from '@/lib/cn'
import Image from 'next/image'

interface ChapterIllustrationProps {
  papel: string
  animation: string | null
  animationClassName?: string
}

export default function ChapterIllustration({
  papel,
  animation,
  animationClassName,
}: ChapterIllustrationProps) {
  return (
    <div className="relative w-full">
      <Image
        src={papel}
        alt=""
        width={340}
        height={260}
        className="h-auto w-full"
        unoptimized
      />
      {animation && (
        <div
          className={cn(
            'absolute top-1/2 left-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2',
            animationClassName,
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={animation} alt="" className="h-full w-auto" />
        </div>
      )}
    </div>
  )
}
