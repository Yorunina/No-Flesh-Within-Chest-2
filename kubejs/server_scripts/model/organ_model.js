// priority: 2000
const OrganList = []
const PseudoOrganList = []
function Organ(itemId) {
    this.itemId = itemId
    this.pseudoOrgan = false
    this.organScores = []
    this.maxStackSize = 1
}

Organ.prototype = {
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