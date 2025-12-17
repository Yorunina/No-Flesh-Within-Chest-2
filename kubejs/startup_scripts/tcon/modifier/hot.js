TConJSEvents.modifierRegistry((event) => {
    event.createNew("hot", (builder) => {
      builder.onEquip((view, lvl, context) => {
        context.entity.secondsOnFire = 20 * lvl
      })
    })
  })  