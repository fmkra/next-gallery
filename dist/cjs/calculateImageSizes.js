"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateImageSizes = void 0;
function round(number) {
    return Math.floor(number * 10000) / 100;
}
const calculateImageSizes = (arg) => {
    var _a, _b, _c, _d;
    const sizes = Array.from({ length: arg.images.length }, () => []);
    const wl = [];
    for (const desired_ratio of arg.ratios) {
        let current_ratio = 0;
        let result_width_percent = [];
        let second_last_row_start = 0;
        for (let i = 0; i < arg.images.length; i++) {
            if (current_ratio + arg.images[i].aspect_ratio <= desired_ratio) {
                current_ratio += arg.images[i].aspect_ratio;
            }
            else {
                second_last_row_start = result_width_percent.length;
                const start_index = result_width_percent.length;
                for (let j = start_index; j < i; j++) {
                    const rounded = round(arg.images[j].aspect_ratio / current_ratio);
                    result_width_percent.push(rounded);
                }
                current_ratio = arg.images[i].aspect_ratio;
            }
        }
        const second_last_row = result_width_percent.slice(second_last_row_start);
        for (let i = 1; i < second_last_row.length; i++)
            second_last_row[i] += second_last_row[i - 1];
        second_last_row.push(100);
        let second_last_row_i = 0;
        const last_row_start = result_width_percent.length;
        let last_row_ratio = 0;
        const last_row_multipliers = [];
        for (let i = result_width_percent.length; i < arg.images.length; i++) {
            // last row initially match the desired_ratio and will be rescaled
            const r = round(arg.images[i].aspect_ratio / desired_ratio);
            result_width_percent.push(r);
            last_row_ratio += r;
            while (second_last_row[second_last_row_i] < last_row_ratio)
                second_last_row_i++;
            last_row_multipliers.push(second_last_row[second_last_row_i] / last_row_ratio);
            if (second_last_row_i > 0) {
                last_row_multipliers.push(second_last_row[second_last_row_i - 1] / last_row_ratio);
            }
        }
        if (arg.lastRowBehavior == 'fill') {
            const multiplier = desired_ratio / current_ratio;
            if (1 >= multiplier * ((_a = arg.threshold) !== null && _a !== void 0 ? _a : 0)) {
                for (let i = last_row_start; i < result_width_percent.length; i++) {
                    result_width_percent[i] *= multiplier;
                }
            }
        }
        else if (arg.lastRowBehavior == 'match-previous' || arg.lastRowBehavior === undefined) {
            // calculate the best multiplier for the last row
            const growLimit = (_b = arg.growLimit) !== null && _b !== void 0 ? _b : 1.5;
            const shrinkLimit = (_c = arg.shrinkLimit) !== null && _c !== void 0 ? _c : 0.5;
            const preferGrowing = (_d = arg.preferGrowing) !== null && _d !== void 0 ? _d : 2;
            // in the worst case we will just fill the whole width with the last row
            last_row_multipliers.push(100 / last_row_ratio);
            let best_multiplier = 1;
            let best_fitness = Infinity;
            for (const m of last_row_multipliers) {
                if (m >= 1) {
                    const m_fitness = m;
                    if (m > growLimit)
                        continue;
                    if (Math.abs(m_fitness) < Math.abs(best_fitness)) {
                        best_multiplier = m;
                        best_fitness = m_fitness;
                    }
                }
                else {
                    const m_fitness = preferGrowing / m;
                    if (m < shrinkLimit)
                        continue;
                    if (Math.abs(m_fitness) < Math.abs(best_fitness)) {
                        best_multiplier = m;
                        best_fitness = m_fitness;
                    }
                }
            }
            for (let i = last_row_start; i < result_width_percent.length; i++) {
                result_width_percent[i] *= best_multiplier;
            }
        }
        let width_left = 100;
        for (let i = last_row_start; i < result_width_percent.length; i++) {
            width_left -= result_width_percent[i];
        }
        for (const i in result_width_percent) {
            sizes[i].push(result_width_percent[i]);
        }
        wl.push(width_left);
    }
    return [sizes, wl];
};
exports.calculateImageSizes = calculateImageSizes;
//# sourceMappingURL=calculateImageSizes.js.map