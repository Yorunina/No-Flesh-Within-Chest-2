// priority: 500
const MaledictusTarget = 'illagerinvasion:necromancer'

RegistryVoidArenaSummon(new VoidArenaSummonModel('cataclysm:maledictus', 32)
    .setSummonId('cataclysm:maledictus')
    .onEntityKilled(ctx => ctx.entity.type == MaledictusTarget)
    .createBoss(ctx => ctx.level.createEntity('cataclysm:maledictus'))
)
