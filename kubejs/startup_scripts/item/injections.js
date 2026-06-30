// priority: 1000
// 胸腔注射器
RegistryChestCavityInjection('revolution_machine', 'kubejs:cc_inventory_types/revolution_machine')
RegistryChestCavityInjection('functional_entity', 'kubejs:cc_inventory_types/functional_entity')
RegistryChestCavityInjection('gula', 'kubejs:cc_inventory_types/gula')
RegistryChestCavityInjection('rose', 'kubejs:cc_inventory_types/rose')
RegistryChestCavityInjection('player_17', 'kubejs:cc_inventory_types/player_17')
RegistryChestCavityInjection('player_21', 'kubejs:cc_inventory_types/player_21')
RegistryChestCavityInjection('player_25', 'kubejs:cc_inventory_types/player_25')
RegistryChestCavityInjection('player_27', 'kubejs:cc_inventory_types/player_27')
RegistryChestCavityInjection('transdimensional_mechanized', 'kubejs:cc_inventory_types/transdimensional_mechanized')
RegistryChestCavityInjection('plant', 'kubejs:cc_inventory_types/plant')

/**
 * @param {string} typeName 
 * @param {string} typeLocation 
 */
function RegistryChestCavityInjection(typeName, typeLocation) {
    StartupEvents.registry('item', event => {
        event.create(`${typeName}_injection`).maxStackSize(1).texture(`kubejs:item/injections/${typeName}_injection`)
            .useDuration(itemStack => 65)
            .useAnimation('none')
            .use((level, player, hand) => {
                if (player instanceof $DeployerFakePlayer) return false
                if (level.isClientSide()) return true
                if (player.isPlayer()) player.triggerAnimation('kubejs:inject_animation', 3.25, 'linear', true, true)
                return true
            })
            .releaseUsing((itemstack, level, entity) => {
                if (level.isClientSide()) return itemstack
                if (entity.isPlayer()) entity.stopAnimation('kubejs:inject_animation')
                return itemstack
            })
            .finishUsing((itemstack, level, entity) => {
                if (level.isClientSide()) return Item.empty
                entity.chestCavityInstance.setInventoryType(typeLocation)
                return Item.empty
            })
    })
}

StartupEvents.registry('item', event => {
    event.create('empty_injection').maxStackSize(1).texture(`kubejs:item/injections/empty_injection`)
        .useDuration(itemStack => 65)
        .useAnimation('none')
        .use((level, player, hand) => {
            if (level.isClientSide()) return true
            let inventoryType = player.chestCavityInstance.getInventoryType()
            if (player.hasEffect('minecraft:weakness')) return false
            if (!inventoryType.getPath().startsWith('cc_inventory_types/player')) return false
            if (player.isPlayer()) player.triggerAnimation('kubejs:inject_animation', 3.25, 'linear', true, true)
            return true
        })
        .releaseUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            if (entity.isPlayer()) entity.stopAnimation('kubejs:inject_animation')
            return itemstack
        })
        .finishUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return Item.empty
            let inventoryType = entity.chestCavityInstance.getInventoryType()
            if (!inventoryType.getPath().startsWith('cc_inventory_types/player')) return itemstack
            entity.addEffect(new $MobEffectInstance('minecraft:weakness', 1200, 0, false, false, true))
            switch (inventoryType.toString()) {
                case 'kubejs:cc_inventory_types/player_17':
                    return Item.of('kubejs:player_17_injection')
                case 'kubejs:cc_inventory_types/player_21':
                    return Item.of('kubejs:player_21_injection')
                case 'kubejs:cc_inventory_types/player_25':
                    return Item.of('kubejs:player_25_injection')
                case 'kubejs:cc_inventory_types/player_27':
                    return Item.of('kubejs:player_27_injection')
            }
            return itemstack
        })
})