import type { Status } from "@/domain/entities/repair-request";

const statusLabel: Record<Status, string> = {
    finished: 'Виконано',
    in_progress: 'В роботі',
    waiting_engineer: 'Очікує інженера',
    not_taken: 'Нова',
    waiting_spare_parts: 'Очікує запчастин',
};

interface Props { status: Status }
const RepairRequestStatusLabel = ({ status }: Props) => {
    return statusLabel[status];
};

export default RepairRequestStatusLabel;