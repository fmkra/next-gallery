export interface Image {
    src: string;
    aspect_ratio: number;
    alt?: string;
}
export interface GalleryCalculationProps {
    ratios: number[];
    images: Image[];
    spanLastRow?: number;
}
export declare const calculateImageSizes: ({ ratios, images }: GalleryCalculationProps) => readonly [number[][], number[]];
