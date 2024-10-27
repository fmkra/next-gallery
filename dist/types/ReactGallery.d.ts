/// <reference types="react" />
import { ExtraArgsShape, GalleryCalculationProps, Image } from './calculateImageSizes';
export type GalleryProps<ExtraArgs extends ExtraArgsShape = {}> = GalleryCalculationProps<ExtraArgs> & {
    widths: number[];
    overlay?: (image: Image<ExtraArgs>, index: number) => React.ReactNode;
    gap?: string;
};
export type RenderArg<ExtraArgs extends ExtraArgsShape = {}> = Image<ExtraArgs> & {
    sizes: number[];
};
export type ReactGalleryProps<ExtraArgs extends ExtraArgsShape = {}> = GalleryProps<ExtraArgs> & {
    render: (args: RenderArg<ExtraArgs>) => JSX.Element;
};
export declare const ReactGallery: <ExtraArgs extends ExtraArgsShape = {}>({ render, widths, gap, overlay, ...props }: ReactGalleryProps<ExtraArgs>) => import("react/jsx-runtime").JSX.Element;
