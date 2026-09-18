// priority: 600
const MUTATED_SAVINGS_JAR_DROP_CHANCE = 0.02
const MutatedSavingsJarStatCaps = {
    rank: { randMax: 1, randPower: 1.5, constMax: 1, constPower: 1, toughness: false, rankFloor: true },
    health: { randMax: 0.05, randPower: 1, constMax: 0.01, constPower: 1, toughness: false, rankFloor: false },
    armor: { randMax: 1, randPower: 1, constMax: 1, constPower: 1, toughness: true, rankFloor: false },
    attack: { randMax: 5, randPower: 1, constMax: 1, constPower: 1, toughness: false, rankFloor: false }
}
const MutatedSavingsJarSamples = [
    { rank: 10, health: 220, armor: 12, toughness: 0, attack: 4.5 },
    { rank: 10, health: 2000, armor: 20, toughness: 4, attack: 15 },
    { rank: 20, health: 100000000, armor: 40, toughness: 8, attack: 30 }
]

/**
 * @returns {Internal.ItemStack}
 */
function CreateMutatedSavingsJar() {
    let item = Item.of('kubejs:mutated_savings_jar')
    item.getOrCreateTag().put('savings_jar', MutatedSavingsJarCardToNbt(GenerateMutatedSavingsJarCard()))
    return item
}

/**
 * @returns {{terms: object[]}}
 */
function GenerateMutatedSavingsJarCard() {
    let pool = ['rank', 'health', 'armor', 'attack']
    let stats = [pool.splice(Math.floor(Math.random() * pool.length), 1)[0]]
    if (Math.random() >= 0.5) stats.push(pool[Math.floor(Math.random() * pool.length)])
    let mix = stats.length == 1 ? 1 : 0.62
    let card = { terms: [] }
    stats.forEach(stat => {
        let cap = MutatedSavingsJarStatCaps[stat]
        let ratio = 0.45 + Math.random() * 0.55
        card.terms.push({
            stat: stat,
            rand: cap.randMax * ratio * mix,
            randPower: cap.randPower,
            constant: cap.constMax * ratio * mix,
            constPower: cap.constPower,
            toughness: cap.toughness,
            rankFloor: cap.rankFloor
        })
    })
    CapMutatedSavingsJarCard(card)
    return card
}

/**
 * @param {{terms: object[]}} card
 */
function CapMutatedSavingsJarCard(card) {
    let scale = 1
    MutatedSavingsJarSamples.forEach(stats => {
        let ev = 0
        card.terms.forEach(term => ev += EvaluateMutatedSavingsJarTerm(term, stats, 0.5))
        let best = Math.max(
            0.5 * Math.pow(stats.rank, 1.5) + Math.max(stats.rank, 1),
            stats.health / 40 + stats.health / 100,
            0.5 * stats.armor * (1 + stats.toughness / 4) + stats.armor,
            0.5 * stats.attack * 5 + stats.attack
        )
        if (ev > 0.9 * best && ev > 0) scale = Math.min(scale, 0.9 * best / ev)
    })
    if (scale < 1) {
        card.terms.forEach(term => {
            term.rand *= scale
            term.constant *= scale
        })
    }
}

/**
 * @param {object} term
 * @param {object} stats
 * @param {number} randValue
 * @returns {number}
 */
function EvaluateMutatedSavingsJarTerm(term, stats, randValue) {
    let stat = stats[term.stat] || 0
    let randStat = Math.pow(stat, term.randPower)
    let constStat = term.rankFloor ? Math.max(stat, 1) : Math.pow(stat, term.constPower)
    let toughnessMul = term.toughness ? (1 + (stats.toughness || 0) / 4) : 1
    return randValue * term.rand * toughnessMul * randStat + term.constant * constStat
}

/**
 * @param {{terms: object[]}} card
 * @returns {Internal.CompoundTag}
 */
function MutatedSavingsJarCardToNbt(card) {
    let nbt = new $CompoundTag()
    let terms = new $ListTag()
    card.terms.forEach(term => {
        let tag = new $CompoundTag()
        tag.putString('stat', term.stat)
        tag.putFloat('rand', term.rand)
        tag.putFloat('randPower', term.randPower)
        tag.putFloat('constant', term.constant)
        tag.putFloat('constPower', term.constPower)
        tag.putBoolean('toughness', term.toughness)
        tag.putBoolean('rankFloor', term.rankFloor)
        terms.add(tag)
    })
    nbt.put('terms', terms)
    return nbt
}

/**
 * @param {Internal.CompoundTag} nbt
 * @returns {{terms: object[]}}
 */
function MutatedSavingsJarCardFromNbt(nbt) {
    let card = { terms: [] }
    let terms = nbt.getList('terms', 10)
    for (let i = 0; i < terms.size(); i++) {
        let tag = terms.getCompound(i)
        card.terms.push({
            stat: tag.getString('stat'),
            rand: tag.getFloat('rand'),
            randPower: tag.getFloat('randPower'),
            constant: tag.getFloat('constant'),
            constPower: tag.getFloat('constPower'),
            toughness: tag.getBoolean('toughness'),
            rankFloor: tag.getBoolean('rankFloor')
        })
    }
    return card
}

/**
 * @param {CuriosEventCustomData} customData
 * @param {Internal.LootContextJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function MutatedSavingsJarEntityLoot(customData, event, curiosItem) {
    if (!IsRogueHuntSavingsJarLoot(event) || !curiosItem.hasNBT()) return
    let tag = curiosItem.nbt.getCompound('savings_jar')
    if (!tag.contains('terms')) return
    let stats = GetSavingsJarStatMap(event.entity)
    let value = 0
    MutatedSavingsJarCardFromNbt(tag).terms.forEach(term => {
        value += EvaluateMutatedSavingsJarTerm(term, stats, Math.random())
    })
    AddSavingsJarCoins(event, value)
}

/**
 * @param {CuriosEventCustomData} customData
 * @param {Internal.LootContextJS} event
 */
function TryDropMutatedSavingsJar(customData, event) {
    if (!IsRogueHuntSavingsJarLoot(event) || event.entity.isPlayer()) return
    if (Math.random() >= MUTATED_SAVINGS_JAR_DROP_CHANCE) return
    event.addLoot(CreateMutatedSavingsJar())
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:mutated_savings_jar')
    .addStrategy('entity_loot', MutatedSavingsJarEntityLoot)
)
CuriosEntityLootEvent.addDefer(TryDropMutatedSavingsJar)
