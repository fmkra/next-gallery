/// <reference types="react" />
import { GalleryCalculationProps } from './calculateImageSizes';
export type GalleryProps = GalleryCalculationProps & {
    widths: number[];
    gap?: string;
    overlay?: (index: number) => React.ReactNode;
};
export declare function Gallery({ widths, gap, overlay, ...props }: GalleryProps): import("react/jsx-runtime").JSX.Element;
