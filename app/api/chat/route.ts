import { createManualToolStreamResponse } from '@/lib/streaming/create-manual-tool-stream'
import { createToolCallingStreamResponse } from '@/lib/streaming/create-tool-calling-stream'
import { isToolCallSupported } from '@/lib/utils/registry'
import { cookies } from 'next/headers'

export const maxDuration = 30

const DEFAULT_MODEL = 'groq:llama3-70b-8192'
const DEFAULT_DEEP_RESEARCH_MODEL = 'groq:deepseek-r1-distill-llama-70b'
const SEARCH_MODE_COOKIE = 'search-mode'

type SearchMode = 'search' | 'deepresearch'

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
    const searchModeCookie = cookieStore.get(SEARCH_MODE_COOKIE)?.value as SearchMode

    const isDeepResearch = searchModeCookie === 'deepresearch'
    const model = isDeepResearch ? DEFAULT_DEEP_RESEARCH_MODEL : DEFAULT_MODEL

    const supportsToolCalling = isToolCallSupported(model)

    const searchEnabled = isDeepResearch ? true : (searchModeCookie === 'search')

    return supportsToolCalling
      ? createToolCallingStreamResponse({
        messages,
        model,
        chatId,
        searchMode: searchEnabled,
        isDeepResearch
      })
      : createManualToolStreamResponse({
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