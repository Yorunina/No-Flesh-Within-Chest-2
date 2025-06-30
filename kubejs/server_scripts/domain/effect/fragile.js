// priority: 800

/**
 * 脆弱效果，每层提高10%所受伤害
 * @param {Internal.LivingDamageEvent} event 
 * @param {OrganEventCustomData} customData 
 */
function FragileEntityBeHurt(event, customData) {
    const entity = event.entity
    if (!entity.hasEffect('kubejs:fragile')) return
    let fragileEffect = entity.getEffect('kubejs:fragile')
    let effectLevel = fragileEffect.getAmplifier() + 1
    event.amount = event.amount * (1 + effectLevel * 0.1)
}
