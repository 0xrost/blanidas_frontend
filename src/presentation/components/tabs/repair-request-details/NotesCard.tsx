import {Textarea} from "@/presentation/components/ui/textarea.tsx";
import { NotebookIcon } from "lucide-react";

type NoteCardProps = {
    title: string;
    notes: string;
    isReadonly: boolean;
    setNotes: (notes: string) => void;
}
const NotesCard = ({ title, setNotes, notes, isReadonly }: NoteCardProps) => {
    return (
        <div className="flex flex-col bg-white border-b">
            <p className="border-b px-4 py-3 text-slate-900">{title}</p>
            {isReadonly ? (
                <>
                    {notes.trim() === "" ? (
                        <div className="py-8 text-center bg-slate-50">
                            <NotebookIcon className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                            <p className="text-slate-500">Коментаря інженера не додано</p>
                        </div>
                    ) : (
                        <div className="mx-4 my-3 text-sm border p-3 rounded-md border-slate-200 w-auto min-h-32 resize-none">
                            {notes}
                        </div>
                    )}
                </>
            ) : (
                <Textarea
                    value={notes ?? ""}
                    disabled={isReadonly}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Опишіть виконані роботи, виявлені проблеми, рекомендації..."
                    className="mx-4 my-3 border-slate-200 w-auto h-auto min-h-32 resize-none" 
                />
            )}
        </div>
    );
};

export default NotesCard;