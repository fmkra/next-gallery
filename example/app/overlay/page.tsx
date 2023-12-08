import { Gallery } from 'next-gallery'

const images = [
    { src: 'https://picsum.photos/id/1019/1440/1080/', aspect_ratio: 4 / 3 },
    { src: 'https://picsum.photos/id/1011/1080/1920/', aspect_ratio: 9 / 16 },
    { src: 'https://picsum.photos/id/1018/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/1015/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/1026/1920/1080/', aspect_ratio: 16 / 9 },
]

const overlays = ['Image 1', 'Image 2', 'Image 3', 'Image 4', 'Image 5']

const overlayStyle = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '0.5rem',
} as const

export default function OverlayPage() {
    return (
        <div className="flex flex-col gap-10">
            <Gallery
                widths={[500, 1000, 1600]}
                ratios={[2.2, 4, 6, 8]}
                images={images}
                lastRowBehavior="match-previous"
                overlay={(i) => <div style={overlayStyle}>{overlays[i]}</div>}
            />
        </div>
    )
}
