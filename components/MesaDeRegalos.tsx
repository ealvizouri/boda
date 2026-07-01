'use client'

import { useClipboard } from '@/hooks/useClipboard'
import { BG_CREMA } from '@/lib/images'
import { Copy } from 'lucide-react'
import Image from 'next/image'

const PAYMENT_URL = 'https://link.mercadopago.com.mx/bodajackieymariano'

const TRANSFER_DETAILS = [
  { label: 'Beneficiario', value: 'Jacqueline Ruiz Perez' },
  { label: 'CLABE', value: '6381 8001 0115 1344 73' },
  { label: 'Banco', value: 'NU México' },
]

const STORE_CODE = '5195 3726 7822 2125'

const STORES = [
  'OXXO',
  'Soriana',
  'Kiosko',
  'Chedraui',
  'Farmacias del Ahorro',
  "Waldo's",
]

function CopyRow({ label, value }: { label: string; value: string }) {
  const copyToClipboard = useClipboard()

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-quattro text-sm text-[#a9788a]">{label}</span>
      <button
        onClick={() =>
          copyToClipboard(
            value,
            <span>
              Copiaste <span className="font-bold">{label}</span>
            </span>,
          )
        }
        className="group flex items-center gap-2 font-quattro text-sm font-semibold text-[#4f2d35] transition-opacity hover:opacity-70"
      >
        {value}
        <Copy
          size={14}
          className="shrink-0 cursor-pointer text-[#4f2d35]/50 group-hover:text-[#4f2d35]"
        />
      </button>
    </div>
  )
}

export default function MesaDeRegalos() {
  return (
    <section
      id="mesa-de-regalos"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      <Image src={BG_CREMA} alt="" fill className="object-cover" />

      <div className="relative z-10 mx-auto flex w-full max-w-[320px] flex-col items-center md:max-w-md">
        <h2 className="mb-8 text-center font-cormorant text-4xl tracking-[0.3em] text-[#4f2d35]">
          MESA DE
          <br />
          REGALOS
        </h2>

        <p className="mb-5 text-center font-quattro text-sm leading-relaxed text-[#4f2d35]">
          El mejor regalo es contar con tu presencia. Sin embargo, si deseas
          tener un detalle con nosotros, nuestra mayor ilusión es construir
          recuerdos juntos en nuestra luna de miel y proyectos futuros.
        </p>

        <p className="mb-8 text-center font-quattro text-sm leading-relaxed text-[#4f2d35]">
          Agradecemos de corazón tu gesto a través de aportación en efectivo o
          transferencia bancaria:
        </p>

        <h3 className="mb-4 text-center font-cormorant text-sm tracking-[0.3em] text-[#4f2d35]">
          TRANSFERENCIA
        </h3>

        <div className="mb-8 flex w-full flex-col gap-4 rounded-2xl bg-[#fdf8f2] p-6 shadow-lg">
          {TRANSFER_DETAILS.map(({ label, value }) => (
            <CopyRow key={label} label={label} value={value} />
          ))}
        </div>

        <h3 className="mb-4 text-center font-cormorant text-sm tracking-[0.3em] text-[#4f2d35]">
          PAGO EN TIENDAS
        </h3>

        <div className="mb-8 flex w-full flex-col gap-4 rounded-2xl bg-[#fdf8f2] p-6 shadow-lg">
          <CopyRow label="Código" value={STORE_CODE} />

          <div className="flex flex-wrap gap-x-5 gap-y-2 font-quattro text-sm text-[#a9788a]">
            {STORES.map((store) => (
              <span key={store}>{store}</span>
            ))}
          </div>
        </div>

        <h3 className="mb-6 text-center font-cormorant text-sm tracking-[0.3em] text-[#4f2d35]">
          O EN LÍNEA
        </h3>

        <a
          href={PAYMENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#670626] px-10 py-4 font-mono text-sm tracking-[0.15em] text-white transition-colors hover:bg-[#4f2d35]"
        >
          Pago con tarjeta
        </a>
      </div>
    </section>
  )
}
