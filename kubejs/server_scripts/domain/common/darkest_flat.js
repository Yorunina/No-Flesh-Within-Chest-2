// priority: 500
// todo
/**
 * @type {PiecewiseMappingModel}
 */
const DarkestFlatWaveEntityMapping = new PiecewiseMappingModel()
    .addPiece(0, 10, new WeightRandomModel()
        .addWeightRandom('graveyard:ghoul', 100)
    )
    .addPiece(10, 20, new WeightRandomModel()
        .addWeightRandom('graveyard:ghoul', 100)
        .addWeightRandom('graveyard:reaper', 100)
    )
    .addPiece(20, 30, new WeightRandomModel()
        .addWeightRandom('graveyard:ghoul', 100)
        .addWeightRandom('graveyard:reaper', 100)
    )
    .addPiece(30, 50, new WeightRandomModel()
        .addWeightRandom('graveyard:ghoul', 100)
        .addWeightRandom('graveyard:reaper', 100)
    )
    .addPiece(50, 70, new WeightRandomModel()
        .addWeightRandom('graveyard:ghoul', 100)
        .addWeightRandom('graveyard:reaper', 100)
    )
    .addPiece(70, 100, new WeightRandomModel()
        .addWeightRandom('graveyard:ghoul', 100)
        .addWeightRandom('graveyard:reaper', 100)
    )
    .addPiece(100, 150, new WeightRandomModel()
        .addWeightRandom('graveyard:ghoul', 100)
        .addWeightRandom('graveyard:reaper', 100)
    )
    .addPiece(150, 200, new WeightRandomModel()
        .addWeightRandom('graveyard:ghoul', 100)
        .addWeightRandom('graveyard:reaper', 100)
    )
    .addPiece(200, Infinity, new WeightRandomModel()
        .addWeightRandom('graveyard:ghoul', 100)
        .addWeightRandom('graveyard:reaper', 100)
    )

const DarkestFlatFollowRangeModifierUUID = UUID.fromString('2C35F318-AABB-4723-9F6A-99B3B57ED46B')
const DarkestFlatFollowRangeModifierIdentifier = 'darkest_flat_follow_range'

ServerEvents.tick(event => {
    const server = event.server
    const level = server.getLevel('infinity:darkest_flat')
    if (level == null) return
    const playerList = level.players
    if (level.difficulty.key == 'peaceful') return
    if (level.time % 200 != 0) return
    const persistentData = server.persistentData
    const waveCounter = persistentData.getLong('darkest_wave_counter') + 1
    if (playerList.isEmpty()) {
        if (waveCounter != 0) persistentData.putLong('darkest_wave_counter', 0)
        return
    }
    if (level.getEntities().length > 70) return
    persistentData.putLong('darkest_wave_counter', waveCounter)
    /**@type {WeightRandomModel} */
    const entityWeightList = DarkestFlatWaveEntityMapping.getNearestValue(waveCounter)

    playerList.forEach(/**@param {Player} player*/ player => {
        player.tell('Wave ' + waveCounter)
        let playerPos = player.blockPosition()
        let spawnRad = Math.random() * JavaMath.PI * 2
        let distance = Math.floor(Math.random() * 16 + 48)
        let spawnPos = playerPos.offset(Math.cos(spawnRad) * distance, 0, Math.sin(spawnRad) * distance)

        let levelDifficulty = level.getCurrentDifficultyAt(spawnPos)
        let targetChunk = level.getChunk(Math.floor(spawnPos.x / 16), Math.floor(spawnPos.z / 16), 'surface', true)
        let spawnY = targetChunk.getHeight('motion_blocking', spawnPos.x % 16, spawnPos.z % 16) + 1

        let entityAmount = Math.min(Math.floor(waveCounter / 6), 20) + 5
        const random = level.getRandom()
        const entityList = entityWeightList.getWeightRandomRepeatedObjs(entityAmount)

        for (let i = 0; i < entityList.length; i++) {
            /** @type {Internal.ReaperEntity} */
            let entity = level.createEntity(entityList[i])
            entity.setAggressive(true)
            entity.setTarget(player)
            entity.setPersistenceRequired()
            entity.setPos(spawnPos.x + random.nextInt(6) - 3, spawnY, spawnPos.z + random.nextInt(6) - 3)
            entity.finalizeSpawn(level, levelDifficulty, 'mob_summoned', null, null)
            level.addFreshEntityWithPassengers(entity)
        }
    })
})