// priority: 500
RegisterOriginChangedStrategy('origins:avian', AvianOriginStrategy)

/**
 * 
 * @param {any} customData 
 * @param {Internal.OriginChangedJS} event 
 */
function AvianOriginStrategy(customData, event) {
    event.player.chestCavityInstance.setInventoryType(new ResourceLocation('kubejs:cc_inventory_types/rose.json'))
}