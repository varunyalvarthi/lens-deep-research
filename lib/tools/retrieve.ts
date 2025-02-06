import { retrieveSchema } from '@/lib/schema/retrieve'
import { SearchResults as SearchResultsType } from '@/lib/types'
import { tool } from 'ai'

const CONTENT_CHARACTER_LIMIT = 10000

async function fetchTavilyExtractData(
  url: string
): Promise<SearchResultsType | null> {
  try {
    const apiKey = process.env.TAVILY_API_KEY
    const response = await fetch('https://api.tavily.com/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ api_key: apiKey, urls: [url] })
    })
    const json = await response.json()
    if (!json.results || json.results.length === 0) {
      return null
    }

    const result = json.results[0]
    const content = result.raw_content.slice(0, CONTENT_CHARACTER_LIMIT)

    return {
      results: [
        {
          title: content.slice(0, 100),
          content,
          url: result.url
        }
      ],
      query: '',
      images: []
    }
  } catch (error) {
    console.error('Tavily Extract API error:', error)
    return null
  }
}

export const retrieveTool = tool({
  description: 'Retrieve content from the web',
  parameters: retrieveSchema,
  execute: async ({ url }) => {
    let results: SearchResultsType | null

    results = await fetchTavilyExtractData(url)

    if (!results) {
      return null
    }

    return results
  }
})
