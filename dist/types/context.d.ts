/// <reference types="react" />
export type GalleryContext<T> = {
    index: number;
    data: T;
};
declare const GalleryContext: import("react").Context<GalleryContext<any> | null>;
export declare const useGallery: <T>() => GalleryContext<T>;
export declare function GalleryContextProvider({ children, ...data }: GalleryContext<any> & {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
