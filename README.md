# next-gallery

[![license](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![npm version](https://img.shields.io/badge/npm-v3.0.0-brightgreen)](https://www.npmjs.com/package/next-gallery)

Responsive photo gallery layout utilities with optional React and Next.js components.

The package is split into layers:

- `next-gallery` has no React or Next.js runtime dependency and exports the width calculation utilities.
- `next-gallery/react` adds the generic React gallery component.
- `next-gallery/next` adds the Next.js `next/image` gallery component.

![Example on desktop](assets/example_3.png?raw=true)

## Installation

```bash
npm install next-gallery
```

Install the peer dependencies only for the layer you use:

- `next-gallery`: no peers required.
- `next-gallery/react`: requires `react`.
- `next-gallery/next`: requires `react` and `next`.

## Layout calculations

Use the root entry point when you only need the calculated widths.

```ts
import { calculateImageSizes } from 'next-gallery'

const images = [
    { src: 'https://picsum.photos/id/1018/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/1015/1920/1080/', aspect_ratio: 16 / 9 },
]

const [sizes, widthLeft] = calculateImageSizes({
    images,
    ratios: [2.2, 4, 6, 8],
    lastRowBehavior: 'match-previous',
})
```

`sizes[i]` is the array of width percentages for `images[i]`, one value per ratio. `widthLeft` contains the remaining width for each ratio.

## React

Use `next-gallery/react` when you want the gallery layout but need to render your own image component.

```tsx
import { ReactGallery, RenderArg } from 'next-gallery/react'

const images = [
    { src: 'https://picsum.photos/id/1018/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/1015/1920/1080/', aspect_ratio: 16 / 9 },
]

const breakpoints = [500, 1000, 1600]
const ratios = [2.2, 4, 6, 8]

const render = ({ src, alt }: RenderArg) => (
    <img src={src} alt={alt ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
)

export function MyGallery() {
    return <ReactGallery images={images} breakpoints={breakpoints} ratios={ratios} render={render} />
}
```

## Next.js

Use `next-gallery/next` for the built-in `next/image` integration.

```tsx
import { NextGallery } from 'next-gallery/next'

const images = [
    { src: 'https://picsum.photos/id/1018/1920/1080/', aspect_ratio: 16 / 9 },
    { src: 'https://picsum.photos/id/1015/1920/1080/', aspect_ratio: 16 / 9 },
]

export default function Page() {
    return <NextGallery images={images} breakpoints={[500, 1000, 1600]} ratios={[2.2, 4, 6, 8]} />
}
```

`NextGallery` can be used as both a client and server component. It is usually best as a server component because the gallery dimensions are rendered through CSS variables and no layout JavaScript needs to be shipped to the browser.

## Props

- `images` - array of images where every image is an object with:
    - `src` - image source.
    - `aspect_ratio` - image aspect ratio, calculated as `width / height`.
    - `alt` - optional image alt text.
    - `nextImageProps` - `next-gallery/next` only; additional props passed to Next.js `Image`.
- `breakpoints` - array of width breakpoints in pixels, e.g. `[400, 800, 1200]`.
- `ratios` - array of row aspect ratios. Its length must be one greater than `breakpoints`.
- `gap` - React and Next only; CSS gap inset between images. Defaults to `"1px"`.
- `overlay` - React and Next only; function called as `(image, index)` and rendered above each image.
- `render` - React only; function called with the image plus calculated `sizes`.
- `percentVw` - Next only; percent of viewport width the gallery takes for image optimization. Defaults to `100`.
- `imgLoader` - Next only; image loader passed to Next.js `Image`.
- `lastRowBehavior` - `"match-previous"`, `"fill"`, or `"preserve"`. Defaults to `"match-previous"`.

## Last row behavior

See the [live comparison](https://next-gallery-demo.vercel.app/last-row-behavior) between `lastRowBehavior` options.

### preserve

The last row keeps the proportions implied by `ratios`. Images align to the left and leave empty space on the right.

### fill

The last row fills the whole gallery width. This may make the last row look disproportionately high.

- `threshold` - number in range `[0, 1]` that determines when the last row should be filled. Defaults to `0`.

### match-previous

The last row tries to align with the previous row so some image edges line up.

- `shrinkLimit` - number in range `[0, 1]` that controls how much the last row can shrink. Defaults to `0.5`.
- `growLimit` - number in range `[1, Infinity]` that controls how much the last row can grow. Defaults to `1.5`.
- `preferGrowing` - how much growing is preferred over shrinking. Defaults to `2`.

More examples are available in the `example` and `example-react` directories.
