import React from 'react'
import { Gallery } from '../src'

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
]

const widths = [500, 1000, 1600]
const ratios = [2.2, 4, 6, 8]

export default function BasicPage() {
    return <Gallery initState={false} images={images} widths={widths} ratios={ratios} />
}
