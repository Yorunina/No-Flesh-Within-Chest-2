// priority: 800
/**
 * 
 * @param {String} target 
 * @param {Internal.ItemStack_[]} ingredients 
 */
function WishingFountainDeposit(target, ingredients) {
    this.type = 'wishing_fountain:wishing_fountain_recipe'
    this.ingredients = []
    ingredients.forEach((ingredient, index) => {
        this.ingredients.push({
            'item': ingredient,
        })
    })
    this.target = target
    this.wish_type = 'lods'
}

ServerEvents.highPriorityData(event => {
    function RegistryCustomRecipe(id, recipeModel) {
        event.addJson(`kubejs:recipes/wishing_fountain/${id}.json`, recipeModel)
    }

    RegistryCustomRecipe('amethyst',new WishingFountainDeposit(
        'amethyst',
        ['minecraft:amethyst_shard', 'minecraft:iron_ingot']
    ))
    RegistryCustomRecipe('coal', new WishingFountainDeposit(
        'coal',
        ['minecraft:coal', 'minecraft:iron_ingot']
    ))
    RegistryCustomRecipe('cobalt', new WishingFountainDeposit(
        'cobalt',
        ['tconstruct:cobalt_ingot', 'minecraft:iron_ingot']
    ))
    RegistryCustomRecipe('copper', new WishingFountainDeposit(
        'copper',
        ['minecraft:copper_ingot', 'minecraft:iron_ingot']
    ))
    RegistryCustomRecipe('diamond', new WishingFountainDeposit(
        'diamond',
        ['minecraft:diamond', 'minecraft:iron_ingot']
    ))
    RegistryCustomRecipe('emerald', new WishingFountainDeposit(
        'emerald',
        ['minecraft:emerald', 'minecraft:iron_ingot']
    ))
    RegistryCustomRecipe('gold', new WishingFountainDeposit(
        'gold',
        ['minecraft:gold_ingot', 'minecraft:iron_ingot']
    ))
    RegistryCustomRecipe('iron', new WishingFountainDeposit(
        'iron',
        ['minecraft:iron_block', 'minecraft:iron_ingot']
    ))
    RegistryCustomRecipe('lapis', new WishingFountainDeposit(
        'lapis',
        ['minecraft:lapis_lazuli', 'minecraft:iron_ingot']
    ))
    RegistryCustomRecipe('redstone', new WishingFountainDeposit(
        'redstone',
        ['minecraft:redstone', 'minecraft:iron_ingot']
    ))
    RegistryCustomRecipe('zinc', new WishingFountainDeposit(
        'zinc',
        ['create:zinc_ingot', 'minecraft:iron_ingot']
    ))
})