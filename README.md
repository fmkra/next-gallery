# next-gallery

[![license](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![npm version](https://img.shields.io/badge/npm-v1.2.0-brightgreen)](https://www.npmjs.com/package/next-gallery)

Next.js component for creating responsive image gallery


![Example on desktop](assets/example_3.png?raw=true)

## Installation

```bash
npm install next-gallery
```

## Usage

```tsx
import Gallery from "next-gallery"

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

NOTE: If you are using Next.js app directory, you must mark page or component which uses `Gallery` with `use client`;

More examples in [pages](pages) folder.

## props

- `images` - array of images where every image is an object with properties:
    - `src` - image source
    - `aspect_ratio` - image aspect ratio (width / height)
    - `name` (optional) - image name (any type, but the same type for all images in array*)
    - `alt` (default: `""`) - image alt
- `widths` - array of width breakpoints in pixels (e.g. `[400, 800, 1200]`)
- `ratios` - array of aspect ratios, its length has to be bigger by one than `widths` array (e.g. `[16/9, 32/9, 48/9, 64/9]` along with `widths` above would result in row of proportion 16:9 (one 16:9 image or two 9:16, etc.) for screen widths 0-400px, 32:9 for 400-800px, etc.)
- `percentVw` (default: 100) - percent of viewport width that gallery takes (used for image optimization)
- `spanLastRow` (default: 0) - percent of width above which last row will be expanded to fill remaining space
- `margin` (default: `"2px"`) - margin between images, needs to be valid css value (e.g. `"2px"`, `"2rem"`, etc.)
- `initState` (optional) - every images keeps its own state, which can be read by overlay, this is initial state for every image (can be used e.g. for selecting images)
- `imgLoader` (default: next default loader) - image loader, see [next/image](https://nextjs.org/docs/api-reference/next/image#loader)
- `overlay` (optional) - NOTE: this property can be passed only if every image has `name` property. It is a function that takes image name, state, setState and returns React component that will be rendered as overlay for every image. Overlay can be used e.g. for displaying image name or for selecting images (see example below).
```tsx
const images: NamedImage<string>[] = [
    { src: "https://picsum.photos/id/1018/1920/1080/", aspect_ratio: 16/9, name: 1 },
    { src: "https://picsum.photos/id/1015/1920/1080/", aspect_ratio: 16/9, name: 2 },
]
const widths = [ 500, 1000, 1600 ]
const ratios = [ 2.2, 4, 6, 8 ]

export default function() {
    return <Gallery {...{images, widths, ratios}} initState={false} overlay={(name, state, setState) => <MyOverlay selected={state} onClick={() => setState(s => !s)} />} />
}
```

(*) types can be mixed but then array of images has to be explicitly declared with `NamedImage[]` type (see example:)
```tsx
const images: NamedImage<string|number>[] = [
    { src: "https://picsum.photos/id/1018/1920/1080/", aspect_ratio: 16/9, name: "image1" },
    { src: "https://picsum.photos/id/1015/1920/1080/", aspect_ratio: 16/9, name: 2 },
]
```