import { resolveImageUrl, isSvgContent } from "../imageUrl";

interface Props {
    image: string;
    alt?: string;
    className?: string;
}

export default function ArticleImage({ image, alt = "", className = "" }: Props) {
    if (!image) return null;

    if (isSvgContent(image)) {
        return (
            <div
                className={`[&>svg]:w-full [&>svg]:h-full [&>svg]:block ${className}`}
                dangerouslySetInnerHTML={{ __html: image }}
            />
        );
    }

    return (
        <img
            src={resolveImageUrl(image)}
            alt={alt}
            className={className}
        />
    );
}
