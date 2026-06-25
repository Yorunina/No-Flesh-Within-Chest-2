// priority: 4000
const InfinityNegative = -Infinity
const DeviationNum = 0.000001

const FourDirectionOffset = [[0, 1], [0, -1], [1, 0], [-1, 0]]
const EightDirectionOffset = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]
const FourDiagonalDirectionOffset = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
const EquimentSlotList = ['mainhand', 'offhand', 'feet', 'legs', 'chest', 'head']

const SourceJarMax = 10000

const Entity2EntityHeadItem = {
    'minecraft:zombie': Item.of('minecraft:zombie_head'),
    'minecraft:creeper': Item.of('minecraft:creeper_head'),
    'minecraft:skeleton': Item.of('minecraft:skeleton_head'),
    'minecraft:wither_skeleton': Item.of('minecraft:wither_skeleton_skull'),
    'minecraft:wither': Item.of('minecraft:wither_skeleton_skull'),
    'minecraft:ender_dragon': Item.of('minecraft:dragon_head'),
}

const DyeRGBRatioConfig = {
    'minecraft:white_dye': { r: 0.3, g: 0.3, b: 0.4 },
    'minecraft:light_gray_dye': { r: 0.3, g: 0.4, b: 0.3 },
    'minecraft:gray_dye': { r: 0.4, g: 0.3, b: 0.3 },
    'minecraft:black_dye': { r: 0.3, g: 0.3, b: 0.4 },
    'minecraft:brown_dye': { r: 0.5, g: 0.3, b: 0.2 },
    'minecraft:red_dye': { r: 1.0, g: 0.0, b: 0.0 },
    'minecraft:orange_dye': { r: 0.7, g: 0.3, b: 0.0 },
    'minecraft:yellow_dye': { r: 0.5, g: 0.5, b: 0.0 },
    'minecraft:lime_dye': { r: 0.3, g: 0.7, b: 0.0 },
    'minecraft:green_dye': { r: 0.0, g: 1.0, b: 0.0 },
    'minecraft:cyan_dye': { r: 0.0, g: 0.5, b: 0.5 },
    'minecraft:light_blue_dye': { r: 0.2, g: 0.3, b: 0.5 },
    'minecraft:blue_dye': { r: 0.0, g: 0.0, b: 1.0 },
    'minecraft:purple_dye': { r: 0.5, g: 0.0, b: 0.5 },
    'minecraft:magenta_dye': { r: 0.7, g: 0.0, b: 0.3 },
    'minecraft:pink_dye': { r: 0.5, g: 0.3, b: 0.2 },
}