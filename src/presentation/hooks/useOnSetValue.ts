import type {PaginationSearch} from "@/presentation/models.ts";

const useOnSetValue = <T>(changeSearch: (fn: (prev: T & PaginationSearch) => T & PaginationSearch) => void) => {
    return <K extends keyof T>(key: K, value: T[K]) => {
        console.log(key !== "sortBy" && key !== "sortOrder"
            ? "1"
            : "2222")
        changeSearch(prev => ({
            ...prev,
            [key]: value,
            page:
                key !== "sortBy" && key !== "sortOrder"
                    ? "1"
                    : prev.page.toString(),
        }))
    }
}
export { useOnSetValue };