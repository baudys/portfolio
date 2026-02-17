'use client'

import { useEffect, useMemo, useState } from 'react'

interface LiveClockProps {
  locale?: string
  timeZone: string
}

const PLACEHOLDER_TIME = '--:--:--'

export const LiveClock = ({ locale = 'en-GB', timeZone }: LiveClockProps) => {
  const [currentTime, setCurrentTime] = useState(PLACEHOLDER_TIME)

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone,
      }),
    [locale, timeZone],
  )

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(formatter.format(new Date()))
    }

    updateTime()
    const intervalId = window.setInterval(updateTime, 1000)

    return () => window.clearInterval(intervalId)
  }, [formatter])

  return <time suppressHydrationWarning>{currentTime}</time>
}
