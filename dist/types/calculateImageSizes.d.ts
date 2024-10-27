export type ExtraArgsShape = {
    extraArgs?: any;
};
export type Image<ExtraArgs extends ExtraArgsShape = {}> = {
    src: string;
    aspect_ratio: number;
    alt?: string;
} & ExtraArgs;
export type LastRowBehaviorMatchPrevious = {
    lastRowBehavior?: 'match-previous';
    shrinkLimit?: number;
    growLimit?: number;
    preferGrowing?: number;
};
export type LastRowBehaviorPreserve = {
    lastRowBehavior: 'preserve';
};
export type LastRowBehaviorFill = {
    lastRowBehavior: 'fill';
    threshold?: number;
};
export type GalleryCalculationProps<ExtraArgs extends ExtraArgsShape = {}> = {
    ratios: number[];
    images: Image<ExtraArgs>[];
} & (LastRowBehaviorMatchPrevious | LastRowBehaviorPreserve | LastRowBehaviorFill);
export declare const calculateImageSizes: <ExtraArgs extends ExtraArgsShape = {}>(arg: GalleryCalculationProps<ExtraArgs>) => readonly [number[][], number[]];
