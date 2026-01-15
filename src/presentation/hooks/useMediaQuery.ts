import { useEffect, useState } from "react"

const useMediaQuery = (query: string)=> {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        setMatches(media.matches)

        const listener = (e: MediaQueryListEvent) =>
            setMatches(e.matches)

        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
    }, [query])

    return matches
}

const useIsMobile = () => {
    return useMediaQuery("(max-width: 640px)");
}

export { useMediaQuery, useIsMobile };