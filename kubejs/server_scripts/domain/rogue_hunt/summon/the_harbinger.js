// priority: 500
const TheHarbingerTarget = 'cataclysm:kobolediator'

RegistryVoidArenaSummon(new VoidArenaSummonModel('cataclysm:the_harbinger', 24)
    .setSummonId('cataclysm:the_harbinger')
    .onEntityKilled(ctx => ctx.entity.type == TheHarbingerTarget)
    .createBoss(ctx => ctx.level.createEntity('cataclysm:the_harbinger'))
)
