'use client'

import React, { useState } from 'react'
import { Gallery } from 'next-gallery'

const images = [
    { src: 'https://picsum.photos/id/10/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/11/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/12/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/13/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/14/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/15/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/16/1920/1080/', aspect_ratio: 16 / 9 },
]

type LastRowBehavior = 'match-previous' | 'preserve' | 'fill'

export default function LastRowBehaviorPage() {
    const [type, setType] = useState<LastRowBehavior>('preserve')
    const [threshold, setThreshold] = useState(0)

    const lastRowBehavior = {
        preserve: { lastRowBehavior: type },
        fill: { lastRowBehavior: type, threshold },
        'match-previous': { lastRowBehavior: type },
    }[type]

    return (
        <div>
            <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem' }}>
                <p>
                    Select <code>lastRowBehavior</code>
                </p>
                <select value={type} onChange={(e) => setType(e.target.value as LastRowBehavior)}>
                    <option value="preserve">preserve</option>
                    <option value="fill">fill</option>
                    <option value="match-previous">match-previous</option>
                </select>
            </div>
            {type == 'fill' && (
                <div>
                    <div style={{ margin: '0 0.5rem' }}>
                        <p>Threshold: {threshold.toFixed(2)}</p>
                    </div>
                    <input
                        type="range"
                        value={threshold}
                        onChange={(e) => setThreshold(parseFloat(e.target.value))}
                        min={0}
                        max={1}
                        step={0.01}
                        style={{ width: '100%' }}
                    />
                </div>
            )}
            <Gallery images={images} widths={[500, 1000, 1600]} ratios={[2.2, 4, 6, 8]} {...lastRowBehavior} />
        </div>
    )
}
