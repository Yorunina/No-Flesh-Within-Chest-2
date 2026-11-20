// priority: 500
const SandwormTarget = 'minecraft:husk'

RegistryVoidArenaSummon(new VoidArenaSummonModel('block_factorys_bosses:sandworm', 40)
    .setSummonId('block_factorys_bosses:sandworm')
    .onEntityKilled(ctx => ctx.entity.type == SandwormTarget)
    .createBoss(ctx => ctx.level.createEntity('block_factorys_bosses:sandworm'))
)
