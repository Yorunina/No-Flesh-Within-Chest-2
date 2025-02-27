// priority: 2000
const $ScoreType = 'chestcavity:filtration' ||'chestcavity:breath_recovery' ||'chestcavity:nutrition' ||'chestcavity:nerves' ||'chestcavity:strength' ||'chestcavity:health' ||'chestcavity:breath_capacity' ||'chestcavity:detoxification' ||'chestcavity:speed' ||'chestcavity:endurance' ||'chestcavity:luck' ||'chestcavity:defense' ||'chestcavity:digestion' ||'chestcavity:metabolism' ||'chestcavity:fire_resistant' ||'chestcavity:buoyant' ||'chestcavity:glowing' ||'chestcavity:knockback_resistant' ||'chestcavity:water_breath' ||'chestcavity:explosive' ||'chestcavity:pyromancy' ||'chestcavity:hydroallergenic' ||'chestcavity:photosynthesis' ||'chestcavity:ghastly' ||'chestcavity:withered' ||'chestcavity:dragon_bombs' ||'chestcavity:buff_purging' ||'chestcavity:herbivorous_digestion' ||'chestcavity:herbivorous_nutrition' ||'chestcavity:carnivorous_digestion' ||'chestcavity:carnivorous_nutrition' ||'chestcavity:swim_speed' ||'chestcavity:launching' ||'chestcavity:furnace_powered' ||'chestcavity:iron_repair' ||'chestcavity:crystalsynthesis' ||'chestcavity:rot_digestion' ||'chestcavity:rot_nutrition' ||'chestcavity:forceful_spit' ||'chestcavity:silk' ||'chestcavity:venomous' ||'chestcavity:leaping' ||'chestcavity:hydrophobia' ||'chestcavity:dragon_breath' ||'chestcavity:creepy' ||'chestcavity:shulker_bullets' ||'chestcavity:grazing' ||'chestcavity:arrow_dodging' ||'chestcavity:impact_resistant' ||'chestcavity:rotgut' ||'chestcavity:ease_of_access' ||'kubejs:rosy'

const OrganList = []
const PseudoOrganList = []
function Organ(itemId) {
    this.itemId = itemId
    this.pseudoOrgan = false
    this.organScores = []
    this.maxStackSize = 1
}

Organ.prototype = {
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
    setPseudo: function(boolean) {
        this.pseudoOrgan = boolean
        return this
    },
}

function RegistryOrgan(itemId) {
    let organ = new Organ(itemId)
    OrganList.push(organ)
    return organ
}

function RegistryPseudoOrgan(itemId) {
    let organ = new Organ(itemId).setPseudo(true)
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
})