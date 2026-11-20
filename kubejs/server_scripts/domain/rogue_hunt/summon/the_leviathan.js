// priority: 500
const TheLeviathanTarget = 'cataclysm:deepling'

RegistryVoidArenaSummon(new VoidArenaSummonModel('cataclysm:the_leviathan', 48)
    .setSummonId('cataclysm:the_leviathan')
    .onEntityKilled(ctx => ctx.entity.type == TheLeviathanTarget)
    .createBoss(ctx => ctx.level.createEntity('cataclysm:the_leviathan'))
)
