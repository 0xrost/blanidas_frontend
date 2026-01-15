import {useMemo} from "react";
import {shuffleArray} from "@/presentation/utils.ts";

const colors = ['#3b82f6','#8b5cf6','#06b6d4','#10b981','#f59e0b','#64748b','#f50b69'];

const useRandomChartColor = (count: number) => {
    const shuffledColors = useMemo(() => shuffleArray(colors), []);
    return useMemo(() => {
        return Array.from({ length: count }, ((_, index) => shuffledColors[index % colors.length]))
    }, [count, shuffledColors]);
};

export { useRandomChartColor };