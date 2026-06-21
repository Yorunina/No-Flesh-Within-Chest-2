// priority: 500
RegistryOrgan('kubejs:bat_throat')
    .addScore('chestcavity:endurance', 0.5)
    .setCanSpawn(true)


/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function BatThroatKeyActive(customData, event, organItem, organIndex, slotType) {
    const level = event.level
    const player = event.player
    const entities = GetEntityWithinRadiusVec3d(level, player.position(), 16, (pLevel, pEntity) => pEntity instanceof $LivingEntity)
    entities.forEach(entity => {
        entity.potionEffects.add('minecraft:glowing', 20 * 30)
    })
    player.addItemCooldown('kubejs:bat_throat', 20 * 30)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:bat_throat')
        .addOnlyStrategy('key_active', BatThroatKeyActive)
)