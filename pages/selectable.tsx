import React from 'react'
import { Gallery } from '../src'

const MyOverlay = ({selected, onClick}: {selected: boolean, onClick: () => void}) => <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: selected ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
}} onClick={onClick}></div>

const images = [
    { src: "https://picsum.photos/id/1018/1920/1080/", aspect_ratio: 16/9, name: 1 },
    { src: "https://picsum.photos/id/1015/1920/1080/", aspect_ratio: 16/9, name: 2 },
]
const widths = [ 500, 1000, 1600 ]
const ratios = [ 2.2, 4, 6, 8 ]

export default function() {
    return <Gallery {...{images, widths, ratios}} initState={false} overlay={(name, state, setState) => <MyOverlay selected={state} onClick={() => setState(s => !s)} />} />
}