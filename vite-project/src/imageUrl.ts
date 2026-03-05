const BACKEND_URL = "http://localhost:3005";

export function resolveImageUrl(image: string): string {
    if (!image) return "";
    if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("data:")) {
        return image;
    }
    return `${BACKEND_URL}/${image.replace(/^\//, "")}`;
}

export function isSvgContent(image: string): boolean {
    return image?.trimStart().startsWith("<svg");
}

export function isSvg(image: string): boolean {
    return image?.toLowerCase().endsWith(".svg") || image?.startsWith("data:image/svg") || isSvgContent(image);
}
