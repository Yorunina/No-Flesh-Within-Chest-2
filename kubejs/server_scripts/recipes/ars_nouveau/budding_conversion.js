// priority: 800
// 紫晶傀儡种植紫晶时可以转换方块，支持其他母岩收集
/**
 * 
 * @param {String} id 
 * @param {String} mobs 
 * @param {String} augment 
 * @param {Number} count 
 */
function ArsBuddingConversion(id, input, result) {
    this.type = 'ars_nouveau:budding_conversion'
    this.input = input
    this.result = result
    this.id = id
}

ServerEvents.highPriorityData(event => {
    function RegistryCustomRecipe(id, recipeModel) {
        event.addJson(`kubejs:recipes/ars_budding_conversion/${id}.json`, recipeModel)
    }

    // RegistryCustomRecipe('logs', new ArsBuddingConversion(
    //     'ars_nouveau:logs',
    //     'forge:stone',
    //     'minecraft:logs'
    // ))
})