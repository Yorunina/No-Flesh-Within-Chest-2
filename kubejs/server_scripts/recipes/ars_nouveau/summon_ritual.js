// priority: 800
// 不可用
/**
 * 
 * @param {String} id 
 * @param {String} mobs 
 * @param {String} augment 
 * @param {Number} count 
 */
function ArsSummonRitual(id, augment, count, mobs) {
    this.type = 'ars_nouveau:summon_ritual'
    this.augment = augment
    this.count = count
    this.mobs = mobs
    this.source = "MOB_LIST"
}

ServerEvents.highPriorityData(event => {
    function RegistryCustomRecipe(id, recipeModel) {
        event.addJson(`kubejs:recipes/ars_summon_ritual/${id}.json`, recipeModel)
    }

    // RegistryCustomRecipe('sheep', new ArsSummonRitual(
    //     'sheep',
    //     { 'item': 'minecraft:stone' },
    //     1,
    //     { 'mob': 'minecraft:sheep', 'weight': 1 }
    // ))
})