import {useEffect, useState} from "react";

function useTimedError<T>(initialValue: T, delay: number) {
    const [error, setError] = useState<T>(initialValue);
    useEffect(() => {
        if (error === initialValue) return;
        const timeoutId = setTimeout(() => setError(initialValue), delay);
        return () => clearTimeout(timeoutId);
    }, [error, initialValue, delay]);
    return [error, setError] as const;
}

export { useTimedError };
