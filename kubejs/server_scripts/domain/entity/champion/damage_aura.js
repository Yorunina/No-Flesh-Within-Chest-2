// priority: 500
const ChampionDamageAuraAttackUpUUID = UUID.fromString('C83F4E9C-9529-4498-A9AB-74D4CEE40A67')
const ChampionDamageAuraAttackUpIdentifier = 'ChampionDamageAuraAttackUp'
/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.LivingEvent$LivingTickEvent} event 
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionDamageAuraEntityTick(customData, event, championKey, championLevel) {
    ApplyAuraEffect(event.entity, 16,
        (mob) => !mob.isPlayer() && mob.isMonster() && mob.isAlive(),
        (mob) => {
            let attribute = mob.getAttribute('minecraft:generic.attack_damage')
            if (!attribute) return
            attribute.addPermanentModifier(new $AttributeModifier(
                ChampionDamageAuraAttackUpUUID,
                ChampionDamageAuraAttackUpIdentifier,
                championLevel * 0.5,
                $Operation.MULTIPLY_BASE))
        },
        (mob) => {
            let attribute = mob.getAttribute('minecraft:generic.attack_damage')
            if (!attribute) return
            attribute.removePermanentModifier(ChampionDamageAuraAttackUpUUID)
        },
        'auraMobsDamage'
    )
}

/**
 * @param {ChampionEventCustomData} customData
 * @param {Internal.LivingEntityDeathEventJS} event 
 * @param {string} championKey
 * @param {number} championLevel
 */
function ChampionDamageAuraEntityDeath(customData, event, championKey, championLevel) {
    RemoveAuraEffect(event.entity,
        (mob) => {
            let attribute = mob.getAttribute('minecraft:generic.attack_damage')
            if (!attribute) return
            attribute.removePermanentModifier(ChampionDamageAuraAttackUpUUID)
        },
        'auraMobsDamage'
    )
}

RegistryChampionStrategy(
    new ChampionStrategyModel('damage_aura')
        .addStrategy('entity_tick', ChampionDamageAuraEntityTick)
        .addStrategy('entity_death', ChampionDamageAuraEntityDeath)
)