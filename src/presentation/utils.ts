import type {MutationOptions} from "@/presentation/models.ts";


function formatDuration(startDate: Date | string, endDate: Date | string): string {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    if (isNaN(start) || isNaN(end)) {
        throw new Error("Invalid date(s) provided");
    }

    const diffMs = end - start;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

    return `${diffDays} днів ${diffHours} год ${diffMinutes} хв`;
}

function pluralize(count: number, one: string, few: string, many: string): string {
    if (count === 1) return one;
    if (count >= 2 && count <= 4) return few;
    return many;
}

function composeMutationOptions<T>(...options: (MutationOptions<T> | undefined)[]): MutationOptions<T> {
    return {
        onSuccess: (data: T) => {
            options.forEach(option => {
                if (option?.onSuccess) option.onSuccess(data);
            });
        },
        onError: (error) => {
            options.forEach(option => {
                if (option?.onError) option.onError(error);
            });
        }
    };
}

export { formatDuration, pluralize, composeMutationOptions };