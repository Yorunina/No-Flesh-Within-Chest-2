// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew("fire_armor", (builder) => {
  builder.modifyDamageTaken((view, lvl, context, slot, source, damage) => {
    const player = view.entity
    if (player && player.isOnFire()) {
      return damage * (1 - lvl * 0.08);
    } else {
      return damage
    }
  })
})
})