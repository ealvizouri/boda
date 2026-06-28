import cn from '@/lib/cn'

export default function RsvpTitle({
  title = 'CONFIRMACIÓN',
  className,
}: {
  title?: string
  className?: string
}) {
  return (
    <h2
      className={cn(
        'mb-10 font-cormorant text-3xl tracking-[0.5em] text-white',
        className,
      )}
    >
      {title}
    </h2>
  )
}
