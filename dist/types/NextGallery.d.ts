import type { ImageLoader, ImageProps } from 'next/image';
import { ExtraArgsShape } from './calculateImageSizes';
import { GalleryProps } from './ReactGallery';
export type NextExtraArgsShape = ExtraArgsShape & {
    nextImageProps?: Partial<ImageProps>;
};
export type NextGalleryProps<ExtraArgs extends NextExtraArgsShape = {}> = GalleryProps<ExtraArgs> & {
    percentVw?: number;
    imgLoader?: ImageLoader;
};
export declare function NextGallery<ExtraArgs extends NextExtraArgsShape = {}>({ percentVw, breakpoints, imgLoader, ...props }: NextGalleryProps<ExtraArgs>): import("react/jsx-runtime").JSX.Element;
