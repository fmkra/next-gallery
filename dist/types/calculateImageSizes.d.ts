import Image from 'next/image';
type NextImageType = typeof Image;
type NextImageProps = NextImageType extends (props: infer P) => any ? P : never;
export interface Image {
    src: string;
    aspect_ratio: number;
    alt?: string;
    nextImageProps?: Partial<NextImageProps>;
}
type LastRowBehaviorMatchPrevious = {
    lastRowBehavior?: 'match-previous';
    shrinkLimit?: number;
    growLimit?: number;
    preferGrowing?: number;
};
type LastRowBehaviorPreserve = {
    lastRowBehavior: 'preserve';
};
type LastRowBehaviorFill = {
    lastRowBehavior: 'fill';
    threshold?: number;
};
export type GalleryCalculationProps = {
    ratios: number[];
    images: Image[];
} & (LastRowBehaviorMatchPrevious | LastRowBehaviorPreserve | LastRowBehaviorFill);
export declare const calculateImageSizes: (arg: GalleryCalculationProps) => readonly [number[][], number[]];
export {};
