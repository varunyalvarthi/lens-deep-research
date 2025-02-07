import { createManualToolStreamResponse } from '@/lib/streaming/create-manual-tool-stream'
import { cookies } from 'next/headers'

export const maxDuration = 30

const DEFAULT_MODEL = 'google:gemini-2.0-flash'
const DEFAULT_DEEP_RESEARCH_MODEL = 'google:gemini-2.0-flash'

export async function POST(req: Request) {
  try {
    const { messages, id: chatId } = await req.json()
    const referer = req.headers.get('referer')
    const isSharePage = referer?.includes('/share/')

    if (isSharePage) {
      return new Response('Chat API is not available on share pages', {
        status: 403,
        statusText: 'Forbidden'
      })
    }

    const cookieStore = await cookies()
    const searchModeCookie = cookieStore.get('deep-research-mode')?.value

    const isDeepResearch = searchModeCookie === 'true'
    const model = isDeepResearch ? DEFAULT_DEEP_RESEARCH_MODEL : DEFAULT_MODEL

    const searchEnabled = true

    return createManualToolStreamResponse({
      messages,
      model,
      chatId,
      searchMode: searchEnabled,
      isDeepResearch
    })
  } catch (error) {
    console.error('API route error:', error)
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        status: 500
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}