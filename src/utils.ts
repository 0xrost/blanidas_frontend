const IMAGE_MIME_TO_EXT: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/bmp": "bmp",
    "image/svg+xml": "svg",
    "image/tiff": "tiff",
};

function imageMimeToExtension(mime: string): string | null {
    return IMAGE_MIME_TO_EXT[mime] ?? null;
}

function formatNumber(num: number | string, length: number) {
    let result = num.toString();
    while (result.length < length) {
        result = "0" + result;
    }
    return result;
}

export { formatNumber, imageMimeToExtension };