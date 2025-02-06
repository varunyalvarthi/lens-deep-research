'use client'

import { cn } from '@/lib/utils'
import { getCookie, setCookie } from '@/lib/utils/cookies'
import { Telescope } from 'lucide-react'
import { useEffect, useState } from 'react'

const MODES = {
  SEARCH: 'search',
  DEEP_RESEARCH: 'deepresearch'
} as const

type SearchMode = typeof MODES[keyof typeof MODES]

export function SearchModeSelector() {
  const [mode, setMode] = useState<SearchMode>(MODES.SEARCH)

  useEffect(() => {
    const savedMode = getCookie('search-mode') as SearchMode
    if (savedMode && Object.values(MODES).includes(savedMode)) {
      setMode(savedMode)
    }
  }, [])

  const handleModeChange = (newMode: SearchMode) => {
    setMode(newMode)
    setCookie('search-mode', newMode)
  }

  return (
    <div className="flex bg-background border rounded-full gap-1">
      {/* <button
        onClick={() => handleModeChange(MODES.SEARCH)}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors',
          'hover:bg-accent',
          mode === MODES.SEARCH ?
            'bg-blue text-blue-400 border border-blue-400' :
            'text-muted-foreground'
        )}
      >
        <Globe className="size-4" />
        <span>Search</span>
      </button> */}

      <button
        onClick={() => handleModeChange(MODES.DEEP_RESEARCH)}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors',
          'hover:bg-accent',
          mode === MODES.DEEP_RESEARCH ?
            'bg-blue text-purple-400 border border-purple-400' :
            'text-muted-foreground'
        )}
      >
        <Telescope className="size-4" />
        <span>Deep Research</span>
      </button>
    </div>
  )
}