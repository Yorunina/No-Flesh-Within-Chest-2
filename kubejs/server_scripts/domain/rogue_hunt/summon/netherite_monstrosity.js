// priority: 500
const NetheriteMonstrosityTarget = 'cataclysm:ignited_berserker'

RegistryVoidArenaSummon(new VoidArenaSummonModel('cataclysm:netherite_monstrosity', 32)
    .setSummonId('cataclysm:netherite_monstrosity')
    .onEntityKilled(ctx => ctx.entity.type == NetheriteMonstrosityTarget)
    .createBoss(ctx => ctx.level.createEntity('cataclysm:netherite_monstrosity'))
)
