// priority: 500
const KrakenTarget = 'cataclysm:deepling_brute'

RegistryVoidArenaSummon(new VoidArenaSummonModel('block_factorys_bosses:kraken', 32)
    .setSummonId('block_factorys_bosses:kraken')
    .onEntityKilled(ctx => ctx.entity.type == KrakenTarget)
    .createBoss(ctx => ctx.level.createEntity('block_factorys_bosses:kraken'))
)
