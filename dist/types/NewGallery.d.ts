import { GalleryCalculationProps } from './calculateImageSizes';
interface GalleryProps extends GalleryCalculationProps {
    widths: number[];
}
export declare function NewGallery({ images, widths, ratios, spanLastRow }: GalleryProps): import("react/jsx-runtime").JSX.Element;
export {};
