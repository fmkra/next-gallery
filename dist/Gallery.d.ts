import { Dispatch, SetStateAction, ReactElement } from 'react';
import { ImageLoader } from 'next/image';
export interface Image {
    src: string;
    aspect_ratio: number;
    alt?: string;
}
export interface NamedImage<NameT> extends Image {
    name: NameT;
}
export type GalleryProps<NameT, StateT> = {
    widths: number[];
    ratios: number[];
    percentVw?: number;
    margin?: string;
    initState?: StateT;
    imgLoader?: ImageLoader;
} & ({
    images: NamedImage<NameT>[];
    overlay: (name: NameT, state: StateT, setState: Dispatch<SetStateAction<StateT>>) => ReactElement;
} | {
    images: Image[];
    overlay?: undefined;
});
export declare function Gallery<NameT, StateT>({ images, widths, ratios, percentVw, margin, initState, imgLoader, overlay, }: GalleryProps<NameT, StateT>): JSX.Element | null;
