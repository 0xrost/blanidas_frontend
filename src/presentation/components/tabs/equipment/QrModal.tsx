import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/presentation/components/ui/dialog.tsx";
import {Label} from "@/presentation/components/ui/label.tsx";
import {Download} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {QRCodeCanvas, QRCodeSVG} from "qrcode.react";
import {Slider} from "@/presentation/components/ui/slider.tsx";
import {useEffect, useRef, useState} from "react";
import JSZip from "jszip";

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

const initialSize = 256;
const initialError = "M";
const initialBgColor = "#FFFFFF";
const initialFgColor = "#000000";

interface DataToShow {
    institutionName: string;
    serialNumber: string;
    url: string;
}

interface Props {
    dataToShow: DataToShow[];
    close: () => void;
}
const QrModal = ({ close, dataToShow }: Props) => {
    const [level, setLevel] = useState<ErrorCorrectionLevel>(initialError);
    const [size, setSize] = useState<number>(initialSize);
    const [bgColor, setBgColor] = useState<string>(initialBgColor);
    const [fgColor, setFgColor] = useState<string>(initialFgColor)
    const [margin, setMargin] = useState<boolean>(true);

    const [currentData, setCurrentData] = useState<DataToShow | null>();

    useEffect(() => {
        if (!dataToShow) { return; }
        setCurrentData(dataToShow[0]);
    }, [dataToShow]);

    const isMulti = dataToShow.length > 1;

    const onClose = () => {
        setLevel(initialError);
        setSize(initialSize);
        setBgColor(initialBgColor);
        setFgColor(initialFgColor);
        close();
    };

    const waitNextFrame = () =>
        new Promise<void>(resolve =>
            requestAnimationFrame(() => resolve())
        );

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const getQrCodeFileName = (data: DataToShow): string => {
        return `${data.serialNumber}-${data.institutionName}.png`;
    }

    const downloadSvg = async () => {
        let url: string;

        if (isMulti) {
            const zip = new JSZip();
            const startValue = currentData;
            for (let i = 0; i < dataToShow.length; i++) {
                const current = dataToShow[i];
                setCurrentData(current);
                await waitNextFrame();

                const canvas = canvasRef.current;
                if (!canvas) continue;

                const dataUrl = canvas.toDataURL("image/png");
                const base64 = dataUrl.split(",")[1];

                zip.file(getQrCodeFileName(current), base64, { base64: true });
            }

            setCurrentData(startValue);
            const blob = await zip.generateAsync({ type: "blob" });
            url = URL.createObjectURL(blob);
        } else {
            const canvas = canvasRef.current;
            if (!canvas) return;
            url = canvas.toDataURL("image/png");
        }

        const a = document.createElement("a");
        a.href = url;
        a.download = isMulti ? "qrcodes.zip" : getQrCodeFileName(dataToShow[0]);
        a.click();
        URL.revokeObjectURL(url);
    };


    if (dataToShow.length === 0) return;

    return (
        <Dialog open={true} onOpenChange={open => !open && onClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>QR-код обладнання</DialogTitle>
                    <DialogDescription>
                        Ви можете завантажити його або змінити параметри.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 overflow-auto">
                    <div className="flex justify-center overflow-auto max-h-[60vh]">
                        <div className="w-full max-w-90 aspect-square">
                            <QRCodeSVG
                                className="w-full h-full border border-gray-400"
                                value={currentData?.url ?? ""}
                                size={size}
                                fgColor={fgColor}
                                bgColor={bgColor}
                                level={level}
                                marginSize={margin ? 4 : 0}
                            />
                            <QRCodeCanvas
                                ref={canvasRef}
                                className="hidden w-full h-full border border-gray-400"
                                value={currentData?.url ?? ""}
                                size={size}
                                fgColor={fgColor}
                                bgColor={bgColor}
                                level={level}
                                marginSize={margin ? 4 : 0}
                            />
                        </div>
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

                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label>Колір переднього плану</Label>
                            <Input
                                type="color"
                                value={fgColor}
                                className="w-full"
                                onChange={(e) => setFgColor(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label>Колір заднього плану</Label>
                            <Input
                                type="color"
                                value={bgColor}
                                className="w-full"
                                onChange={(e) => setBgColor(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 col-span-2 sm:col-span-1">
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
                        <div className="space-y-2 col-span-2 sm:col-span-1">
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
                        Завантажити {isMulti && "усі"} QR-код{isMulti && "и"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QrModal;
export type { DataToShow };