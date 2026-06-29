'use client'

import { notification } from 'antd'
import { ReactNode, useCallback } from 'react'

export function useClipboard() {
  const copyToClipboard = useCallback(
    async (text: string, title: string | ReactNode = 'Copiado!') => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text)
        } else {
          const el = document.createElement('textarea')
          el.value = text
          el.style.cssText = 'position:fixed;opacity:0'
          document.body.appendChild(el)
          el.select()
          document.execCommand('copy')
          document.body.removeChild(el)
        }
        notification.success({ title })
      } catch (e) {
        console.error(e)
      }
    },
    [],
  )

  return copyToClipboard
}
