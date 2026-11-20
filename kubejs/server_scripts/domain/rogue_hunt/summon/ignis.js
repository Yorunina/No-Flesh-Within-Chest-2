// priority: 500
const IgnisTarget = 'minecraft:blaze'

RegistryVoidArenaSummon(new VoidArenaSummonModel('cataclysm:ignis', 48)
    .setSummonId('cataclysm:ignis')
    .onEntityKilled(ctx => ctx.entity.type == IgnisTarget)
    .createBoss(ctx => ctx.level.createEntity('cataclysm:ignis'))
)
