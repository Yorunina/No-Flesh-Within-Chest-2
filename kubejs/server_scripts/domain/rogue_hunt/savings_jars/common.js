// priority: 800
/**
 * @param {Internal.LivingEntity} entity
 * @param {string} attributeId
 * @returns {number}
 */
function GetSavingsJarAttributeValue(entity, attributeId) {
    let attr = entity.getAttribute(attributeId)
    return attr ? attr.getValue() : 0
}

/**
 * @param {Internal.LivingEntity} entity
 * @param {string} stat
 * @returns {number}
 */
function GetSavingsJarStat(entity, stat) {
    switch (stat) {
        case 'rank':
            return entity.persistentData.getInt('rogue_hunt_rank')
        case 'health':
            return entity.maxHealth
        case 'armor':
            return GetSavingsJarAttributeValue(entity, 'minecraft:generic.armor')
        case 'toughness':
            return GetSavingsJarAttributeValue(entity, 'minecraft:generic.armor_toughness')
        case 'attack':
            return GetSavingsJarAttributeValue(entity, 'minecraft:generic.attack_damage')
        default:
            return 0
    }
}

/**
 * @param {Internal.LivingEntity} entity
 * @returns {object}
 */
function GetSavingsJarStatMap(entity) {
    return {
        rank: GetSavingsJarStat(entity, 'rank'),
        health: GetSavingsJarStat(entity, 'health'),
        armor: GetSavingsJarStat(entity, 'armor'),
        toughness: GetSavingsJarStat(entity, 'toughness'),
        attack: GetSavingsJarStat(entity, 'attack')
    }
}

/**
 * @param {Internal.LootContextJS} event
 * @param {number} value
 */
function AddSavingsJarCoins(event, value) {
    ConvertMoneyIntoCoinItemList(CoinList, Math.floor(Math.max(0, value))).forEach(item => event.addLoot(item))
}

/**
 * @param {Internal.LootContextJS} event
 * @returns {boolean}
 */
function IsRogueHuntSavingsJarLoot(event) {
    return event.level.dimension == ROGUE_HUNT_DIM && event.entity
}

/**
 * @param {string} id
 * @param {function(Internal.LivingEntity): number} compute
 * @param {boolean} [clearLoot]
 * @param {number} [priority]
 */
function RegistrySavingsJarLoot(id, compute, clearLoot, priority) {
    RegistryCuriosStrategy(new CuriosStrategyModel(id)
        .addStrategy('entity_loot', (customData, event) => {
            if (!IsRogueHuntSavingsJarLoot(event)) return
            if (clearLoot) event.removeLoot(Ingredient.all)
            AddSavingsJarCoins(event, compute(event.entity))
        }, priority))
}

RegistrySavingsJarLoot('kubejs:rank_savings_jar', entity => {
    let rank = GetSavingsJarStat(entity, 'rank')
    return Math.ceil(Math.random() * Math.pow(rank, 1.5) + Math.max(rank, 1))
}, true, 100)
RegistrySavingsJarLoot('kubejs:health_savings_jar', entity => {
    let health = GetSavingsJarStat(entity, 'health')
    return Math.random() * health / 20 + health / 100
})
RegistrySavingsJarLoot('kubejs:armor_savings_jar', entity => {
    let armor = GetSavingsJarStat(entity, 'armor')
    return Math.random() * armor * (1 + GetSavingsJarStat(entity, 'toughness') / 4) + armor
})
RegistrySavingsJarLoot('kubejs:attack_savings_jar', entity => {
    let attack = GetSavingsJarStat(entity, 'attack')
    return Math.random() * attack * 5 + attack
})
