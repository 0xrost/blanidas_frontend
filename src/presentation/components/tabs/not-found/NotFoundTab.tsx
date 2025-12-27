import {ArrowLeft, FileQuestion} from "lucide-react";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";

type NotFoundTabProps = { redirectTo: string };
const NotFoundTab = ({ redirectTo }: NotFoundTabProps) => {
    return (
        <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white border border-gray-200 mb-6">
                        <FileQuestion className="w-16 h-16 text-gray-300" />
                    </div>
                    <p className="text-gray-600 text-2xl mb-3">
                        Сторінку не знайдено
                    </p>
                    <p className="text-gray-400 text-lg">
                        На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
                        Перевірте правильність введеної адреси або поверніться на головну сторінку.
                    </p>
                </div>

                <Link to={redirectTo}>
                    <Button className="h-11 px-6 bg-cyan-500 hover:bg-cyan-600 text-white">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Повернутись назад
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundTab;