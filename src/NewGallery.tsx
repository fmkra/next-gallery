import { useId } from 'react'
import Image from 'next/image'
import { GalleryCalculationProps, calculateImageSizes } from './calculateImageSizes'

const containerStyle = {
    display: `flex`,
    flexWrap: `wrap`,
} as const

const elementStyle = (aspectRatio: number, sizes: number[]) =>
    sizes.reduce((acc, val, idx) => ((acc[`--next-gallery-${idx + 1}`] = `${val}%`), acc), {
        '--next-gallery-ar': `${aspectRatio}`,
        position: 'relative',
        boxSizing: `border-box`,
        flexShrink: 0,
        flexGrow: 1,
    } as Record<string, any>)

type GalleryProps = GalleryCalculationProps & {
    widths: number[]
}

export function NewGallery(props: GalleryProps) {
    const [sizes, width_left] = calculateImageSizes(props)

    const id = useId().replace(/:/g, '')

    return (
        <>
            <style>
                {`
                .next-gallery__element-${id} {
                    width: var(--next-gallery-1);
                    padding-bottom: calc(var(--next-gallery-1) / var(--next-gallery-ar));
                }
                .next-gallery__wl-${id} {
                    width: var(--next-gallery-1);
                    flex-shrink: 0,
                    flex-grow: 1,
                }` +
                    props.widths
                        .map(
                            (width, i) => `
                            @media (min-width: ${width}px) {
                                .next-gallery__element-${id} {
                                    width: var(--next-gallery-${i + 2});
                                    padding-bottom: calc(var(--next-gallery-${i + 2}) / var(--next-gallery-ar));
                                }
                                .next-gallery__wl-${id} {
                                    width: var(--next-gallery-${i + 2});
                                }
                            }`
                        )
                        .join('')}
            </style>
            <div style={containerStyle}>
                {sizes.map((size, i) => (
                    <div
                        className={`next-gallery__element-${id}`}
                        key={i}
                        style={elementStyle(props.images[i].aspect_ratio, size)}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '1px',
                                left: '1px',
                                right: '1px',
                                bottom: '1px',
                            }}
                        >
                            <Image
                                src={props.images[i].src}
                                alt={props.images[i].alt ?? ''}
                                fill
                                sizes={
                                    props.widths
                                        .map((width, i) => `(max-width: ${width}px) ${(100 / 100) * size[i]}vw`)
                                        .join(', ') + `, ${(100 / 100) * sizes[sizes.length - 1][i]}vw`
                                }
                            />
                        </div>
                    </div>
                ))}
                <div
                    className={`next-gallery__wl-${id}`}
                    style={width_left.reduce(
                        (acc, val, idx) => ((acc[`--next-gallery-${idx + 1}`] = `${val}%`), acc),
                        {} as Record<string, string>
                    )}
                ></div>
            </div>
        </>
    )
}
