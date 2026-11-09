// priority: 500

/**
 * @param {Object} customData
 * @param {Internal.LivingDeathEvent} event
 */
function DevourEntityKill(customData, event) {
    if (event.entity.level.isClientSide()) return
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isLiving()) return

    let heldItem = TetraAttackItem(event, sourceEntity)
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:devour')
    if (effectLevel <= 0) return

    let target = event.entity
    let effectEfficiency = modularItem.getEffectEfficiency(heldItem, 'kubejs:devour')
    if (effectEfficiency > 0 && target.maxHealth < effectEfficiency) return
    let level = target.level

    let VIGOR_ID = 'irons_spellbooks:vigor'
    let inst = sourceEntity.getEffect(VIGOR_ID)
    let curAmp = inst ? inst.getAmplifier() : -1
    if (sourceEntity.maxHealth >= 4 * (curAmp + 1) + 2 * effectLevel) {
        sourceEntity.potionEffects.add(VIGOR_ID, 3600, curAmp + effectLevel, false, true)
    } else if (inst) {
        sourceEntity.potionEffects.add(VIGOR_ID, 3600, curAmp, false, true)
    }

    let spawnJaw = (pos) => {
        let jaw = new $DevourJaw(level, sourceEntity, null)
        jaw.setPos(pos.add(0, -0.25, 0))
        jaw.setDamage(0)
        level.addFreshEntity(jaw)
    }
    let isBoss = target.entityType.is(RelicsBossTagKey) || target.entityType.is(RelicsBossPartTagKey)
    if (isBoss) {
        let bossCenter = target.position()
        let hexR = 1.5
        let sqrt3 = 1.7320508
        let offsets = [[0, 0],
            [hexR, 0], [hexR / 2, hexR * sqrt3 / 2], [-hexR / 2, hexR * sqrt3 / 2],
            [-hexR, 0], [-hexR / 2, -hexR * sqrt3 / 2], [hexR / 2, -hexR * sqrt3 / 2]]
        for (let i = 0; i < offsets.length; i++) {
            spawnJaw(bossCenter.add(offsets[i][0], 0, offsets[i][1]))
        }
    } else {
        spawnJaw(target.position())
    }
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:devour')
        .addStrategy('entity_kill_before', DevourEntityKill)
)
