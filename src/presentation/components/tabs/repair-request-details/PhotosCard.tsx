import {Card} from "@/presentation/components/ui/card.tsx";
import {Image} from "lucide-react";

interface Props { photos: string[] }
const PhotosCard = ({ photos }: Props) => {
    return (
        <Card className="bg-white border-slate-200">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Image className="w-5 h-5 text-slate-400" />
                    <h3 className="text-slate-900">Фото поломки</h3>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {photos.map((photo) => (
                            <div key={photo} className="flex flex-col items-center gap-2">
                                <img alt="Фото поломки" src={photo} className="w-full h-48 object-cover rounded border border-slate-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

/*
* <Card className="py-0 bg-white border-slate-200">
    <div className="p-6">
        <div className="flex items-start justify-between mb-4">
            <div>
                <h3 className="text-slate-900">Фото пристрою</h3>
                <p className="text-sm text-slate-600">Завантажене фото</p>
            </div>
        </div>

        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {repairRequest.equipment?.photos?.length ? (
                    repairRequest.equipment.photos.map((photo, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <img
                                src={photo.url}
                                alt={`Фото пристрою ${index + 1}`}
                                className="w-full h-48 object-cover rounded border border-slate-200"
                            />
                            <p className="text-sm text-slate-500">Фото {index + 1}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-slate-500 col-span-full">Фото відсутнє</p>
                )}
            </div>
        </div>
    </div>
</Card>

* */

export default PhotosCard;