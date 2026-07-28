// priority: 849
/**
 * 上球壳表面生成竹子
 * @type {SphereDecoratorModel}
 */
const UpShellBambooDecorator = new SphereDecoratorModel(
    'shell',
    (level, sphere, offset) => {
        return RandomChance(0.05) && IsUpShell(offset) && IsUpEmptyWithinHeight(level, sphere, offset, 1)
    }, 
    (level, sphere, offset) => {
        return GenBamboo(level, sphere, offset)
    }
)


const FlowerList = ['minecraft:lilac', 'minecraft:rose_bush', 'minecraft:peony', 'minecraft:lily_of_the_valley', 'minecraft:sunflower', 'minecraft:poppy', 'minecraft:allium', 'minecraft:white_tulip', 'minecraft:grass', 'minecraft:dandelion', 'minecraft:blue_orchid', 'minecraft:azure_bluet', 'minecraft:red_tulip', 'minecraft:orange_tulip', 'minecraft:pink_tulip', 'minecraft:oxeye_daisy', 'minecraft:cornflower']

/**
 * 上球壳表面生成花
 * @type {SphereDecoratorModel}
 */
const UpShellFlowerDecorator = new SphereDecoratorModel(
    'shell',
    (level, sphere, offset) => {
        return RandomChance(0.2) && IsUpShell(offset) && IsUpEmptyWithinHeight(level, sphere, offset, 2)
    }, 
    (level, sphere, offset) => {
        return GenFlower(level, sphere, offset)
    }
)


/**
 * 上球壳表面生成花
 * @type {SphereDecoratorModel}
 */
const RingFlowerDecorator = new SphereDecoratorModel(
    'ring',
    (level, sphere, offset) => {
        return RandomChance(0.2) && IsUpEmptyWithinHeight(level, sphere, offset, 2)
    }, 
    (level, sphere, offset) => {
        return GenFlower(level, sphere, offset)
    }
)

const GlobalSetBiomeDecorator = new SphereDecoratorModel(
    'global', 
    (level, sphere) => {
        return true
    },
    (level, sphere) => {
        return GlobalSetBiomeAction(level, sphere, 'minecraft:plains')
    }
)

