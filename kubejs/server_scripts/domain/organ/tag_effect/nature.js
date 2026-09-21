// priority: 500

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function NatureTagChestCavityUpdate(customData, event, tagId, count) {
    RemovePlayerEffectIfTag(event.entity, 'minecraft:poison', count, 3)
    RemovePlayerEffectIfTag(event.entity, 'minecraft:hunger', count, 6)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.MobEffectEvent$Applicable} event
 * @param {string} tagId
 * @param {number} count
 */
function NatureTagMobEffectApplicable(customData, event, tagId, count) {
    DenyPlayerEffectIfTag(event, $MobEffects.POISON, count, 3)
    DenyPlayerEffectIfTag(event, $MobEffects.HUNGER, count, 6)
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:nature')
        .addStrategy('chest_cavity_update', NatureTagChestCavityUpdate)
        .addStrategy('mob_effect_applicable', NatureTagMobEffectApplicable)
)