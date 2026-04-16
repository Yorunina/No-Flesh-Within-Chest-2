// priority: 4000
const InfinityNegative = -Infinity
const DeviationNum = 0.000001

const FourDirectionOffset = [[0, 1], [0, -1], [1, 0], [-1, 0]]
const EightDirectionOffset = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]
const FourDiagonalDirectionOffset = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
const EquimentSlotList = ['mainhand', 'offhand', 'head', 'chest', 'legs', 'feet']

const SourceJarMax = 10000

const Entity2EntityHeadItem = {
    'minecraft:zombie': Item.of('minecraft:zombie_head'),
    'minecraft:creeper': Item.of('minecraft:creeper_head'),
    'minecraft:skeleton': Item.of('minecraft:skeleton_head'),
    'minecraft:wither_skeleton': Item.of('minecraft:wither_skeleton_skull'),
    'minecraft:wither': Item.of('minecraft:wither_skeleton_skull'),
    'minecraft:ender_dragon': Item.of('minecraft:dragon_head'),
}