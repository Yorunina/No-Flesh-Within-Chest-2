// priority: 500
const YetiTarget = 'block_factorys_bosses:frozen_skeleton'

RegistryVoidArenaSummon(new VoidArenaSummonModel('block_factorys_bosses:yeti', 36)
    .setSummonId('block_factorys_bosses:yeti')
    .onEntityKilled(ctx => ctx.entity.type == YetiTarget)
    .createBoss(ctx => ctx.level.createEntity('block_factorys_bosses:yeti'))
)
