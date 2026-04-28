// priority: 499
const FinalMaxHealthModifierUUID = UUID.fromString('D5095DD1-5A39-46D1-A4B9-3AAA81A2AC23')
const FinalMaxHealthModifierIdentifier = 'FinalMaxHealthModifier'
const FinalAttackDamageModifierUUID = UUID.fromString('DBE0F5BA-8BC8-4167-871C-208AC94810A0')
const FinalAttackDamageModifierIdentifier = 'FinalAttackDamageModifier'
const FinalArrowDamageModifierUUID = UUID.fromString('A1587239-B965-4301-B6C5-C73388389166')
const FinalArrowDamageModifierIdentifier = 'FinalArrowDamageModifier'


EntityEvents.spawned(event => {
    /**@type {Internal.LivingEntity} */
    const entity = event.entity
    if (!entity || !entity.isLiving() || !entity.isMonster()) return
    const server = event.server
    if (!AStages.serverHasStage(FTBFinalTimerStart, server)) return

    const entityNbt = entity.persistentData
    if (entityNbt.getBoolean('after_spawned')) return

    const spawnProp = server.persistentData.getCompound('finalMobSpawnProp')
    if (!spawnProp || spawnProp.isEmpty()) return

    let maxHealthAttr = entity.getAttribute('minecraft:generic.max_health')
    if (maxHealthAttr) {
        maxHealthAttr.addPermanentModifier(new $AttributeModifier(FinalMaxHealthModifierUUID, FinalMaxHealthModifierIdentifier, spawnProp.getFloat('healthMult'), 'multiply_total'))
        entity.heal(entity.getMaxHealth())
    }
    let attackDamageAttr = entity.getAttribute('minecraft:generic.attack_damage')
    if (attackDamageAttr) {
        attackDamageAttr.addPermanentModifier(new $AttributeModifier(FinalAttackDamageModifierUUID, FinalAttackDamageModifierIdentifier, spawnProp.getFloat('attackAdd'), 'addition'))
    }
    let arrowDamageAttr = entity.getAttribute('attributeslib:arrow_damage')
    if (arrowDamageAttr) {
        arrowDamageAttr.addPermanentModifier(new $AttributeModifier(FinalArrowDamageModifierUUID, FinalArrowDamageModifierIdentifier, spawnProp.getFloat('attackAdd'), 'addition'))
    }

    entityNbt.putBoolean('after_spawned', true)
})