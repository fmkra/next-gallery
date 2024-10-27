## 1.2.0

### Added new propery `spanLastRow`

Property of type `number` (default is 0), should be in range [0,100]. Allows to set when the last row should leave remaining space empty instead of filling it with images. If last row would take more percent of width than `spanLastRow`, it will be expanded to fill the remaining space.

## 2.0.0

### Moved resize handling from JS to CSS

Image dimensions are now determined in the initial component render and stored in CSS variables. It allows to server render the component with images of proper dimensions. If the Gallery component is used as a **Server Component**, it is shipped to the user with 0kB of JS.

### Removed all state logic

Including `initialState` property as well as `state` and `setState` arguments of `overlay` function if favor of user defined state management (for example using react context API).

### Removed `name` optional attribute of `images` property

Also changed first (and now only) overlay function argument from `name` to `index` which is the element index in `images` array.

### Removed `spanLastRow` property in favor of `lastRowBehavior`

## 2.0.1 / 2.0.2

### Fixed documentation

### Removed unused files

## 2.0.3

### Fixed documentation

In version `2.0.0` property `margin` was renamed to `gap` but documentation was not updated.

## 2.1.0

### Add `nextImageProps` to `Image` type

`Image` type now has additional property `nextImageProps` which allows to pass additional props to nextjs' `Image` component

## 2.1.1

### Fix invalid size calculation for next Image component

## 3.0.0

### Rename `Gallery` to `NextGallery`

### Rename `widths` prop to `breakpoints`

### Add support for non-Next.js React frameworks

Library can now be used without Next Image in React only apps using `ReactGallery` component.

`ReactGallery` accepts same props as `NextGallery` except it does not have `percentVw` and `imgLoader`, but requires `render` prop instead. `render` is a function that takes `RenderArg` as an argument, which is an `Image` object (one that you provide in `images` array) extended with `sizes` key. `sizes` is an array of numbers, in which `i`-th value is percent of width that an image should occupy above breakpoint `breakpoints[i-1]` (or below first breakpoint when `i=0`)

### Change arguments of `overlay` functions

Change signature of `overlay` from `(index: number)` to `(image: Image<ExtraArgs>, index: number)`.

We advise to change overlay logic from index based to `ExtraArgs`, e.g.

Before:

```jsx
const images = [
    { src: '...', aspect_ratio: 16/9 },
    // --- more ---
]

const captions = [
    'Image 1 caption',
    // --- more ---
]

const overlay = (index: number) => (<p>{captions[index]}</p>)

export const MyComponent = () => (
    <Gallery images={images} overlay={overlay} {/* ... */} />
)
```

After:

```jsx
const images = [
    { src: '...', aspect_ratio: 16/9, extraArgs: 'Image 1 caption' },
    // --- more ---
]

type Image = (typeof images)[number]

const overlay = (image: Image) => (<p>{image.extraArgs}</p>)

export const MyComponent = () => (
    <NextGallery images={images} overlay={overlay} {/* ... */} />
)
```
