// priority: 500
const AncientRemnantTarget = 'cataclysm:koboleton'

RegistryVoidArenaSummon(new VoidArenaSummonModel('cataclysm:ancient_remnant', 40)
    .setSummonId('cataclysm:ancient_remnant')
    .onEntityKilled(ctx => ctx.entity.type == AncientRemnantTarget)
    .createBoss(ctx => ctx.level.createEntity('cataclysm:ancient_remnant'))
)
