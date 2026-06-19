// priority: 500
EntityEvents.spawned(event => {
    /** @type {Internal.LivingEntity} */
    const entity = event.entity
    if (!entity || !entity.isLiving() || !entity.isMonster()) return
    const level = entity.getLevel()
    const championTypeTag = entity.persistentData.getCompound('champion') ?? new $CompoundTag()
    // const player = event.player
    // if (!player) return
    // 插入词条
    // championTypeTag.putInt('test', 1)
    entity.persistentData.put('champion', championTypeTag)

    // entity.setCustomName(Component.translatable())
    entity.setCustomNameVisible(true)
})
