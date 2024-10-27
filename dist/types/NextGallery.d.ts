import Image, { ImageLoader } from 'next/image';
import { GalleryProps } from './ReactGallery';
import { ExtraArgsShape } from './calculateImageSizes';
type NextImageType = typeof Image;
type NextImageProps = NextImageType extends (props: infer P) => any ? P : never;
export type NextExtraArgsShape = ExtraArgsShape & {
    nextImageProps?: Partial<NextImageProps>;
};
export type NextGalleryProps<ExtraArgs extends NextExtraArgsShape = {}> = GalleryProps<ExtraArgs> & {
    percentVw?: number;
    imgLoader?: ImageLoader;
};
export declare function NextGallery<ExtraArgs extends NextExtraArgsShape = {}>({ percentVw, breakpoints, imgLoader, ...props }: NextGalleryProps<ExtraArgs>): import("react/jsx-runtime").JSX.Element;
export {};
