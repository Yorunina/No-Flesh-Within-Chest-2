// priority: 800

/**
 * 
 * @param {Internal.LivingDamageEvent} event 
 * @param {OrganEventCustomData} customData 
 */
function SweetDreamEntityBeHurt(event, customData) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    if (!entity.isPlayer()) return
    if (!entity.hasEffect('kubejs:sweet_dream')) return
    let sweetDreamEffect = entity.getEffect('kubejs:sweet_dream')

    let curMana = magicData.getMana()
    let effectLevel = sweetDreamEffect.getAmplifier() + 1
    let needMana = event.amount * 20 / effectLevel
    if (needMana <= curMana) {
        event.amount = 0
        magicData.setMana(curMana - needMana)
    } else {
        event.amount = event.amount - (curMana * effectLevel / 20)
        magicData.setMana(0)
    }
}