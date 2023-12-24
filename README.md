# next-gallery

[![license](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![npm version](https://img.shields.io/badge/npm-v2.0.3-brightgreen)](https://www.npmjs.com/package/next-gallery)

Next.js component for creating responsive image gallery

Now supports Server Components

![Example on desktop](assets/example_3.png?raw=true)

## Installation

```bash
npm install next-gallery
```

## Usage

```tsx
import { Gallery } from "next-gallery"

const images = [
    { src: "https://picsum.photos/id/1018/1920/1080/", aspect_ratio: 16/9 },
    { src: "https://picsum.photos/id/1015/1920/1080/", aspect_ratio: 16/9 },
    ...
]
const widths = [ 500, 1000, 1600 ]
const ratios = [ 2.2, 4, 6, 8 ]

export default function MyGallery() {
    return (
        <Gallery {...{images, widths, ratios}} />
    )
}
```

Gallery can be used as both client and server component, but **it's recommended to use it as server component** because it will allow to do all calculations on the server and ship no JS to the user. (All image resizing is done by CSS.)

More examples in [example](example) directory.

## props

-   `images` - array of images where every image is an object with properties:
    -   `src` - image source
    -   `aspect_ratio` - image aspect ratio (width / height)
    -   `alt` (default: `""`) - image alt
    -   `nextImageProps` (default: `{}`) - object with additional props passed to nextjs' `Image` component. See [next/image](https://nextjs.org/docs/api-reference/next/image#props)
-   `widths` - array of width breakpoints in pixels (e.g. `[400, 800, 1200]`)
-   `ratios` - array of aspect ratios. Its length has to be one greater than `widths` array (e.g. `[16/9, 32/9, 48/9, 64/9]` along with `widths` above would result in row of proportion at most 16:9 (e.g. one 16:9 image or two 9:16, etc.) for screen widths 0-400px, 32:9 for 400-800px, etc.)
-   `percentVw` (default: 100) - percent of viewport width that gallery takes (used for image optimization, doesn't change how gallery looks)
-   `gap` (default: `"2px"`) - gap between images, needs to be valid css value (e.g. `"2px"`, `"2rem"`, etc.)
-   `imgLoader` (default: next default loader) - image loader, see [next/image](https://nextjs.org/docs/api-reference/next/image#loader)
-   `lastRowBehavior` (default: `"match-previous"`) - `"match-previous"`, `"fill"` or `"preserve"`. See [last row behavior](#last-row-behavior) section below.
-   for other props available only for certain `lastRowBehavior` values see [last row behavior](#last-row-behavior) section below.
-   `overlay` (optional) - It is a function that takes image index and returns `ReactNode` that will be rendered as overlay for every image. Overlay can be used e.g. for displaying text on top of the image or for selecting images (see example below).

```tsx
import { Gallery } from 'next-gallery'

const images = [
    { src: 'https://picsum.photos/id/1019/1440/1080/', aspect_ratio: 4 / 3 },
    ...
]

const overlays = ['Image 1', ...];

const overlayStyle = {...} as const;

export default function Page() {
    return (
        <div className="flex flex-col gap-10">
            <Gallery
                widths={[500, 1000, 1600]}
                ratios={[2.2, 4, 6, 8]}
                images={images}
                lastRowBehavior="match-previous"
                overlay={(i) => (
                    <div style={overlayStyle}>
                        {overlays[i]}
                    </div>
                )}
            />
        </div>
    )
}
```

## last row behavior

See [live comparison](https://next-gallery-demo.vercel.app/last-row-behavior) between `lastRowBehavior` options.

### preserve

Last row always has proportion given by `ratios` property. Images align themselves to the left and leave empty space on the right.

### fill

Last row fills whole width of the gallery. (This may cause the last row to look disproportionately high)

-   `threshold` (default: `0`) - number in range `[0,1]` that determines when the last row should be filled. If last row would take more percent of width than `threshold`, it will be expanded to fill the remaining space. Otherwise it behaves like `preserve`. (`threshold = 0` will always fill the last row, `threshold = 1` is equivalent to `preserve`)

### match-previous

It tries to align last row to the previous one, so that some of the gaps between images in last and second last row align in a straight line.

-   `shrinkLimit` (default: `0.5`) - number in range `[0,1]` that determines how much the last row can shrink. `0` means that there is no limit, `1` means that last row will not shrink at all, `0.5` means that last row can shrink to half of its original size.
-   `growLimit` (default: `1.5`) - number in range [1,∞] that determines how much the last row can grow. `∞` means that there is no limit, `1` means that last row will not grow at all, `1.5` means that last row can grow by 50% of its original size.
-   `preferGrow` (default: `2`) - how much is it preferred to grow the last row than shrink it. For example, if set to `2` and the algorithm could choose between growing by `20%` or shrinking by `x`, it would choose to grow when `x > 10%`, otherwise it would shrink. If set to `1`, it always chooses smaller change in percent.
