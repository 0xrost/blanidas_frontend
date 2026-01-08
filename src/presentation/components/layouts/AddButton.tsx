import {Plus} from "lucide-react";
import {Button} from "@/presentation/components/ui/button.tsx";

interface Props {
    onClick: () => void;
    title: string;
}
const AddButton = ({onClick, title}: Props) => {
    return (
        <Button
            onClick={onClick}
            className="h-12 min-w-12 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200">
            <Plus className="w-8 h-8" />
            <span className="hidden sm:inline">{title}</span>
        </Button>
    );
};

export default AddButton;