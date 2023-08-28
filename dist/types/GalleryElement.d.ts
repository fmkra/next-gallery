/// <reference types="react" />
import { GalleryCalculationProps } from './calculateImageSizes';
type GalleryProps = GalleryCalculationProps & {
    widths: number[];
    children: (index: number) => React.ReactNode;
};
export declare function GalleryElement({ widths, children, ...props }: GalleryProps): import("react/jsx-runtime").JSX.Element;
export {};
