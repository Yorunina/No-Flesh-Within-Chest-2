// priority: 499
const FinalMaxHealthModifierUUID = 'D5095DD1-5A39-46D1-A4B9-3AAA81A2AC23'
const FinalAttackDamageModifierUUID = 'DBE0F5BA-8BC8-4167-871C-208AC94810A0'
const FinalArrowDamageModifierUUID = 'A1587239-B965-4301-B6C5-C73388389166'

EntityEvents.spawned(event => {
    /**@type {Internal.LivingEntity} */
    const entity = event.entity
    if (!entity || !entity.isLiving() || !entity.isMonster()) return
    const server = event.server
    if (!AStages.serverHasStage('ftb_final_timer_start', server)) return

    const entityNbt = entity.persistentData
    if (entityNbt.getBoolean('after_spawned')) return

    const spawnProp = server.persistentData.getCompound('finalMobSpawnProp')
    if (!spawnProp) return
    if (AStages.serverHasStage('ftb_final_iteration_30', server)) {
        let maxHealthAttr = entity.getAttribute('minecraft:generic.max_health')
        if (maxHealthAttr) {
            maxHealthAttr.addPermanentModifier(new $AttributeModifier(FinalMaxHealthModifierUUID, 'FinalMaxHealthModifier', spawnProp.getFloat('healthMult'), 'multiply_total'))
        }
        let attackDamageAttr = entity.getAttribute('minecraft:generic.attack_damage')
        if (attackDamageAttr) {
            attackDamageAttr.addPermanentModifier(new $AttributeModifier(FinalAttackDamageModifierUUID, 'FinalAttackDamageModifier', spawnProp.getFloat('attackAdd'), 'addition'))
        }
        let arrowDamageAttr = entity.getAttribute('attributeslib:arrow_damage')
        if (arrowDamageAttr) {
            arrowDamageAttr.addPermanentModifier(new $AttributeModifier(FinalArrowDamageModifierUUID, 'FinalArrowDamageModifier', spawnProp.getFloat('attackAdd'), 'addition'))
        }
    } else if (AStages.serverHasStage('ftb_final_iteration_5', server)) {
        let maxHealthAttr = entity.getAttribute('minecraft:generic.max_health')
        if (maxHealthAttr) {
            maxHealthAttr.addPermanentModifier(new $AttributeModifier(FinalMaxHealthModifierUUID, 'FinalMaxHealthModifier', spawnProp.getFloat('healthMult'), 'multiply_total'))
        }
        let attackDamageAttr = entity.getAttribute('minecraft:generic.attack_damage')
        if (attackDamageAttr) {
            attackDamageAttr.addPermanentModifier(new $AttributeModifier(FinalAttackDamageModifierUUID, 'FinalAttackDamageModifier', spawnProp.getFloat('attackAdd'), 'addition'))
        }
        let arrowDamageAttr = entity.getAttribute('attributeslib:arrow_damage')
        if (arrowDamageAttr) {
            arrowDamageAttr.addPermanentModifier(new $AttributeModifier(FinalArrowDamageModifierUUID, 'FinalArrowDamageModifier', spawnProp.getFloat('attackAdd'), 'addition'))
        }
    }

    entityNbt.putBoolean('after_spawned', true)
})