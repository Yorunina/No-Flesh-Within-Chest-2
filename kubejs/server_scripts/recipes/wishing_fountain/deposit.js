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
    function registerCustomRecipe(recipeModel) {
        event.addJson(`kubejs:recipes/wishing_fountain/${recipeModel.target}.json`, recipeModel)
    }

    registerCustomRecipe(new WishingFountainDeposit(
        'amethyst',
        ['minecraft:amethyst_shard', 'minecraft:iron_ingot']
    ))
    registerCustomRecipe(new WishingFountainDeposit(
        'coal',
        ['minecraft:coal', 'minecraft:iron_ingot']
    ))
    registerCustomRecipe(new WishingFountainDeposit(
        'cobalt',
        ['tconstruct:cobalt_ingot', 'minecraft:iron_ingot']
    ))
    registerCustomRecipe(new WishingFountainDeposit(
        'copper',
        ['minecraft:copper_ingot', 'minecraft:iron_ingot']
    ))
    registerCustomRecipe(new WishingFountainDeposit(
        'diamond',
        ['minecraft:diamond', 'minecraft:iron_ingot']
    ))
    registerCustomRecipe(new WishingFountainDeposit(
        'emerald',
        ['minecraft:emerald', 'minecraft:iron_ingot']
    ))
    registerCustomRecipe(new WishingFountainDeposit(
        'gold',
        ['minecraft:gold_ingot', 'minecraft:iron_ingot']
    ))
    registerCustomRecipe(new WishingFountainDeposit(
        'iron',
        ['minecraft:iron_block', 'minecraft:iron_ingot']
    ))
    registerCustomRecipe(new WishingFountainDeposit(
        'lapis',
        ['minecraft:lapis_lazuli', 'minecraft:iron_ingot']
    ))
    registerCustomRecipe(new WishingFountainDeposit(
        'redstone',
        ['minecraft:redstone', 'minecraft:iron_ingot']
    ))
    registerCustomRecipe(new WishingFountainDeposit(
        'zinc',
        ['create:zinc_ingot', 'minecraft:iron_ingot']
    ))
})