// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('starstone', builder => {
      builder.onDamageDealt((view, lvl, context, slot, livingTarget, damageSource, damage) => {
        const target = context.entity
        target.potionEffects.add('minecraft:haste', 20 * 5 * lvl, lvl, false, false)
      })
    })
  })