// priority: 2000
const $ScoreType = 'chestcavity:filtration' || 'chestcavity:breath_recovery' || 'chestcavity:nutrition' || 'chestcavity:nerves' || 'chestcavity:strength' || 'chestcavity:health' || 'chestcavity:breath_capacity' || 'chestcavity:detoxification' || 'chestcavity:speed' || 'chestcavity:endurance' || 'chestcavity:luck' || 'chestcavity:defense' || 'chestcavity:digestion' || 'chestcavity:metabolism' || 'chestcavity:fire_resistant' || 'chestcavity:glowing' || 'chestcavity:knockback_resistant' || 'chestcavity:water_breath' || 'chestcavity:swim_speed' || 'chestcavity:impact_resistant' || 'chestcavity:ease_of_access' || 'kubejs:rosy' || 'kubejs:attack_dodge' || 'kubejs:creative_flight' || 'kubejs:extreme_fitness' || 'kubejs:extreme_strength' || 'kubejs:flying_speed' || 'kubejs:magic_capacity' || 'kubejs:dragon_blood' || 'kubejs:knockback' || 'kubejs:crit_chance' || 'kubejs:crit_damage' || 'kubejs:immunosuppression' || 'kubejs:primitivization' || 'kubejs:glowing' || 'chestcavity:climbing' || 'kubejs:steppy' || 'kubejs:light_weight' || 'kubejs:jump_height' || 'kubejs:photosynthesis'

/**@type {OrganItemModel[]} */
const OrganList = []
/**@type {OrganItemModel[]} */
const PseudoOrganList = []
/**
 * 
 * @param {String} itemId 
 */
function OrganItemModel(itemId) {
    this.itemId = itemId
    this.pseudoOrgan = false
    this.canSpawnInCavity = false
    this.organScores = []
    this.maxStackSize = 1
}

OrganItemModel.prototype = {
    /**
     * 
     * @param {$ScoreType} score 
     * @param {number} value 
     * @returns 
     */
    addScore: function (score, value) {
        this.organScores.push({ 'id': `${score}`, 'value': value })
        return this
    },
    setPseudo: function (boolean) {
        this.pseudoOrgan = boolean
        return this
    },
    setCanSpawn: function (boolean) {
        this.canSpawnInCavity = boolean
        return this
    },
}

/**
 * 
 * @param {String} itemId 
 * @returns 
 */
function RegistryOrgan(itemId) {
    let organ = new OrganItemModel(itemId)
    OrganList.push(organ)
    return organ
}

/**
 * 
 * @param {String} itemId 
 * @returns 
 */
function RegistryPseudoOrgan(itemId) {
    let organ = new OrganItemModel(itemId).setPseudo(true)
    PseudoOrganList.push(organ)
    return organ
}

ServerEvents.highPriorityData(event => {
    OrganList.forEach(organ => {
        let item = organ.itemId.split(':')[1]
        event.addJson(`kubejs:organs/kubejs/${item}.json`, { itemID: organ.itemId, pseudoOrgan: organ.pseudoOrgan, organScores: organ.organScores })
    })
    PseudoOrganList.forEach(organ => {
        let item = organ.itemId.split(':')[1]
        event.addJson(`kubejs:organs/kubejs/${item}.json`, { itemID: organ.itemId, pseudoOrgan: organ.pseudoOrgan, organScores: organ.organScores })
    })
})

ServerEvents.tags('item', event => {
    event.add('kubejs:organ', OrganList.map(organ => organ.itemId))
    event.add('kubejs:pseudo_organ', PseudoOrganList.map(organ => organ.itemId))
    event.add('kubejs:spawn_in_cavity', OrganList.filter(organ => organ.canSpawnInCavity).map(organ => organ.itemId))
})