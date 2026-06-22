// priority: 1000
const ChampionAuroWeightConfig = new WeightRandomModel()
    .addWeightRandom({ key: 'damage_aura', maxLevel: 10, color: '#e82102' }, 10)
    .addWeightRandom({ key: 'heal_aura', maxLevel: 10, color: '#83fa7f' }, 10)
    .addWeightRandom({ key: 'speed_aura', maxLevel: 10, color: '#e7fc32' }, 10)


const ChampionSelfWeightConfig = new WeightRandomModel()
    .addWeightRandom({ key: 'split_on_death', maxLevel: 10, color: '#ec1aff' }, 10)
    .addWeightRandom({ key: 'health_boost', maxLevel: 10, color: '#66fc61' }, 10)

EntityEvents.spawned(event => {
    /** @type {Internal.LivingEntity} */
    const entity = event.entity
    if (!entity || !entity.isLiving() || !entity.isMonster()) return
    const level = entity.getLevel()

    if (level.dimension != 'infinity:hunting') return

    const persistentData = entity.persistentData
    const existingTag = persistentData.getCompound('champion') ?? new $CompoundTag()
    if (existingTag && !existingTag.isEmpty()) return

    let affixes = []
    if (Math.random() > 0.95) {
        affixes.push(ChampionAuroWeightConfig.getWeightRandomObj())
    }
    if (Math.random() > 0.5) {
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
})
