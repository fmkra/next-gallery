import { useState, useMemo, Dispatch, SetStateAction, ReactElement } from 'react'
import Image, { ImageLoader } from 'next/image'
import useWindowWidth from './useWindowWidth'


export interface Image {
    src: string
    aspect_ratio: number
    alt?: string
}

export interface NamedImage<NameT> extends Image {
    name: NameT
}

export type GalleryProps<NameT, StateT> = {
    widths: number[]
    ratios: number[]
    percentVw?: number
    margin?: string
    initState?: StateT
    imgLoader?: ImageLoader,
} & ({
    images: NamedImage<NameT>[]
    overlay: (name: NameT, state: StateT, setState: Dispatch<SetStateAction<StateT>>) => ReactElement
}|{
    images: Image[]
    overlay?: undefined
})

export function Gallery<NameT, StateT>({
    images,
    widths,
    ratios,
    percentVw = 100,
    margin = '2px',
    initState,
    imgLoader,
    overlay,
}: GalleryProps<NameT, StateT>) {

    const [state, setState] = useState<StateT[]>(new Array(images.length).fill(initState))

    const sizes = useMemo(() => ratios.map(ratio => {
        let current_ratio = 0
        let width_percent: number[] = []
        for(let i = 0; i < images.length; i++) {
            if(current_ratio + images[i].aspect_ratio <= ratio) {
                current_ratio += images[i].aspect_ratio
            } else {
                for(let j = width_percent.length; j < i; j++) {
                    width_percent.push(Math.floor(images[j].aspect_ratio / current_ratio * 1000) / 10)
                }
                current_ratio=images[i].aspect_ratio
            }
        }
        for(let i = width_percent.length; i < images.length; i++) {
            width_percent.push(Math.floor(images[i].aspect_ratio / current_ratio * 1000) / 10)
        }
        return width_percent
    }), [images, ratios])

    const width = useWindowWidth()

    const sizeLevel = useMemo(() => {
        if(width === null) return null
        const index = widths.findIndex(value => value > width)
        return index === -1 ? ratios.length - 1 : index
    }, [width, widths, ratios])

    if (width == null || sizeLevel === null) return null

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
        }}>
            {images.map((image, index) => (
                <div key={index} style={{
                    boxSizing: 'border-box',
                    width: sizes[index]+'%',
                    flexShrink: 0,
                    flexGrow: 1,
                    aspectRatio: image.aspect_ratio,
                    position: 'relative',
                    paddingBottom: sizes[sizeLevel][index]/image.aspect_ratio+'%',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: margin,
                        left: margin,
                        right: margin,
                        bottom: margin,
                    }}>
                        <Image src={image.src} alt={image.alt??''} fill loader={imgLoader} sizes={widths.map((width, i) => `(max-width: ${width}px) ${percentVw/100*sizes[i][index]}vw`).join(', ')+`, ${sizes[widths.length-1][index]}`} />
                        {overlay ? (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}>
                                {overlay((image as NamedImage<NameT>).name, state[index], arg => {
                                    if(arg instanceof Function) setState(state.map((value, i) => i === index ? arg(value) : value))
                                    else setState(state.map((value, i) => i === index ? arg : value))
                                })}
                            </div>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    )
}