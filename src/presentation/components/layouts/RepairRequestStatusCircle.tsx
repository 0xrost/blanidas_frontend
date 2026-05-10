import type { Status } from "@/domain/entities/repair-request";

const statusColor: Record<Status, string> = {
    finished: 'bg-green-200 border-green-300',
    in_progress: 'bg-orange-200 border-orange-300',
    waiting_engineer: 'bg-blue-200 border-blue-300',
    not_taken: 'bg-red-200 border-red-300',
    waiting_spare_parts: 'bg-yellow-200 border-yellow-300',
};

type Size = 'sm' | 'md' | 'lg' | 'xl';
const sizeMap: Record<Size, string> = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
};

interface Props { size?: Size; status: Status }
const RepairRequestStatusCircle = ({ size = 'md', status }: Props) => {
    return (
        <span className={`rounded-full border ring-white ${sizeMap[size]} ${statusColor[status]}`} />
    );
};

export default RepairRequestStatusCircle;