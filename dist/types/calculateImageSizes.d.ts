export interface Image {
    src: string;
    aspect_ratio: number;
    alt?: string;
}
export type GalleryCalculationProps = {
    ratios: number[];
    images: Image[];
} & ({
    lastRowBehavior: 'fill' | 'preserve';
} | {
    lastRowBehavior: 'match-previous';
    allowShrinking?: boolean;
    shrinkLimit?: number;
});
export declare const calculateImageSizes: (arg: GalleryCalculationProps) => readonly [number[][], number[]];
