// priority: 500
/**
 * @param {Object} customData
 * @param {Internal.LivingDeathEvent} event
 */
function DevourEntityKill(customData, event, effectSource) {
    let sourceEntity = event.source.actual
    if (!sourceEntity || !sourceEntity.isLiving()) return

    if (effectSource.level <= 0) return

    let target = event.entity
    if (effectSource.efficiency > 0 && target.maxHealth < effectSource.efficiency) return
    let level = target.level

    let VIGOR_ID = 'irons_spellbooks:vigor'
    let inst = sourceEntity.getEffect(VIGOR_ID)
    let curAmp = inst ? inst.getAmplifier() : -1
    if (sourceEntity.maxHealth >= 4 * (curAmp + 1) + 2 * effectSource.level) {
        sourceEntity.potionEffects.add(VIGOR_ID, 3600, curAmp + effectSource.level, false, true)
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
        .addOnlyStrategy('entity_kill', DevourEntityKill)
)
