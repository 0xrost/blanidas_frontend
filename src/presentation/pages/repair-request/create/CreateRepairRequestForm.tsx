import {type ChangeEvent, useState} from "react";
import {Camera, Loader2, Upload, X} from "lucide-react";
import {Card} from "@/presentation/components/ui/card.tsx";
import {Textarea} from "@/presentation/components/ui/textarea.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Label} from "@/presentation/components/ui/label.tsx";
import {Select, SelectItem, SelectContent, SelectTrigger, SelectValue} from "@/presentation/components/ui/select.tsx";
import type {RepairRequestFormData} from "@/presentation/pages/repair-request/create/CreateRepairRequestPage.tsx";
import type {Urgency} from "@/domain/entities/repair-request.ts";
import Notification from "@/presentation/components/layouts/Notification.tsx";
import {useTimedError} from "@/presentation/hooks/useTimedError.ts";


const allowed_types = ["image/jpeg", "image/png", "image/webp"];
const errorMessages = {
    unsupportedType: "Можна завантажувати лише зображення (JPEG, PNG, WEBP).",
    issue: "Опис проблеми не може перевищувати 600 символів",
    photos: "Ви не можете додати більше ніж 6 фото",
}

type RepairRequestFormProps = {
    sendForm: (data: RepairRequestFormData) => void;
    isLoading: boolean;
    isSubmitting: boolean;
}
const CreateRepairRequestForm = ({ sendForm, isLoading, isSubmitting }: RepairRequestFormProps) => {
    const [formData, setFormData] = useState<RepairRequestFormData>({
        description: '',
        urgencyLevel: 'non_critical',
        photos: []
    });

    const [unsupportedTypeError, setUnsupportedTypeError] = useTimedError<boolean>(false, 5000);
    const showDescriptionTooLongMessage = formData.description.length > 600;
    const showPhotoLimitMessage = formData.photos.length > 6;

    const uploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                if (!allowed_types.includes(file.type)) {
                    setUnsupportedTypeError(true);
                    return;
                }

                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData(prev => ({
                        ...prev,
                        photos: [...prev.photos, reader.result as string]
                    }))
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removePhoto = (index: number) => {
        setFormData(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index)
        }))
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendForm(formData);
    }

    return (
        <Card className="py-6 bg-white border-slate-200 shadow-sm">
            <form onSubmit={onSubmit} className="px-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="ml-2" htmlFor="issue">Опишіть проблему *</Label>
                        <Textarea
                            id="issue"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Наприклад: екран показує помилку, пристрій не включається, потрібне калібрування..."
                            className="min-h-36 resize-none bg-slate-100"
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <Label className="ml-2">Фото проблеми (необов'язково)</Label>
                        <div className="flex flex-col gap-3">
                            <label className="cursor-pointer">
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 hover:border-cyan-400 hover:bg-cyan-50/50 transition-all duration-200 flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                                        <Camera className="w-6 h-6 text-cyan-600" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-slate-900">Додати фото</p>
                                        <p className="text-sm text-slate-500">Натисніть для вибору файлу</p>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={uploadPhoto}
                                    className="hidden"
                                />
                            </label>

                            {formData.photos.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {formData.photos.map((photo, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={photo}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border border-slate-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(index)}
                                                className="absolute top-2 right-2 bg-red-700 text-white p-1.5 rounded-md opacity-90"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2 mb-0">
                        <Label className="ml-2" htmlFor="urgency">Рівень терміновості *</Label>
                        <Select value={formData.urgencyLevel} onValueChange={(value: Urgency) => setFormData({ ...formData, urgencyLevel: value })}>
                            <SelectTrigger id="urgency" className="w-full bg-slate-100">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="non_critical">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Звичайна - планове обслуговування</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="critical">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <span>Критична - вплив на роботу відділення</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {(showDescriptionTooLongMessage || showPhotoLimitMessage || unsupportedTypeError) &&
                        <div className="mt-1 mb-0">
                            {showDescriptionTooLongMessage && <Notification type="error" message={errorMessages.issue} />}
                            {showPhotoLimitMessage && <Notification className="mt-2" type="error" message={errorMessages.photos} />}
                            {unsupportedTypeError && <Notification className="mt-2" type="error" message={errorMessages.unsupportedType} />}
                        </div>
                    }
                    <Button
                        type="submit"
                        disabled={
                            isLoading ||
                            isSubmitting ||
                            showPhotoLimitMessage ||
                            showDescriptionTooLongMessage ||
                            formData.description.length <= 0
                        }
                        className="mt-3 w-full sm:w-auto bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Надсилання...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5 mr-2" />
                                Надіслати заявку
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Card>
    );
}

export default CreateRepairRequestForm;