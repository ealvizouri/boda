import cn from '@/lib/cn'

interface Props {
  hashtag: string
  className?: string
}

const DoubleChevronDown = ({ hashtag, className }: Props) => {
  return (
    <a
      href={`#${hashtag}`}
      className={cn(
        'absolute bottom-8 left-1/2 z-100 flex -translate-x-1/2 flex-col items-center text-white/60 transition-colors hover:text-white/90',
        className,
      )}
      aria-label="Continuar"
    >
      <svg
        width="22"
        height="13"
        viewBox="0 0 22 13"
        fill="none"
        className="animate-bounce"
      >
        <path
          d="M2 2l9 9 9-9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="22"
        height="13"
        viewBox="0 0 22 13"
        fill="none"
        className="-mt-1 animate-bounce [animation-delay:200ms]"
      >
        <path
          d="M2 2l9 9 9-9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}

export default DoubleChevronDown
