// priority: 500
RegistryOrgan('kubejs:windmill_bearing')
    .addScore('kubejs:stress', 2)
    .setRank(1)
    .setCanSpawn(false)
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:windmill_bearing')
)
