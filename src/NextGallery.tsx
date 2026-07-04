import Image from 'next/image'
import type { ImageLoader, ImageProps } from 'next/image'
import { useCallback } from 'react'
import { ExtraArgsShape } from './calculateImageSizes'
import { GalleryProps, ReactGallery, RenderArg } from './ReactGallery'

export type NextExtraArgsShape = ExtraArgsShape & {
    nextImageProps?: Partial<ImageProps>
}

export type NextGalleryProps<ExtraArgs extends NextExtraArgsShape = {}> = GalleryProps<ExtraArgs> & {
    percentVw?: number
    imgLoader?: ImageLoader
}

export function NextGallery<ExtraArgs extends NextExtraArgsShape = {}>({
    percentVw = 100,
    breakpoints,
    imgLoader,
    ...props
}: NextGalleryProps<ExtraArgs>) {
    const render = useCallback(
        (p: RenderArg<ExtraArgs>) => (
            <Image
                src={p.src}
                alt={p.alt ?? ''}
                fill
                loader={imgLoader}
                sizes={
                    breakpoints
                        .map((breakpoint, i) => `(max-width: ${breakpoint}px) ${(percentVw / 100) * p.sizes[i]}vw`)
                        .join(', ') + `, ${(percentVw / 100) * p.sizes[breakpoints.length]}vw`
                }
                {...p.nextImageProps}
            />
        ),
        [percentVw, imgLoader, breakpoints]
    )

    return <ReactGallery breakpoints={breakpoints} {...props} render={render} />
}
