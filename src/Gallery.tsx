import { useState, useMemo, Dispatch, SetStateAction, ReactElement } from 'react'
import Image, { ImageLoader } from 'next/image'
import useWindowWidth from './useWindowWidth';


export interface ImageInterface<ImgNameT> {
    src: string
    aspect_ratio: number
    alt?: string
    name: ImgNameT
}

export interface GalleryProps<ImgNameT, StateT> {
    images: ImageInterface<ImgNameT>[]
    widths: number[]
    ratios: number[]
    percentVw?: number
    margin?: string
    overlay?: (name: ImgNameT, state: StateT, setState: Dispatch<SetStateAction<StateT>>) => ReactElement
    initState?: StateT
    imgLoader?: ImageLoader
}

export function Gallery<ImgNameT, StateT>({ images, widths, ratios, margin, overlay, initState, imgLoader }: GalleryProps<ImgNameT, StateT>) {
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

    if (sizeLevel === null) return null

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
                        top: margin??2 + 'px',
                        left: margin??2 + 'px',
                        right: margin??2 + 'px',
                        bottom: margin??2 + 'px',
                    }}>
                        <Image src={image.src} alt={image.alt??''} fill loader={imgLoader} sizes={widths.map((width, i) => `(max-width: ${width}px) ${sizes[i][index]}vw`).join(', ')+`, ${sizes[widths.length-1][index]}`} />
                        {overlay ? (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}>
                                {Math.floor((width??0)*sizes[sizeLevel][index]/100)}
                                {overlay(image.name, state[index], arg => {
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