import {type LucideIcon} from "lucide-react";

interface Props {
    icon?: LucideIcon;
    title: string;
}
const EmptyTable = ({ icon: Icon, title }: Props) => {
    return (
        <div className="text-center py-12">
            {Icon && (<Icon className="w-16 h-16 text-slate-300 mx-auto mb-4" />)}
            <p className="text-slate-600">{title}</p>
        </div>
    );
};

export default EmptyTable;