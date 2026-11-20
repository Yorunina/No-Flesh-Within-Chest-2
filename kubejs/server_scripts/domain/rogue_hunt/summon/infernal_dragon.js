// priority: 500
const InfernalDragonTarget = 'minecraft:ghast'

RegistryVoidArenaSummon(new VoidArenaSummonModel('block_factorys_bosses:infernal_dragon', 32)
    .setSummonId('block_factorys_bosses:infernal_dragon')
    .onEntityKilled(ctx => ctx.entity.type == InfernalDragonTarget)
    .createBoss(ctx => ctx.level.createEntity('block_factorys_bosses:infernal_dragon'))
)
