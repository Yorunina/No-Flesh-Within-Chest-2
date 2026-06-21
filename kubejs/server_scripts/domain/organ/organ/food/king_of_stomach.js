// priority: 500
RegistryOrgan('kubejs:king_of_stomach')
    .addScore('chestcavity:endurance', -3)
    .addScore('chestcavity:nutrition', -1)
    .addScore('chestcavity:metabolism', 1)

const CakeFoodProperties = { 'minecraft:cake': { 'nutrition': 14, 'saturation': 2.8 }, 'bakery:strawberry_cake': { 'nutrition': 20, 'saturation': 14 }, 'bakery:sweetberry_cake': { 'nutrition': 20, 'saturation': 14 }, 'bakery:chocolate_cake': { 'nutrition': 20, 'saturation': 14 }, 'bakery:chocolate_gateau': { 'nutrition': 20, 'saturation': 14 }, 'bakery:bundt_cake': { 'nutrition': 20, 'saturation': 14 }, 'bakery:linzer_tart': { 'nutrition': 20, 'saturation': 14 }, 'bakery:apple_pie': { 'nutrition': 20, 'saturation': 14 }, 'bakery:glowberry_tart': { 'nutrition': 20, 'saturation': 14 }, 'bakery:chocolate_tart': { 'nutrition': 20, 'saturation': 14 }, 'bakery:pudding': { 'nutrition': 20, 'saturation': 14 }, 'create:blaze_cake': { 'nutrition': 18, 'saturation': 18 }, 'create:creative_blaze_cake': { 'nutrition': 24, 'saturation': 48 }}

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function KingOfStomachChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    const inventory = chestCavity.inventory
    const level = event.level
    let onlySet = new Set()
    let healthUp = 0
    let attackUp = 0
    const sweetsGlandEffect = GetCustomDataOrDefault(customData, 'hasSweetsGland', 0)
    const beerGlandEffect = GetCustomDataOrDefault(customData, 'hasBeerGland', 0)

    inventory.allItems.forEach(item => {
        if (item.isEmpty()) return
        let itemId = String(item.getId())
        if (!onlySet.has(itemId)) {
            let isGreedy = false
            if (item.hasNBT()) {
                let nbt = item.getNbt()
                if (nbt.contains('greedyThroatUUID')) isGreedy = true
            }
            if (item.hasTag('kubejs:cake') && sweetsGlandEffect == 2) {
                let foodPro = CakeFoodProperties[item.getId().toString()]
                if (!foodPro) return

                attackUp = attackUp + foodPro.saturation * 2
                healthUp = healthUp + foodPro.nutrition / 4
            } else if (item.hasTag('kubejs:sweets') && sweetsGlandEffect >= 1) {
                let foodPro = item.getFoodProperties(entity)
                if (!foodPro) return
                let nutrition = foodPro.getNutrition() + (isGreedy ? 2 : 0)
                let staturation = foodPro.getSaturationModifier() * nutrition * 2

                attackUp = attackUp + staturation * 2
                healthUp = healthUp + nutrition / 4
            } else if (item.hasTag('kubejs:beer') && beerGlandEffect >= 1) {
                let foodPro = item.getFoodProperties(entity)
                if (!foodPro) return
                let nutrition = foodPro.getNutrition() + (isGreedy ? 2 : 0)
                let staturation = foodPro.getSaturationModifier() * nutrition * 2
                attackUp = attackUp + staturation * 2 + nutrition * 2
                if (beerGlandEffect == 2) {
                    // 允许重复放置
                    return
                }
            } else if (item.hasTag('kubejs:wine') && beerGlandEffect == 2) {
                let age = $WineYears.getWineAge(item, level)
                attackUp = attackUp + 1 * age
            } else {
                let foodPro = item.getFoodProperties(entity)
                if (!foodPro) return
                let nutrition = foodPro.getNutrition() + (isGreedy ? 2 : 0)

                let staturation = foodPro.getSaturationModifier() * nutrition * 2
                attackUp = attackUp + staturation / 2
                healthUp = healthUp + nutrition / 4

            }
            onlySet.add(itemId)
        }

    })
    if (slotType == GulaSlot) {
        attackUp = attackUp * 2
        healthUp = healthUp * 2
    }
    customData.attackDamage.addAttributeModifier(attackUp, 'addition', 'base')
    customData.maxHealth.addAttributeModifier(healthUp, 'addition', 'base')
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function KingOfStomachTakeOn(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    if (slotType == GulaSlot && entity instanceof $ServerPlayer) {
        entity.foodData.setNoAddExhaustion(true)
    }
    OrganSkinAdd(entity, 'chest', 'secret/chestcavity/gula_body')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function KingOfStomachTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    if (slotType == GulaSlot && entity instanceof $ServerPlayer) {
        entity.foodData.setNoAddExhaustion(false)
    }
    OrganSkinRemove(entity, 'chest', 'secret/chestcavity/gula_body')
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:king_of_stomach')
        .addOnlyStrategy('organ_take_on', KingOfStomachTakeOn)
        .addOnlyStrategy('organ_take_off', KingOfStomachTakeOff)
        .addOnlyStrategy('chest_cavity_update', KingOfStomachChestCavityUpdate)
)