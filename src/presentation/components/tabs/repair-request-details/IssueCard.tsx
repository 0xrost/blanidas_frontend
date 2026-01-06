import {FileText} from "lucide-react";
import {Card} from "@/presentation/components/ui/card.tsx";

interface Props { issue: string; }
const IssueCard = ({ issue }: Props) => {
    return (
        <Card className="bg-white border-slate-200">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <h3 className="text-slate-900">Опис проблеми</h3>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-slate-900 whitespace-pre-wrap wrap-break-word">{issue}</p>
                </div>
            </div>
        </Card>
    );
};

export default IssueCard;