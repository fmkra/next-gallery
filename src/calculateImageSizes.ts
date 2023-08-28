export interface Image {
    src: string
    aspect_ratio: number
    alt?: string
}

export interface GalleryCalculationProps {
    ratios: number[]
    images: Image[]
    spanLastRow?: number
}

export const calculateImageSizes = ({ ratios, images }: GalleryCalculationProps) => {
    const sizes: number[][] = Array.from({ length: images.length }, () => [])
    const wl: number[] = []
    for (const ratio_index in ratios) {
        const desired_ratio = ratios[ratio_index]
        let current_ratio = 0
        let result_width_percent: number[] = []
        let second_last_row_start = 0
        for (let i = 0; i < images.length; i++) {
            if (current_ratio + images[i].aspect_ratio <= desired_ratio) {
                current_ratio += images[i].aspect_ratio
            } else {
                second_last_row_start = result_width_percent.length
                for (let j = result_width_percent.length; j < i; j++) {
                    result_width_percent.push(Math.floor((images[j].aspect_ratio / current_ratio) * 1000) / 10)
                }
                current_ratio = images[i].aspect_ratio
            }
        }
        const second_last_row = result_width_percent.slice(second_last_row_start)
        for (let i = 1; i < second_last_row.length; i++) second_last_row[i] += second_last_row[i - 1]
        second_last_row.push(100)
        let second_last_row_i = 0

        const last_row_start = result_width_percent.length
        let last_row_ratio = 0
        const last_row_multipliers: number[] = []
        for (let i = result_width_percent.length; i < images.length; i++) {
            const r = Math.floor((images[i].aspect_ratio / desired_ratio) * 1000) / 10
            result_width_percent.push(r)
            last_row_ratio += r
            while (second_last_row[second_last_row_i] < last_row_ratio) second_last_row_i++
            last_row_multipliers.push(second_last_row[second_last_row_i] / last_row_ratio)
        }
        const last_row = result_width_percent.slice(last_row_start)

        console.log(second_last_row, last_row)
        console.log(last_row_multipliers)
        for (let i = last_row_start; i < result_width_percent.length; i++) {
            result_width_percent[i] *= Math.min(...last_row_multipliers)
        }

        for (const i in result_width_percent) {
            sizes[i].push(result_width_percent[i])
        }
        wl.push(0)
    }
    return [sizes, wl] as const
}
