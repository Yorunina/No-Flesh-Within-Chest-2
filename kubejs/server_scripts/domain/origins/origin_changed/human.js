// priority: 500
RegisterOriginChangedStrategy('origins:human', HumanOriginStrategy)

/**
 * 
 * @param {any} customData 
 * @param {Internal.OriginChangedJS} event 
 */
function HumanOriginStrategy(customData, event) {
    event.player.chestCavityInstance.setInventoryType(new ResourceLocation('kubejs:cc_inventory_types/default.json'))
}