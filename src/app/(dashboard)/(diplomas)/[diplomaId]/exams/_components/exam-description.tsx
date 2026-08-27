"use client"

import { useRef, useState, useEffect } from "react"

interface ExamDescriptionProps {
    description: string
}

export default function ExamDescription({ description }: ExamDescriptionProps) {
    // Whether the user has expanded the full text
    const [expanded, setExpanded] = useState(false)
    // Whether the text is actually being visually truncated (overflowing)
    const [isClamped, setIsClamped] = useState(false)
    // Reference to the <span> wrapping the text, used to measure its height
    const textRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const el = textRef.current
        if (!el) return

        // Check if the text is overflowing
        const checkClamp = () => {
            setIsClamped(el.scrollHeight - el.clientHeight > 1)
        }

        checkClamp()

        // Recheck after fonts are loaded
        document.fonts?.ready.then(checkClamp)

        // Recheck when the element size changes
        const resizeObserver = new ResizeObserver(checkClamp)
        resizeObserver.observe(el)

        // Clean up the observer
        return () => resizeObserver.disconnect()
    }, [description])

    return (
        <p className="mt-1.5 text-sm text-gray-500">
            <span ref={textRef} className={expanded ? "" : "line-clamp-2"}>
                {description}
            </span>

            {/* Show the button only if the text is truncated or expanded */}
            {(isClamped || expanded) && (
                <button
                    type="button"
                    onClick={() => { setExpanded((prev) => !prev) }}
                    className="ml-1 cursor-pointer font-medium text-blue-600 hover:underline"
                >
                    {expanded ? "See Less" : "See More"}
                </button>
            )}
        </p>
    )
}