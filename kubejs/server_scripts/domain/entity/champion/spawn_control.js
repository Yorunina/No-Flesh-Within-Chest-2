// priority: 1000
const ChampionAuroWeightConfig = new WeightRandomModel()
    .addWeightRandom({ key: 'damage_aura', maxLevel: 10, color: '#e82102' }, 10)
    .addWeightRandom({ key: 'heal_aura', maxLevel: 10, color: '#83fa7f' }, 10)
    .addWeightRandom({ key: 'speed_aura', maxLevel: 10, color: '#e7fc32' }, 10)


const ChampionSelfWeightConfig = new WeightRandomModel()
    .addWeightRandom({ key: 'split_on_death', maxLevel: 10, color: '#ec1aff' }, 10)
    .addWeightRandom({ key: 'health_boost', maxLevel: 10, color: '#66fc61' }, 10)

/**
 * @type {PiecewiseMappingModel}
 */
const HuntingDimWaveEntityMapping = new PiecewiseMappingModel()
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

// todo 熏香切换敌人类型
LevelEvents.tick('infinity:hunting', event => {
    const level = event.level
    if (level == null) return
    /**@type {Player[]} */
    const playerList = level.players
    if (level.difficulty.key == 'peaceful') return
    if (level.time % 200 != 0) return

    if (playerList.isEmpty()) return

    if (level.getEntities().length > 70) return

    const random = level.getRandom()

    playerList.forEach(/**@param {Player} player*/ player => {
        let difficulty = player.persistentData.getInt('huntingDifficulty')

        let playerPos = player.blockPosition()
        let spawnRad = Math.random() * JavaMath.PI * 2
        let distance = Math.floor(Math.random() * 16 + 48)
        let spawnPos = playerPos.offset(Math.cos(spawnRad) * distance, 0, Math.sin(spawnRad) * distance)

        let targetChunk = level.getChunk(Math.floor(spawnPos.x / 16), Math.floor(spawnPos.z / 16), 'surface', true)
        let spawnY = targetChunk.getHeight('motion_blocking', spawnPos.x % 16, spawnPos.z % 16) + 1

        let entityAmount = Math.min(Math.floor(difficulty / 6), 20) + 5

        /** @type {WeightRandomModel} */
        let entityWeightList = HuntingDimWaveEntityMapping.getNearestValue(difficulty)
        let entityList = entityWeightList.getWeightRandomRepeatedObjs(entityAmount)

        for (let i = 0; i < entityList.length; i++) {
            let pEntity = level.createEntity(entityList[i])
            if (i == Math.ceil(entityAmount / 8)) ApplyChampionEntityEffect(pEntity)
            pEntity.setAggressive(true)
            pEntity.setTarget(player)
            pEntity.setPersistenceRequired()
            pEntity.setPos(spawnPos.x + random.nextInt(6) - 3, spawnY, spawnPos.z + random.nextInt(6) - 3)
            pEntity.finalizeSpawn(level, level.getCurrentDifficultyAt(spawnPos), 'mob_summoned', null, null)
            level.addFreshEntityWithPassengers(pEntity)
        }
    })
})



/**
 * 
 * @param {Internal.LivingEntity} entity 
 * @returns 
 */
function ApplyChampionEntityEffect(entity) {
    const persistentData = entity.persistentData
    const existingTag = persistentData.getCompound('champion') ?? new $CompoundTag()
    if (existingTag && !existingTag.isEmpty()) return

    let affixes = []
    if (Math.random() > 0.5) {
        affixes.push(ChampionAuroWeightConfig.getWeightRandomObj())
    }
    if (Math.random() > 0.2) {
        affixes = affixes.concat(ChampionSelfWeightConfig.getWeightRandomObjs(1))
    }

    if (Object.keys(affixes).length === 0) return

    const championTag = new $CompoundTag()
    let entityName = Text.empty()
    affixes.forEach(pObj => {
        let pLevel = Math.ceil(Math.random() * pObj.maxLevel)
        championTag.putInt(pObj.key, pLevel)
        entityName.append(Text.translatable(`champion.affix.${pObj.key}.name`, MAAUtils.toRomanNumeral(pLevel)).color(pObj.color))
        entityName.append(Text.of(' / ').darkGray())
    })

    entityName.append(entity.getName())
    entity.setCustomName(entityName)
    entity.setCustomNameVisible(true)
    persistentData.put('champion', championTag)
    entity.setGlowing(true)
}