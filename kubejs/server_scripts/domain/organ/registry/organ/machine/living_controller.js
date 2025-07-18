// priority: 500
RegistryOrgan('kubejs:living_controller')
    .addScore('chestcavity:health', -0.5)
    .addScore('kubejs:magic_capacity', -3)

/**
 * 
 * @param {Internal.ServerLevel} level 
 * @param {Internal.ItemStack} organItem 
 * @returns 
 */
function GetRemoteControlTarget(level, organItem) {
    if (!organItem.hasNBT()) return
    let nbt = organItem.getNbt()
    if (!nbt.contains('bindEntity')) return
    let bindEntityNbt = nbt.getCompound('bindEntity')
    let targetUuid = bindEntityNbt.getUUID('uuid')
    return level.getEntity(targetUuid)
}

ItemEvents.entityInteracted('kubejs:living_controller', event => {
    const target = event.target
    const item = event.item
    let nbt = item.getOrCreateTag()
    if (target instanceof $PathfinderMob && !target.isPlayer()) {
        let bindEntityNbt = new $CompoundTag()
        bindEntityNbt.putUUID('uuid', target.getUuid())
        bindEntityNbt.putString('name', target.name.getString())
        nbt.put('bindEntity', bindEntityNbt)
        item.setNbt(nbt)
    }
})