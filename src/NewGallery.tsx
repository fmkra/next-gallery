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

    return (
        <>
            <style>{`
                .next-gallery__container {
                    display: flex;
                    flex-wrap: wrap;
                }
                .next-gallery__element {
                    position: relative;
                    box-sizing: border-box;
                    flex-shrink: 0;
                    flex-grow: 1;
                    outline: solid 1px red;
                    width: var(--gallery-4);
                    padding-bottom: calc(var(--gallery-4) / var(--aspect-ratio));
                }
            `}</style>
            <div className="next-gallery__container">
                {sizes.map((size, i) => (
                    <div
                        className="next-gallery__element"
                        key={i}
                        style={size.reduce(
                            (acc, val, idx) => {
                                acc[`--gallery-${idx + 1}`] = `${val}%`
                                return acc
                            },
                            {
                                '--aspect-ratio': `${images[i].aspect_ratio}`,
                            } as Record<string, string>
                        )}
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
