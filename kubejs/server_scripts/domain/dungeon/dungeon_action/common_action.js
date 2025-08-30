// priority: 2999
/**
 * 
 * @param {Internal.PathfinderMob} entity 
 * @param {DungeonAttributeModel} dungeonAttr 
 * @returns 
 */
function CommonDungeonEntityCreate(level, context, areaManager, entity, dungeonAttr) {
    const attributes = entity.getAttributes()
    const difficulty = dungeonAttr.getDifficulty()
    if (attributes.hasAttribute('minecraft:generic.max_health')) {
        entity.setAttributeBaseValue('minecraft:generic.max_health', Math.floor(entity.getAttribute('minecraft:generic.max_health').getValue() * Math.pow(1.2, dungeonAttr.getDifficulty())))
        entity.setHealth(entity.getMaxHealth())
    }
    if (attributes.hasAttribute('minecraft:generic.attack_damage')) {
        entity.setAttributeBaseValue('minecraft:generic.attack_damage', Math.floor(entity.getAttribute('minecraft:generic.attack_damage').getValue() * (1 + difficulty * 0.05)))
    }
    ApplyCreateEntityModifier(level, context, areaManager, entity, dungeonAttr)
    DungeonCreateEntity(level, context, entity)
}



/**
 * 
 * @param {Internal.Level} level 
 * @param {Internal.SpawnMobAreaKubeEvent} context 
 * @param {LoquatAreaManager} areaManager 
 * @param {Boolean} isWin 
 */
function CommonDungeonFinishAction(level, context, areaManager, isWin) {
    const area = context.area

    ClearEntityRemainInArea(level, area)
    let playerList = GetAreaPlayerList(level, area)
    const dungeonAttr = GetDungeonAttribute(context)
    const difficulty = dungeonAttr.getDifficulty()

    if (isWin) {
        const lootLevel = Math.min(Math.floor(difficulty / 10), 10)
        let lootPlayer = GetLuckestLootPlayer(playerList)

        let lootList = Utils.rollChestLoot(`kubejs:dungeon_loot/common_${lootLevel}`, lootPlayer)
        ApplyLootModifier(level, context, areaManager, lootList, dungeonAttr)
        SpawnDungeonLoot(level, area, lootList)

        playerList.forEach(player => {
            // todo 本地化
            player.tell('§c§l波次成功')
            level.playSound(null, player.getX(), player.getY(), player.getZ(), 'entity.player.levelup', player.getSoundSource(), 0.5, 1)
        })
    } else {
        playerList.forEach(player => {
            // todo 本地化
            player.tell('§c§l波次失败')
            level.playSound(null, player.getX(), player.getY(), player.getZ(), 'item.trident.thunder', player.getSoundSource(), 0.5, 1)
        })
    }
}


/**
 * 获取幸运值最高的玩家
 * @param {Internal.ServerPlayer[]} playerList 
 */
function GetLuckestLootPlayer(playerList) {
    let lootPlayer = null
    if (playerNum > 0) {
        let maxLuck = InfinityNegative
        playerList.forEach(player => {
            if (player.getLuck() > maxLuck) {
                maxLuck = player.getLuck()
                lootPlayer = player
            }
        })
    }
    return lootPlayer
}