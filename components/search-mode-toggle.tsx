'use client'

import { cn } from '@/lib/utils'
import { getCookie, setCookie } from '@/lib/utils/cookies'
import { Telescope } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Toggle } from './ui/toggle'

export function SearchModeToggle() {
  const [isSearchMode, setIsSearchMode] = useState(true)

  useEffect(() => {
    const savedMode = getCookie('deep-research-mode')
    if (savedMode !== null) {
      setIsSearchMode(savedMode === 'true')
    }
  }, [])

  const handleSearchModeChange = (pressed: boolean) => {
    setIsSearchMode(pressed)
    setCookie('deep-research-mode', pressed.toString())
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

      <Toggle
        aria-label="Toggle search mode"
        pressed={isSearchMode}
        onPressedChange={handleSearchModeChange}
        variant="outline"
        className={cn(
          'gap-1 px-3 border border-input text-muted-foreground bg-background',
          'data-[state=on]:bg-accent-blue',
          'data-[state=on]:text-blue-400',
          'data-[state=on]:border-blue-400',
          'hover:bg-accent hover:text-accent-foreground rounded-full'
        )}
      >
        <Telescope className="size-4" />
        <span className="text-xs">Deep Research</span>
      </Toggle>
    </div>
  )
}