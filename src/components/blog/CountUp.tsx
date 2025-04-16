"use client"

import { useEffect, useState, useRef } from "react"

interface CountUpProps {
    end: number
    duration?: number
    delay?: number
}

export default function CountUp({ end, duration = 2000, delay = 0 }: CountUpProps) {
    const [count, setCount] = useState(0)
    const countRef = useRef<number>(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const startTime = Date.now()
        const startValue = 0
        const endValue = end

        // Clear any existing timer
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }

        // Delay the start if needed
        const delayTimeout = setTimeout(() => {
            // Start the animation
            timerRef.current = setInterval(() => {
                const now = Date.now()
                const elapsedTime = now - startTime

                if (elapsedTime >= duration) {
                    setCount(endValue)
                    if (timerRef.current) {
                        clearInterval(timerRef.current)
                    }
                    return
                }

                // Calculate the current count based on elapsed time
                const progress = elapsedTime / duration
                countRef.current = Math.floor(startValue + progress * (endValue - startValue))
                setCount(countRef.current)
            }, 16) // ~60fps
        }, delay)

        return () => {
            clearTimeout(delayTimeout)
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [end, duration, delay])

    return <>{count}</>
}

