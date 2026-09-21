// priority: 500

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {string} tagId
 * @param {number} count
 */
function NetherTagChestCavityUpdate(customData, event, tagId, count) {
    RemovePlayerEffectIfTag(event.entity, 'minecraft:wither', count, 3)
    RemovePlayerEffectIfTag(event.entity, 'minecraft:slowness', count, 6)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.MobEffectEvent$Applicable} event
 * @param {string} tagId
 * @param {number} count
 */
function NetherTagMobEffectApplicable(customData, event, tagId, count) {
    DenyPlayerEffectIfTag(event, $MobEffects.WITHER, count, 3)
    DenyPlayerEffectIfTag(event, $MobEffects.MOVEMENT_SLOWDOWN, count, 6)
}

RegistryTagStrategy(
    new TagStrategyModel('kubejs:nether')
        .addStrategy('chest_cavity_update', NetherTagChestCavityUpdate)
        .addStrategy('mob_effect_applicable', NetherTagMobEffectApplicable)
)