// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('quenching', builder => {
      builder.getMeleeDamage((view, lvl, context, base, final) => {
        let attacker = context.attacker
        if (attacker && attacker.isOnFire()) {
          let multiplier = 1 + 0.2 * (1 + lvl)
          return final * multiplier
        }
        return final
      })
    })
  })