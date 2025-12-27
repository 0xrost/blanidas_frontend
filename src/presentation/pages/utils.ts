const limitTextLength = (text: string, maxLength: number): string => {
    if (text.length < maxLength) return text;
    return text.substring(0, maxLength) + "...";
}

export function formatDuration(startDate: Date | string, endDate: Date | string): string {
    console.log(startDate, endDate);
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    console.log(start, end);

    if (isNaN(start) || isNaN(end)) {
        throw new Error("Invalid date(s) provided");
    }

    const diffMs = end - start;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

    return `${diffDays} днів ${diffHours} год ${diffMinutes} хв`;
}


export { limitTextLength };