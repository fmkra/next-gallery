'use client'

import { NextGallery } from 'next-gallery'
import { MyOverlay, OverlayProvider } from './overlay'

const images = [
    { src: 'https://picsum.photos/id/10/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/11/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/12/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/13/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/14/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/15/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/16/1920/1080/', aspect_ratio: 16 / 9 },
]

const ratios = [2.2, 4, 6, 8]
const breakpoints = [500, 1000, 1600]

const overlay = (_: unknown, i: number) => <MyOverlay index={i} />

export default function SelectablePage() {
    return (
        <OverlayProvider>
            <NextGallery
                images={images}
                breakpoints={breakpoints}
                ratios={ratios}
                lastRowBehavior="match-previous"
                overlay={overlay}
            />
        </OverlayProvider>
    )
}
