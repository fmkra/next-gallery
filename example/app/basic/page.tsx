// 'use client'

import React from 'react'
import { NewGallery } from 'next-gallery'

const images = [
    { src: 'https://picsum.photos/id/1019/1440/1080/', aspect_ratio: 4 / 3 },
    { src: 'https://picsum.photos/id/1011/1080/1920/', aspect_ratio: 9 / 16 },
    { src: 'https://picsum.photos/id/1018/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/1015/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/1026/1920/1080/', aspect_ratio: 16 / 9 },
]

const widths = [500, 1000, 1600]
const ratios = [2.2, 4, 6, 8]

export default function BasicPage() {
    return (
        <div className="flex flex-col gap-10">
            <NewGallery {...{ widths, ratios, images }} lastRowBehavior="fill" />
            <NewGallery {...{ widths, ratios, images }} lastRowBehavior="preserve" />
            <NewGallery {...{ widths, ratios, images }} lastRowBehavior="match-previous" />
        </div>
    )
}
