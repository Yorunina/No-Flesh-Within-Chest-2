// priority: 500
const ScyllaTarget = 'cataclysm:deepling_warlock'

RegistryVoidArenaSummon(new VoidArenaSummonModel('cataclysm:scylla', 32)
    .setSummonId('cataclysm:scylla')
    .onEntityKilled(ctx => ctx.entity.type == ScyllaTarget)
    .createBoss(ctx => ctx.level.createEntity('cataclysm:scylla'))
)
