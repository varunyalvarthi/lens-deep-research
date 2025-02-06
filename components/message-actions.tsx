'use client'

import { CHAT_ID } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Document, Page, View, pdf } from '@react-pdf/renderer'
import { useChat } from 'ai/react'
import { Copy, FileDown } from 'lucide-react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { toast } from 'sonner'
import { ChatShare } from './chat-share'
import { Button } from './ui/button'

interface MessageActionsProps {
  message: string
  chatId?: string
  enableShare?: boolean
  className?: string
}

export function MessageActions({
  message,
  chatId,
  enableShare,
  className
}: MessageActionsProps) {
  const { isLoading } = useChat({
    id: CHAT_ID
  })
  const [isExporting, setIsExporting] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(message)
    toast.success('Message copied to clipboard')
  }

  async function handleExportPDF() {
    try {
      setIsExporting(true)

      // Create PDF document
      const MyDocument = () => (
        <Document>
          <Page style={{ padding: 30 }}>
            <View>
              <ReactMarkdown>{message}</ReactMarkdown>
            </View>
          </Page>
        </Document>
      )

      // Generate PDF blob
      const blob = await pdf(<MyDocument />).toBlob()

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'message-export.pdf'

      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Cleanup
      URL.revokeObjectURL(url)
      toast.success('PDF exported successfully')
    } catch (error) {
      console.error('PDF export failed:', error)
      toast.error('Failed to export PDF')
    } finally {
      setIsExporting(false)
    }
  }

  if (isLoading) {
    return <div className="size-10" />
  }

  return (
    <div className={cn('flex items-center gap-0.5 self-end', className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="rounded-full"
      >
        <Copy size={14} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleExportPDF}
        className="rounded-full"
        disabled={isExporting}
      >
        <FileDown size={14} />
      </Button>
      {enableShare && chatId && <ChatShare chatId={chatId} />}
    </div>
  )
}