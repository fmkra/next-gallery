import { memo, useId, useMemo } from 'react'
import {
    ExtraArgsShape,
    GalleryCalculationProps,
    Image,
    LastRowBehaviorFill,
    LastRowBehaviorMatchPrevious,
    calculateImageSizes,
} from './calculateImageSizes'

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

export type GalleryProps<ExtraArgs extends ExtraArgsShape = {}> = GalleryCalculationProps<ExtraArgs> & {
    breakpoints: number[]
    overlay?: (image: Image<ExtraArgs>, index: number) => React.ReactNode
    gap?: string
}

export type RenderArg<ExtraArgs extends ExtraArgsShape = {}> = Image<ExtraArgs> & {
    sizes: number[]
}

export type ReactGalleryProps<ExtraArgs extends ExtraArgsShape = {}> = GalleryProps<ExtraArgs> & {
    render: (args: RenderArg<ExtraArgs>) => JSX.Element
}

const ReactGalleryInner = <ExtraArgs extends ExtraArgsShape = {}>({
    render,
    breakpoints,
    gap = '1px',
    overlay,
    ...props
}: ReactGalleryProps<ExtraArgs>) => {
    const expectedRatiosLen = breakpoints.length + 1
    if (expectedRatiosLen != props.ratios.length) {
        const shortLong = props.ratios.length < expectedRatiosLen ? 'short' : 'long'
        throw new Error(
            `'ratios' array is too ${shortLong}. It should have length ${expectedRatiosLen} (because ${breakpoints.length} breakpoints were provided), but has ${props.ratios.length}`
        )
    }

    const [sizes, width_left] = useMemo(
        () => calculateImageSizes(props),
        [
            props.ratios,
            props.images,
            props.lastRowBehavior,
            (props as LastRowBehaviorMatchPrevious)?.shrinkLimit,
            (props as LastRowBehaviorMatchPrevious)?.growLimit,
            (props as LastRowBehaviorMatchPrevious)?.preferGrowing,
            (props as LastRowBehaviorFill)?.threshold,
        ]
    )

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
                    breakpoints
                        .map(
                            (breakpoint, i) => `
                            @media (min-width: ${breakpoint}px) {
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
                {props.images.map((img, i) => (
                    <div
                        className={`next-gallery__element-${id}`}
                        key={i}
                        style={elementStyle(img.aspect_ratio, sizes[i])}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: gap,
                                left: gap,
                                right: gap,
                                bottom: gap,
                            }}
                        >
                            {render({
                                ...img,
                                sizes: sizes[i],
                            })}
                        </div>

                        {overlay && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: gap,
                                    left: gap,
                                    right: gap,
                                    bottom: gap,
                                    zIndex: 2,
                                }}
                            >
                                {overlay(img, i)}
                            </div>
                        )}
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
export const ReactGallery = memo(ReactGalleryInner) as typeof ReactGalleryInner
