// priority: 500
EntityEvents.spawned('minecraft:lightning_bolt', event => {
   const entity = event.entity
   const level = event.level
   const pos = entity.blockPosition()
   let nearbyItemEntities = GetItemEntityWithinRadius(level, pos, 1, () => true)
   let brassIngotCount = 0
   let amethystShardCount = 0
   nearbyItemEntities.forEach(itemEntity => {
      if (itemEntity.getItem().is('create:brass_ingot')) {
         brassIngotCount += itemEntity.getItem().getCount()
         itemEntity.discard()
         return
      }
      if (itemEntity.getItem().is('minecraft:amethyst_shard')) {
         amethystShardCount += itemEntity.getItem().getCount()
         itemEntity.discard()
         return
      }
   })
   
   let resultCount = Math.min(brassIngotCount, amethystShardCount)
   SpawnLootAtLocation(level, pos, [Item.of('kubejs:unstable_matter', resultCount)])
   console.log(`Lightning bolt spawned at ${pos} with ${resultCount} unstable matter`)
})