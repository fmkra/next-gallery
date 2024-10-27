import Image, { ImageLoader } from 'next/image'
import { GalleryProps, RenderArg, ReactGallery } from './ReactGallery'
import { useCallback } from 'react'
import { ExtraArgsShape } from './calculateImageSizes'

type NextImageType = typeof Image
type NextImageProps = NextImageType extends (props: infer P) => any ? P : never

export type NextExtraArgsShape = ExtraArgsShape & {
    nextImageProps?: Partial<NextImageProps>
}

export type NextGalleryProps<ExtraArgs extends NextExtraArgsShape = {}> = GalleryProps<ExtraArgs> & {
    percentVw?: number
    imgLoader?: ImageLoader
}

export function NextGallery<ExtraArgs extends NextExtraArgsShape = {}>({
    percentVw = 100,
    widths,
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
                    widths.map((width, i) => `(max-width: ${width}px) ${(percentVw / 100) * p.sizes[i]}vw`).join(', ') +
                    `, ${(percentVw / 100) * p.sizes[widths.length]}vw`
                }
                {...p.nextImageProps}
            />
        ),
        [percentVw, imgLoader, widths]
    )

    return <ReactGallery widths={widths} {...props} render={render} />
}
