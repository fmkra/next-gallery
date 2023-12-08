# next-gallery

[![license](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![npm version](https://img.shields.io/badge/npm-v1.2.1-brightgreen)](https://www.npmjs.com/package/next-gallery)

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
-   `widths` - array of width breakpoints in pixels (e.g. `[400, 800, 1200]`)
-   `ratios` - array of aspect ratios. Its length has to be one greater than `widths` array (e.g. `[16/9, 32/9, 48/9, 64/9]` along with `widths` above would result in row of proportion at most 16:9 (e.g. one 16:9 image or two 9:16, etc.) for screen widths 0-400px, 32:9 for 400-800px, etc.)
-   `percentVw` (default: 100) - percent of viewport width that gallery takes (used for image optimization, doesn't change how gallery looks)
-   `margin` (default: `"2px"`) - margin between images, needs to be valid css value (e.g. `"2px"`, `"2rem"`, etc.)
-   `imgLoader` (default: next default loader) - image loader, see [next/image](https://nextjs.org/docs/api-reference/next/image#loader)
-   `lastRowBehavior` (default: `"match-previous"`) - `"match-previous"`, `"fill"` or `"preserve"`. See [last row behavior](#last-row-behavior) section below.
-   for other props available only for certain `lastRowBehavior` values see [last row behavior](#last-row-behavior) section below.
-   `overlay` (optional) - It is a function that takes image index and returns `ReactNode` that will be rendered as overlay for every image. Overlay can be used e.g. for displaying text on top of the image or for selecting images (see example below).

```
add example here
```

## last row behavior

See [live comparison](https://next-gallery-demo.vercel.app/last-row-behavior) between `lastRowBehavior` options.

### preserve

Last row always has proportion given by `ratios` property. Images align themselves to the left and leave empty space on the right.

### fill

Last row fills whole width of the gallery. (This may cause the last row to look disproportionately high)

-   `threshold` (default: 0) - number in range [0,100] that determines when the last row should be filled. If last row would take more percent of width than `threshold`, it will be expanded to fill the remaining space. Otherwise it behaves like `preserve`. (`threshold = 0` will always fill the last row, `threshold = 100` is equivalent to `preserve`)

### match-previous

It tries to align last row to the previous one, so that some of the gaps between images in last and second last row align in a straight line.

TODO: additional props
