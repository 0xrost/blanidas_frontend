import {Textarea} from "@/presentation/components/ui/textarea.tsx";
import {Card} from "@/presentation/components/ui/card.tsx";

type NoteCardProps = {
    title: string;
    notes: string;
    isReadonly: boolean;
    setNotes: (notes: string) => void;
}
const NotesCard = ({ title, setNotes, notes, isReadonly }: NoteCardProps) => {
    return (
        <Card className="py-0 bg-white border-slate-200">
            <div className="p-6">
                <h3 className="text-slate-900 mb-4">{title}</h3>
                {isReadonly
                    ?
                        <div className="border-slate-200 border rounded-md resize-none p-2 overflow-auto min-h-16 w-full bg-transparent px-3 py-2 text-base shadow-xs md:text-sm">
                            {notes}
                        </div>
                    :
                        <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Опишіть виконані роботи, виявлені проблеми, рекомендації..."
                            className="border-slate-200 min-h-32 resize-none"
                        />
                }
            </div>
        </Card>
    );
};

export default NotesCard;