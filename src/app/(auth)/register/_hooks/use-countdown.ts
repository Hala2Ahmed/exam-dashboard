"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Returns the remaining countdown time in seconds
function getRemainingSeconds(storageKey: string): number {
    if (typeof window === "undefined") return 0;

    const storedEndTime = localStorage.getItem(storageKey);
    if (!storedEndTime) return 0;

    const endTime = parseInt(storedEndTime, 10);
    const remaining = Math.round((endTime - Date.now()) / 1000);

    if (remaining <= 0) {
        localStorage.removeItem(storageKey);
        return 0;
    }

    return remaining;
}

export function useCountdown(storageKey: string) {
    // Initialize the countdown from localStorage.
    const [seconds, setSeconds] = useState(() => getRemainingSeconds(storageKey));
    const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    const tick = useCallback(() => {
        // Updates the countdown state from localStorage.
        setSeconds(getRemainingSeconds(storageKey));
    }, [storageKey]);

    useEffect(() => {
        if (seconds <= 0) return;

        intervalRef.current = setInterval(tick, 1000);
        return () => clearInterval(intervalRef.current);
        // Recreate the interval only when the countdown starts or stops.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds > 0]);

    // Cross-tab sync: reflect changes made in other tabs.
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === storageKey) tick();
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [storageKey, tick]);

    const start = useCallback(
        (durationSeconds: number) => {
            const endTime = Date.now() + durationSeconds * 1000;
            localStorage.setItem(storageKey, endTime.toString());
            setSeconds(durationSeconds);
        },
        [storageKey],
    );

    return { seconds, isActive: seconds > 0, start };
}