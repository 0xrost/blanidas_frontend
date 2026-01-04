import {Button} from "@/presentation/components/ui/button.tsx";
import {Check, Edit, Trash2, X} from "lucide-react";
import {useState} from "react";

interface Props {
    edit: () => void;
    delete_: () => void;
}
const EditDeleteActions = ({ edit, delete_ }: Props) => {
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    return (
        <div className="flex justify-end gap-2">
            <Button
                size="sm"
                variant="outline"
                onClick={() => {
                    if (showConfirmation) setShowConfirmation(false);
                    else edit();
                }}
                className="border-blue-300 text-blue-700 hover:bg-blue-50 h-8 w-8 p-0"
            >
                {showConfirmation ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            </Button>
            <Button
                size="sm"
                variant="outline"
                onClick={() => {
                    if (showConfirmation) {
                        delete_();
                        setShowConfirmation(false);
                    }
                    else setShowConfirmation(true);
                }}
                className="border-red-300 text-red-700 hover:bg-red-50 h-8 w-8 p-0"
            >
                {showConfirmation ? <Check className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
            </Button>
        </div>
    );
};

export default EditDeleteActions;