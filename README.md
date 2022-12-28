# next-gallery

Next.js component for creating responsive image gallery

## props

- `images` - array of images where every image is an object with properties:
    - `src` - image source
    - `aspect_ratio` - image aspect ratio (width / height)
    - `name` - (optional) - image name (any type, but the same type for all images in array*)
    - `alt` (optional) - image alt (default is empty string)

    (*) types can be mixed but then variable has to be explicitly typed with `NamedImage<>`

    