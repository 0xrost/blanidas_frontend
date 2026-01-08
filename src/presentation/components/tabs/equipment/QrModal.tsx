import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/presentation/components/ui/dialog.tsx";
import type {Equipment} from "@/domain/entities/equipment.ts";
import {Label} from "@/presentation/components/ui/label.tsx";
import {Download} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {QRCodeSVG} from "qrcode.react";
import {Slider} from "@/presentation/components/ui/slider.tsx";
import {useRef, useState} from "react";

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

const initialSize = 256;
const initialError = "M";
const initialBgColor = "#FFFFFF";
const initialFgColor = "#000000";

interface Props {
    equipment: Equipment | null;
    dataToShow: string;
    close: () => void;
}
const QrModal = ({ equipment, close, dataToShow }: Props) => {
    const [level, setLevel] = useState<ErrorCorrectionLevel>(initialError);
    const [size, setSize] = useState<number>(initialSize);
    const [bgColor, setBgColor] = useState<string>(initialBgColor);
    const [fgColor, setFgColor] = useState<string>(initialFgColor)
    const [margin, setMargin] = useState<boolean>(true);

    const onClose = () => {
        setLevel(initialError);
        setSize(initialSize);
        setBgColor(initialBgColor);
        setFgColor(initialFgColor);
        close();
    };

    const svgRef = useRef<SVGSVGElement>(null);
    const downloadSvg = () => {
        const svg = svgRef.current;
        if (!svg) return;

        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svg);

        const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.svg";
        a.click();

        URL.revokeObjectURL(url);
    };

    if (equipment === null) return;

    return (
        <Dialog open={true} onOpenChange={open => !open && onClose()}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>QR-код обладнання</DialogTitle>
                    <DialogDescription>
                        Ось QR-код обладнання <strong>{equipment.model.name}</strong>. Ви можете завантажити його або змінити параметри.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 overflow-auto">
                    <div className="flex max-w-full max-h-[60vh] items-center justify-center overflow-hidden">
                        <QRCodeSVG
                            ref={svgRef}
                            className="border border-gray-400"
                            value={dataToShow}
                            size={size}
                            fgColor={fgColor}
                            bgColor={bgColor}
                            level={level}
                            marginSize={margin ? 4 : 0}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                            <Label>Розмір QR-коду</Label>
                            <Slider
                                value={[size]}
                                onValueChange={(value) => setSize(value[0])}
                                max={512}
                                min={64}
                                step={16}
                            />
                            <div className="text-sm text-slate-500 text-center">
                                {size}px
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Рівень помилок</Label>
                            <Select value={level} onValueChange={(value: ErrorCorrectionLevel) => setLevel(value)}>
                                <SelectTrigger className="h-12 w-full bg-white border-slate-300 hover:border-cyan-400 transition-colors">
                                    <SelectValue placeholder="Рівень помилок" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="L">L - Низький (7%)</SelectItem>
                                    <SelectItem value="M">M - Середній (15%)</SelectItem>
                                    <SelectItem value="Q">Q - Високий (25%)</SelectItem>
                                    <SelectItem value="H">H - Максимальний (30%)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Колір переднього плану</Label>
                            <Input
                                type="color"
                                value={fgColor}
                                className="w-full"
                                onChange={(e) => setFgColor(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Включити поле для маржі</Label>
                            <Select value={margin ? "true" : "false"} onValueChange={(value) => setMargin(value === "true")}>
                                <SelectTrigger className="h-12 w-full bg-white border-slate-300 hover:border-cyan-400 transition-colors">
                                    <SelectValue placeholder="Включити поле для маржі" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Так</SelectItem>
                                    <SelectItem value="false">Ні</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Колір заднього плану</Label>
                            <Input
                                type="color"
                                value={bgColor}
                                className="w-full"
                                onChange={(e) => setBgColor(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={downloadSvg}
                        className="flex-1 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:text-white hover:to-blue-700 text-white"
                    >
                        <Download className="w-4 h-4 mr-1.5" />
                        Завантажити QR-код
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QrModal;