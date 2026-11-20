// priority: 500
const UnderworldKnightTarget = 'block_factorys_bosses:soul_knight_wither_skeleton'

RegistryVoidArenaSummon(new VoidArenaSummonModel('block_factorys_bosses:underworld_knight', 24)
    .setSummonId('block_factorys_bosses:underworld_knight')
    .onEntityKilled(ctx => ctx.entity.type == UnderworldKnightTarget)
    .createBoss(ctx => ctx.level.createEntity('block_factorys_bosses:underworld_knight'))
)
