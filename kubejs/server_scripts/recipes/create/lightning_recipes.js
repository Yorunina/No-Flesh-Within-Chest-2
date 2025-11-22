// priority: 500
EntityEvents.spawned('minecraft:lightning_bolt', event => {
   const entity = event.entity
   const level = event.level
   const pos = entity.blockPosition()
   let nearbyItemEntities = GetItemEntityWithinRadius(level, pos, 1, () => true)
   nearbyItemEntities.forEach(itemEntity => {
      if (itemEntity.getItem().is('')) {

      }
   })
})