// priority: 800
// 探知仪式
/**
 * 
 * @param {String} id 
 * @param {String} mobs 
 * @param {String} augment 
 * @param {Number} count 
 */
function ArsScryRitual(id, augment, highlight) {
    this.type = 'ars_nouveau:scry_ritual'
    this.augment = augment
    this.highlight = highlight
    this.id = id
}

ServerEvents.highPriorityData(event => {
    function RegistryCustomRecipe(id, recipeModel) {
        event.addJson(`kubejs:recipes/ars_scry_ritual/${id}.json`, recipeModel)
    }

    // RegistryCustomRecipe('logs', new ArsScryRitual(
    //     'ars_nouveau:logs',
    //     'forge:stone',
    //     'minecraft:logs'
    // ))
})