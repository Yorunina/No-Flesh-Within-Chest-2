// priority: 500
const UndeadVoidArenaMobs = [
    'minecraft:zombie',
    'minecraft:husk',
    'minecraft:drowned',
    'minecraft:skeleton',
    'minecraft:stray',
    'minecraft:wither_skeleton',
    'minecraft:phantom'
]

RegistryVoidArenaSummon(new VoidArenaSummonModel('kubejs:undead', 100)
    .match(entity => UndeadVoidArenaMobs.some(id => entity.type == id))
    .condition(ctx => ctx.level.isThundering() && ctx.level.getBiome(ctx.player.blockPosition()).get().getBaseTemperature() < 0.3)
    .createBoss(ctx => ctx.level.createEntity('minecraft:wither'))
)
