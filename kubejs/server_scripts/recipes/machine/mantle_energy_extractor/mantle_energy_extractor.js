// priority: 501

/**
 * 
 * @param {number} baseTemp 
 * @returns {String}
 */
function ChangeBiome2LowerTemperature(baseTemp, downFall) {
    if (baseTemp >= 2) {
        return 'minecraft:stony_peaks' // 1.0, 0.3
    }
    if (downFall <= 0.5) {
        if (baseTemp > 1) {
            return RandomGet(['minecraft:plains', 'minecraft:sunflower_plains'])
        } else if (baseTemp > 0.5) {
            return RandomGet(['minecraft:stony_shore', 'minecraft:windswept_forest', 'minecraft:windswept_hills'])
        } else if (baseTemp > 0) {
            return 'minecraft:snowy_plains'
        }
    } else {
        if (baseTemp > 1) {
            return RandomGet(['minecraft:forest', 'minecraft:swamp', 'minecraft:birch_forest'])
        } else if (baseTemp > 0.5) {
            return RandomGet(['minecraft:old_growth_spruce_taiga', 'minecraft:old_growth_spruce_taiga', 'minecraft:taiga'])
        } else if (baseTemp > 0) {
            return 'minecraft:snowy_plains'
        }
    }
    return 'minecraft:snowy_taiga'
}