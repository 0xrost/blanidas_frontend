import {Card} from "@/presentation/components/ui/card.tsx";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/presentation/components/ui/card.tsx";
import {Database} from "lucide-react";
import EmptyTable from "@/presentation/components/layouts/EmptyTable.tsx";

interface Props {
    children: React.ReactNode;
    title: string;
    showEmpty: boolean;
    subtitle: string;
}
const ChartCard = ({ children, subtitle, showEmpty, title }: Props) => {
    return (
        <Card className="py-6">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                {showEmpty ? (
                    <EmptyTable title="Наразі немає даних для відображення статистики. " icon={Database} />
                ) : (
                    <>{children}</>
                )}
            </CardContent>
        </Card>
    );
};

export default ChartCard;