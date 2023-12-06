'use client'

import React from 'react'
import { Gallery } from 'next-gallery'
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

export default function SelectablePage() {
    return (
        <OverlayProvider>
            <Gallery
                images={images}
                widths={[500, 1000, 1600]}
                ratios={[2.2, 4, 6, 8]}
                lastRowBehavior="match-previous"
                overlay={(i) => <MyOverlay index={i} />}
            />
        </OverlayProvider>
    )
}
