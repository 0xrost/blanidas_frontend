import {Button} from "@/presentation/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/presentation/components/ui/dialog.tsx";

interface Props {
    delete_: () => void;
    close: () => void;
    isOpen: boolean;
}
const DeleteModal = ({ isOpen, delete_, close }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={open => !open && close()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto [&>button]:hidden">
                <DialogHeader>
                    <DialogTitle className="text-md font-normal text-center">Ви впевнені, що хочете видалити заявку?</DialogTitle>
                </DialogHeader>
                <DialogFooter className="flex flex-row items-start sm:justify-between gap-2">
                    <Button variant="outline" onClick={close} className="flex-1">
                        Скасувати
                    </Button>
                    <Button
                        variant="outline"
                        onClick={delete_}
                        className="flex-1 border-red-400 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        <Trash className="w-5 h-5" />
                        Видалити заявку
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteModal;