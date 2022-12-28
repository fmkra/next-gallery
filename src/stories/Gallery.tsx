import React from 'react'
import {Gallery} from '../Gallery'

const images = [
    { src: "https://picsum.photos/id/1018/1920/1080/", aspect_ratio: 16/9, name: 1 },
    { src: "https://picsum.photos/id/1015/1920/1080/", aspect_ratio: 16/9, name: 2 },
    { src: "https://picsum.photos/id/1019/1440/1080/", aspect_ratio: 4/3,  name: 3 },
    { src: "https://picsum.photos/id/1011/1080/1920/", aspect_ratio: 9/16, name: 4 },
    { src: "https://picsum.photos/id/1012/1920/1080/", aspect_ratio: 16/9, name: 5 },
    { src: "https://picsum.photos/id/1013/1920/1080/", aspect_ratio: 16/9, name: 6 },
    { src: "https://picsum.photos/id/1014/1920/1080/", aspect_ratio: 16/9, name: 7 },
    { src: "https://picsum.photos/id/1016/1920/1080/", aspect_ratio: 16/9, name: 8 },
    { src: "https://picsum.photos/id/1020/1920/1080/", aspect_ratio: 16/9, name: 10 },
    { src: "https://picsum.photos/id/1021/1920/1080/", aspect_ratio: 16/9, name: 11 },
    { src: "https://picsum.photos/id/1022/1920/1080/", aspect_ratio: 16/9, name: 12 },
    { src: "https://picsum.photos/id/1023/1920/1080/", aspect_ratio: 16/9, name: 13 },
    { src: "https://picsum.photos/id/1024/1920/1080/", aspect_ratio: 16/9, name: 14 },
    { src: "https://picsum.photos/id/1025/1920/1080/", aspect_ratio: 16/9, name: 15 },
    { src: "https://picsum.photos/id/1026/1920/1080/", aspect_ratio: 16/9, name: 16 },
    { src: "https://picsum.photos/id/1027/1920/1080/", aspect_ratio: 16/9, name: 17 },
    { src: "https://picsum.photos/id/1028/1920/1080/", aspect_ratio: 16/9, name: 18 },
    { src: "https://picsum.photos/id/1029/1920/1080/", aspect_ratio: 16/9, name: 19 },

]

const widths = [ 500, 1000, 1600 ]
const ratios = [ 2.2, 4, 6, 8 ]

export default function() {
    return (<>
        <Gallery initState={false} images={images} widths={widths} ratios={ratios} margin="2px" overlay={(data, state, setState) => (
            <div style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {data}
                {state ? 'true' : 'false'}
                <button onClick={() => setState(!state)}>Toggle</button>
            </div>
        )} />
    </>)
}