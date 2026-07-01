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
        'mb-10 font-cormorant text-3xl tracking-[0.25em] text-white md:tracking-[0.5em]',
        className,
      )}
    >
      {title}
    </h2>
  )
}
