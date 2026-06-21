// priority: 500
RegistryOrgan('kubejs:rib_blade')
    .addScore('chestcavity:defense', 0.5)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LootContextJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RibBladeEntityLoot(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const killer = event.killerEntity
    const level = event.level
    if (!killer.isLiving() || !killer.isPlayer()) return
    if (RandomWithPlayerLuck(killer) <= 0.5) return
    let lootTable = $DespoilLootModifier.getLootTable(level, entity)
    let loot = event.loot
    let stackSplitter = $LootTable.createStackSplitter(level, (i) => {
        return loot.add(i)
    })
    let lootParams = new $LootParamsBuilder(level)
        .withParameter($LootContextParams.THIS_ENTITY, entity)
        .withParameter($LootContextParams.DAMAGE_SOURCE, event.damageSource)
        .withParameter($LootContextParams.ORIGIN, event.blockPos)
        .withOptionalParameter($LootContextParams.KILLER_ENTITY, killer)
        .withOptionalParameter($LootContextParams.DIRECT_KILLER_ENTITY, killer)
        .create($LootContextParamSets.ENTITY)

    $DespoilLootModifier.getRandomItems(lootTable, lootParams, stackSplitter)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rib_blade')
        .addOnlyStrategy('entity_loot', RibBladeEntityLoot)
)