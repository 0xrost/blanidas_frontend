import type { RepairRequestEntry } from "@/domain/entities/repair-request";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/presentation/components/ui/dialog.tsx";
import { pluralize } from "@/presentation/utils";

interface Props {
  entries: RepairRequestEntry[];
}

const DescriptionCard = ({ entries }: Props) => {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const entriesRender = entries.map((entry, idx) => {
    return (
      <div key={entry.id ?? `${idx}`} className="border-b border-slate-200 pb-2 pt-2 first:pt-0 last:border-b-0 last:pb-0">
        <div className="flex items-center gap-2.5">
          <div className="flex justify-between w-full">
            <p className="text-xs tracking-widest text-slate-600 uppercase">Запис {idx + 1}</p>
            <p className="text-xs text-slate-600">{new Date(entry.createdAt).toLocaleDateString("uk-UA")}</p>
          </div>
        </div>
        <div className="px-4">
            <p className="text-sm text-slate-900 whitespace-pre-wrap break-words leading-6">
                {entry.issue?.trim() ? entry.issue : "—"}
            </p>

            {entry.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1.5 mt-2.5">
                    {entry.photos.map((photo, photoIdx) => (
                        <button
                            key={`${photo}-${photoIdx}`}
                            type="button"
                            className="aspect-square rounded-lg border border-slate-200 overflow-hidden cursor-pointer p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                            onClick={() => setLightboxUrl(photo)}
                        >
                            <img
                                alt="Фото поломки"
                                src={photo}
                                loading="lazy"
                                className="w-full h-full object-cover pointer-events-none"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>
    );
  });

  return (
    <div className="bg-white border-slate-200 px-2 py-3">
        <div className="flex items-center border-b justify-between px-2 pb-2">
            <p className="text-slate-900">Опис проблеми</p>
            <span className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-600">
            {entries.length}{" "}
            {pluralize(entries.length, "запис", "записи", "записів")}
            </span>
        </div>
        <div className="px-3 pt-2">
            {entriesRender}
        </div>

        <Dialog open={lightboxUrl !== null} onOpenChange={(open) => { if (!open) setLightboxUrl(null); }}>
            <DialogContent
                className="fixed inset-0 left-0 top-0 z-50 flex h-[100dvh] max-h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 flex-col items-center justify-center gap-0 border-0 bg-black/95 p-4 shadow-none sm:max-w-none rounded-none data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:hover:opacity-100"
            >
                <DialogTitle className="sr-only">Фото поломки на весь екран</DialogTitle>
                {lightboxUrl && (
                    <img
                        alt=""
                        src={lightboxUrl}
                        className="max-h-[calc(100dvh-2rem)] max-w-full object-contain"
                    />
                )}
            </DialogContent>
        </Dialog>
    </div>
  );
};

export default DescriptionCard;