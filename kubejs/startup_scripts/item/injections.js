// priority: 1000
// 胸腔注射器
/**
 * 
 * @param {Registry.Item} event 
 * @param {*} typeName 
 * @param {*} typeLocation 
 */
function RegistryChestCavityInjection(event, typeName, typeLocation) {
    event.create(`${typeName}_injection`).maxStackSize(1).texture(`kubejs:item/injections/${typeName}_injection`)
        .useDuration(itemStack => 65)
        .useAnimation('none')
        .use((level, player, hand) => {
            if (level.isClientSide()) return true
            if (player.isPlayer()) {
                player.triggerAnimation('kubejs:inject_animation', 3.25, 'linear', true, false)
            }
            return true
        })
        .releaseUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            if (entity.isPlayer()) {
                entity.stopAnimation('kubejs:inject_animation')
            }
            return itemstack
        })
        .finishUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return Item.empty
            entity.chestCavityInstance.setInventoryType(typeLocation)
            return Item.empty
        })
}


StartupEvents.registry('item', event => {
    RegistryChestCavityInjection(event, 'revolution_machine', 'kubejs:cc_inventory_types/revolution_machine')
    RegistryChestCavityInjection(event, 'functional_entity', 'kubejs:cc_inventory_types/functional_entity')
    RegistryChestCavityInjection(event, 'gula', 'kubejs:cc_inventory_types/gula')
    RegistryChestCavityInjection(event, 'rose', 'kubejs:cc_inventory_types/rose')
    RegistryChestCavityInjection(event, 'player_13', 'kubejs:cc_inventory_types/player_13')
    RegistryChestCavityInjection(event, 'player_21', 'kubejs:cc_inventory_types/player_21')
    RegistryChestCavityInjection(event, 'player_25', 'kubejs:cc_inventory_types/player_25')
    RegistryChestCavityInjection(event, 'player_27', 'kubejs:cc_inventory_types/player_27')
})