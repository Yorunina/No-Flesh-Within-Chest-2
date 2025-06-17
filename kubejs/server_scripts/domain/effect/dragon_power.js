// priority: 800
/**
 * 
 * @param {Internal.LivingDamageEvent} event 
 * @param {OrganEventCustomData} customData 
 */
function DragonPowerEntityBeHurt(event, customData) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    if (!entity.isPlayer()) return
    if (!entity.hasEffect('kubejs:dragon_power')) return
    let dragonPowerEffect = entity.getEffect('kubejs:dragon_power')
    let amplifier = dragonPowerEffect.getAmplifier()
    let curAbsorption = entity.absorptionAmount + amplifier + 2
    if (curAbsorption > entity.maxHealth * 3) curAbsorption = entity.maxHealth * 3
    entity.absorptionAmount = curAbsorption
}