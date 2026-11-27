// priority: 500

/**
 * @param {Object} customData
 * @param {Internal.CreateArrowEventJS} event
 */
function MagicShotCreateArrow(customData, event) {
    let player = event.player
    if (!player) return
    let heldItem = event.item
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:magic_shot')
    if (effectLevel <= 0) return
    if (!player.isCrouching() && modularItem.getEffectEfficiency(heldItem, 'kubejs:magic_shot') < 1) return

    let arrow = EntityJSUtils.createArrowFrom(event.getProjectile(), 'kubejs:magic_arrow')
    arrow.persistentData.putInt('kubejs_magic_shot_level', effectLevel)
    event.setProjectile(arrow)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:magic_shot')
        .addOnlyStrategy('create_arrow', MagicShotCreateArrow)
)
