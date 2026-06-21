// priority: 500
RegistryOrgan('kubejs:animted_soul')
    .addScore('chestcavity:health', 1)
    .addScore('chestcavity:nerves', 1)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function AnimtedSoulKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    let playerPos = player.blockPosition()
    /**@type {Internal.LivingEntity[]} */
    let playerList = GetLivingWithinRadius(level, playerPos, 10, (level, entity) => {
        return entity.isPlayer()
    })
    let playerUuid = player.getUuid()
    let target = player.lastHurtMob
    playerList.forEach(entity => {
        let nbt = new $CompoundTag()
        nbt.putString('SkullOwner', entity.getName().getString())
        let headSummon = new $AnimHeadSummon(level, Blocks.PLAYER_HEAD.defaultBlockState(), nbt)
        headSummon.setColor(entity.getTeamColor())
        headSummon.setPos(player.blockPosition())
        headSummon.setMaxHealth(Math.ceil(entity.getMaxHealth() / 2))
        headSummon.heal(headSummon.maxHealth)
        headSummon.setTicksLeft(20 * 60)
        headSummon.setAggressive(true)
        headSummon.setTarget(target)
        headSummon.setOwnerID(playerUuid)
        level.addFreshEntity(headSummon)
    })
    player.addItemCooldown(organItem, 20 * 30)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:animted_soul')
        .addOnlyStrategy('key_active', AnimtedSoulKeyActive)
)
