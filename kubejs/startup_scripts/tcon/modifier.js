// priority: 500
TConJSEvents.modifierRegistry(event => {
    // // 心室震颤；在造成伤害时，对对方的健康造成轻微损伤，允许突破到0以下
    // event.createNew('ventricular_fibrillation', builder => {
    //     builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
    //         const target = context.target
    //         const chestCavity = target.chestCavityInstance
    //         if (!target.isAlive() || !chestCavity) return
    //         chestCavity.setOrganScore('chestcavity:health', chestCavity.getOrganScore('chestcavity:health') - 0.01 * lvl)
    //     })
    // })
    // 薄葬
    // event.createNew('shallow_grave', builder => {
    //     builder.projectileHitBlock((toolView, data, lvl, projectile, hitResult, entity) => {
    //         entity.potionEffects.add('potioncore:revival', 20 * 3 * lvl)
    //     })
    // })
    // 胸腔活化
    // event.createNew('active_chestcavity', builder => {
    //     builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
    //         /**@type {Internal.LivingEntity} */
    //         const target = context.target
    //         const chestCavity = target.chestCavityInstance
    //         if (!chestCavity.opened) {
    //             ChestCavityUtils.openChestCavity(chestCavity)
    //         }
    //     })
    // })
})