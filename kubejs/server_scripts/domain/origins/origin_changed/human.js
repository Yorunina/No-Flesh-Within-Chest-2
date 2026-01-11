// priority: 500
RegistryOriginChangedStrategy('origins:human', HumanOriginStrategy)

/**
 * 
 * @param {any} customData 
 * @param {Internal.OriginChangedJS} event 
 */
function HumanOriginStrategy(customData, event) {
    event.player.chestCavityInstance.setInventoryType(new ResourceLocation('kubejs:cc_inventory_types/default'))
}