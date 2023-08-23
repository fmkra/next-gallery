import { useId } from 'react'
import type { Image as ImageT } from './Gallery'
import Image from 'next/image'

const f = (ratios: number[], images: ImageT[], spanLastRow = 0) => {
    const sizes: number[][] = Array.from({ length: images.length }, () => [])
    const wl: number[] = []
    for (const ratio_index in ratios) {
        const ratio = ratios[ratio_index]
        let current_ratio = 0
        let width_percent: number[] = []
        for (let i = 0; i < images.length; i++) {
            if (current_ratio + images[i].aspect_ratio <= ratio) {
                current_ratio += images[i].aspect_ratio
            } else {
                for (let j = width_percent.length; j < i; j++) {
                    width_percent.push(Math.floor((images[j].aspect_ratio / current_ratio) * 1000) / 10)
                }
                current_ratio = images[i].aspect_ratio
            }
        }
        const width_left = Math.floor((1 - current_ratio / ratio) * 1000) / 10
        const shouldSpan = 100 - width_left < spanLastRow
        for (let i = width_percent.length; i < images.length; i++) {
            width_percent.push(Math.floor((images[i].aspect_ratio / (shouldSpan ? ratio : current_ratio)) * 1000) / 10)
        }
        for (const i in width_percent) {
            sizes[i].push(width_percent[i])
        }
        wl.push(shouldSpan ? width_left : 0)
    }
    return [sizes, wl] as const
}

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
        outline: `solid 1px red`,
    } as Record<string, any>)

export function NewGallery() {
    const widths = [500, 1000, 1600]
    const ratios = [2.2, 4, 6, 8]
    const images = [
        { src: 'https://picsum.photos/id/1018/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1015/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1019/1440/1080/', aspect_ratio: 4 / 3 },
        { src: 'https://picsum.photos/id/1011/1080/1920/', aspect_ratio: 9 / 16 },
        { src: 'https://picsum.photos/id/1012/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1013/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1014/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1016/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1020/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1021/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1022/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1023/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1024/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1025/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1026/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1027/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1028/1920/1080/', aspect_ratio: 16 / 9 },
        { src: 'https://picsum.photos/id/1029/1920/1080/', aspect_ratio: 16 / 9 },
    ] as ImageT[]
    const [sizes, width_left] = f(ratios, images)

    const id = useId().replace(/:/g, '')

    return (
        <>
            <style>
                {`
                .next-gallery__element-${id} {
                    width: var(--next-gallery-1);
                    padding-bottom: calc(var(--next-gallery-1) / var(--next-gallery-ar));
                }` +
                    widths
                        .map(
                            (width, i) =>
                                `@media (min-width: ${width}px) {
                                .next-gallery__element-${id} {
                                    width: var(--next-gallery-${i + 2});
                                    padding-bottom: calc(var(--next-gallery-${i + 2}) / var(--next-gallery-ar));
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
                        style={elementStyle(images[i].aspect_ratio, size)}
                    >
                        <Image
                            src={images[i].src}
                            alt={images[i].alt ?? ''}
                            fill
                            sizes={
                                widths
                                    .map((width, i) => `(max-width: ${width}px) ${(100 / 100) * size[i]}vw`)
                                    .join(', ') + `, ${(100 / 100) * sizes[sizes.length - 1][i]}vw`
                            }
                        />
                    </div>
                ))}
            </div>
        </>
    )
}
