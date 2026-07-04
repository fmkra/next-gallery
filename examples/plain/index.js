const { calculateImageSizes } = require('next-gallery')

const images = [
    { src: 'image-1.jpg', aspect_ratio: 16 / 9 },
    { src: 'image-2.jpg', aspect_ratio: 4 / 3 },
    { src: 'image-3.jpg', aspect_ratio: 1 },
    { src: 'image-4.jpg', aspect_ratio: 3 / 4 },
    { src: 'image-5.jpg', aspect_ratio: 21 / 9 },
]

const ratios = [2.2, 4, 6]
const [sizes, widthLeft] = calculateImageSizes({
    images,
    ratios,
    lastRowBehavior: 'match-previous',
})

console.log('Calculated image widths:')
images.forEach((image, imageIndex) => {
    const widths = sizes[imageIndex].map((width, ratioIndex) => `${width}% at ratio ${ratios[ratioIndex]}`)
    console.log(`- ${image.src}: ${widths.join(', ')}`)
})

console.log('\nRemaining row width:')
widthLeft.forEach((width, ratioIndex) => {
    console.log(`- ratio ${ratios[ratioIndex]}: ${width}%`)
})
