export interface Image {
    src: string
    aspect_ratio: number
    alt?: string
}

type LastRowBehaviorMatchPrevious = {
    lastRowBehavior: 'match-previous'
    shrinkLimit?: number // default: 0.5, 1 disables shrinking
    growLimit?: number // default: 1.5, 1 disables growing
}

type LastRowBehaviorPreserve = {
    lastRowBehavior: 'preserve'
}

type LastRowBehaviorFill = {
    lastRowBehavior: 'fill'
    threshold?: number // deafult: 0, above what percentage of last row being filled, it should stretch to the full width of the screen
}

export type GalleryCalculationProps = {
    ratios: number[]
    images: Image[]
} & (LastRowBehaviorMatchPrevious | LastRowBehaviorPreserve | LastRowBehaviorFill)

function round(number: number) {
    return Math.floor(number * 10000) / 100
}

export const calculateImageSizes = (arg: GalleryCalculationProps) => {
    const sizes: number[][] = Array.from({ length: arg.images.length }, () => [])
    const wl: number[] = []
    for (const desired_ratio of arg.ratios) {
        let current_ratio = 0
        let result_width_percent: number[] = []
        let second_last_row_start = 0
        for (let i = 0; i < arg.images.length; i++) {
            if (current_ratio + arg.images[i].aspect_ratio <= desired_ratio) {
                current_ratio += arg.images[i].aspect_ratio
            } else {
                second_last_row_start = result_width_percent.length
                const start_index = result_width_percent.length
                for (let j = start_index; j < i; j++) {
                    const rounded = round(arg.images[j].aspect_ratio / current_ratio)
                    result_width_percent.push(rounded)
                }
                current_ratio = arg.images[i].aspect_ratio
            }
        }
        const second_last_row = result_width_percent.slice(second_last_row_start)
        for (let i = 1; i < second_last_row.length; i++) second_last_row[i] += second_last_row[i - 1]
        second_last_row.push(100)
        let second_last_row_i = 0

        const last_row_start = result_width_percent.length
        let last_row_ratio = 0
        const last_row_multipliers: number[] = []
        for (let i = result_width_percent.length; i < arg.images.length; i++) {
            // last row initialy match the desired_ratio and will be rescaled
            const r = round(arg.images[i].aspect_ratio / desired_ratio)
            result_width_percent.push(r)
            last_row_ratio += r
            while (second_last_row[second_last_row_i] < last_row_ratio) second_last_row_i++
            last_row_multipliers.push(second_last_row[second_last_row_i] / last_row_ratio)
        }

        if (arg.lastRowBehavior == 'fill') {
            const multiplier = desired_ratio / current_ratio
            if (1 >= multiplier * (arg.threshold ?? 0)) {
                for (let i = last_row_start; i < result_width_percent.length; i++) {
                    result_width_percent[i] *= multiplier
                }
            }
        } else if (arg.lastRowBehavior == 'match-previous') {
            // calculate the best multiplier for the last row

            // in the worst case we will just fill the whole width with the last row
            let best_multiplier = 100 / last_row_ratio
            for (const m of last_row_multipliers) {
                if (m < best_multiplier) best_multiplier = m
            }

            for (let i = last_row_start; i < result_width_percent.length; i++) {
                result_width_percent[i] *= best_multiplier
            }
        }

        let width_left = 100
        for (let i = last_row_start; i < result_width_percent.length; i++) {
            width_left -= result_width_percent[i]
        }

        for (const i in result_width_percent) {
            sizes[i].push(result_width_percent[i])
        }
        wl.push(width_left)
    }
    return [sizes, wl] as const
}
