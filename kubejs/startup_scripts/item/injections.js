// priority: 1000
// 胸腔注射器
RegistryChestCavityInjection('revolution_machine')
RegistryChestCavityInjection('functional_entity')
RegistryChestCavityInjection('gula')
RegistryChestCavityInjection('rose')
RegistryChestCavityInjection('player_17')
RegistryChestCavityInjection('player_21')
RegistryChestCavityInjection('player_25')
RegistryChestCavityInjection('player_27')
RegistryChestCavityInjection('transdimensional_mechanized')
RegistryChestCavityInjection('transdimensional_plant')
RegistryChestCavityInjection('transdimensional_rose')
RegistryChestCavityInjection('transdimensional_relics')
RegistryChestCavityInjection('plant')
RegistryChestCavityInjection('relics_awakening')

/**
 * @param {string} typeName
 */
function RegistryChestCavityInjection(typeName) {
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
                entity.chestCavityInstance.setInventoryType(`kubejs:${typeName}`)
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
            if (!inventoryType.getPath().startsWith('player')) return false
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
            if (!inventoryType.getPath().startsWith('player')) return itemstack
            entity.addEffect(new $MobEffectInstance('minecraft:weakness', 1200, 0, false, false, true))
            switch (inventoryType.toString()) {
                case 'kubejs:player_17':
                    return Item.of('kubejs:player_17_injection')
                case 'kubejs:player_21':
                    return Item.of('kubejs:player_21_injection')
                case 'kubejs:player_25':
                    return Item.of('kubejs:player_25_injection')
                case 'kubejs:player_27':
                    return Item.of('kubejs:player_27_injection')
            }
            return itemstack
        })
})
