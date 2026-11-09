// priority: 500
RegistryOrgan('kubejs:water_wheel')
    .addScore('kubejs:stress', 1)
    .setRank(1)
    .setCanSpawn(false)
RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:water_wheel')
)
