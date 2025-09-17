// priority: 800
// 附魔装置
/**
 * @param {String} id 
 * @param {String} pedestalItems 
 * @param {String} output 
 * @param {String} reagent 
 * @param {Number} sourceCost 
 */
function ArsEnchantingApparatus(pedestalItems, output, reagent, sourceCost) {
    this.type = 'ars_nouveau:enchanting_apparatus'
    this.keepNbtOfReagent = false
    this.pedestalItems = pedestalItems
    this.output = output
    this.reagent = reagent
    this.sourceCost = sourceCost
}

ArsEnchantingApparatus.prototype.setKeepNbtOfReagent = function (keepNbtOfReagent) {
    this.keepNbtOfReagent = keepNbtOfReagent
    return this
}

ServerEvents.highPriorityData(event => {
    function RegistryCustomRecipe(id, recipeModel) {
        event.addJson(`kubejs:recipes/ars_enchanting_apparatus/${id}.json`, recipeModel)
    }

    // RegistryCustomRecipe('dirt', new ArsEnchantingApparatus(
    //     [
    //         {
    //             "item": "minecraft:stone"
    //         },
    //         {
    //             "item": "minecraft:stone"
    //         },
    //         {
    //             "item": "minecraft:stone"
    //         }
    //     ],
    //     { 'item': 'minecraft:stone' },
    //     [
    //         {
    //             "item": "minecraft:dirt"
    //         }
    //     ],
    //     0
    // ))
})