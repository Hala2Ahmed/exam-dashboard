"use client"

import { useEffect, useRef, useState } from "react"

interface ExamTimerProps {
    durationMinutes: number
    examId: string
    onTimeUp: () => void
}

const RADIUS = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function ExamTimer({ durationMinutes, examId, onTimeUp }: ExamTimerProps) {
    // Unique storage key per exam, so timers don't clash between different exams
    const storageKey = `exam-timer-${examId}`
    const totalSeconds = durationMinutes * 60

    const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
    const endTimeRef = useRef<number | null>(null)

    useEffect(() => {
        // If a timer was already running (saved in localStorage), resume it;
        // otherwise start a new one from now
        const stored = localStorage.getItem(storageKey)
        const resolvedEndTime = stored
            ? Number(stored)
            : Date.now() + totalSeconds * 1000

        if (!stored) {
            localStorage.setItem(storageKey, String(resolvedEndTime))
        }

        endTimeRef.current = resolvedEndTime

        // Recalculate time left based on the real end time (not just decrementing a counter)
        const tick = () => {
            const remaining = Math.max(0, Math.round((endTimeRef.current! - Date.now()) / 1000))
            setSecondsLeft(remaining)

            if (remaining <= 0) {
                localStorage.removeItem(storageKey)
                onTimeUp()
            }
        }

        // Run once immediately, then every second
        const initialTimeout = setTimeout(tick, 0)
        const interval = setInterval(tick, 1000)

        // Cleanup on unmount
        return () => {
            clearTimeout(initialTimeout)
            clearInterval(interval)
        }
    }, [storageKey, totalSeconds, onTimeUp])

    const percentage = (secondsLeft / totalSeconds) * 100
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60
    const isLow = secondsLeft <= 60 // turn red when under a minute left
    const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE

    return (
        <div
            role="timer"
            aria-label={`${minutes} minutes and ${seconds} seconds remaining`}
            className="relative flex size-14 shrink-0 items-center justify-center"
        >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
                {/* Background track circle */}
                <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="#DBEAFE" strokeWidth="6" />
                {/* Foreground circle that shrinks as time runs out */}
                <circle
                    cx="24"
                    cy="24"
                    r={RADIUS}
                    fill="none"
                    stroke={isLow ? "#EF4444" : "#2563EB"}
                    strokeWidth="6"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                    className="transition-[stroke-dashoffset] duration-1000 ease-linear"
                />
            </svg>

            <span className={`relative text-xs ${isLow ? "text-red-500" : "text-black"}`}>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
        </div>
    )
}