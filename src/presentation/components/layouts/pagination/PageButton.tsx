import {Button} from "@/presentation/components/ui/button.tsx";
import type {ReactNode} from "react";

interface Props {
    disabled?: boolean;
    selected?: boolean;
    onClick?: () => void;
    children: ReactNode;
}
const PageButton = ({ disabled, children, onClick, selected }: Props) => {
    const styles = selected
        ? "bg-cyan-500 text-white border-cyan-500 hover:bg-cyan-600"
        : "text-slate-600 border-slate-300 hover:bg-slate-50";

    return (
        <Button
            size="sm"
            variant="outline"
            disabled={disabled}
            className={styles}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export { PageButton };