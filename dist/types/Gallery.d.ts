/// <reference types="react" />
import { ImageLoader } from 'next/image';
import { GalleryCalculationProps } from './calculateImageSizes';
export type GalleryProps = GalleryCalculationProps & {
    widths: number[];
    overlay?: (index: number) => React.ReactNode;
    gap?: string;
    percentVw?: number;
    imgLoader?: ImageLoader;
};
export declare function Gallery({ widths, gap, percentVw, overlay, imgLoader, ...props }: GalleryProps): import("react/jsx-runtime").JSX.Element;
