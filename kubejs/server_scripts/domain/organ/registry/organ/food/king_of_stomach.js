// priority: 500
RegistryOrgan('kubejs:king_of_stomach')
    .addScore('chestcavity:endurance', -3)
    .addScore('chestcavity:nutrition', -1)
    .addScore('chestcavity:metabolism', 1)

const CakeFoodProperties = { 'minecraft:cake': { 'nutrition': 14, 'saturation': 2.8 }, 'bakery:strawberry_cake': { 'nutrition': 20, 'saturation': 14 }, 'bakery:sweetberry_cake': { 'nutrition': 20, 'saturation': 14 }, 'bakery:chocolate_cake': { 'nutrition': 20, 'saturation': 14 }, 'bakery:chocolate_gateau': { 'nutrition': 20, 'saturation': 14 }, 'bakery:bundt_cake': { 'nutrition': 20, 'saturation': 14 }, 'bakery:linzer_tart': { 'nutrition': 20, 'saturation': 14 }, 'bakery:apple_pie': { 'nutrition': 20, 'saturation': 14 }, 'bakery:glowberry_tart': { 'nutrition': 20, 'saturation': 14 }, 'bakery:chocolate_tart': { 'nutrition': 20, 'saturation': 14 }, 'bakery:pudding': { 'nutrition': 20, 'saturation': 14 } }
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
    console.log(sweetsGlandEffect)
    const beerGlandEffect = GetCustomDataOrDefault(customData, 'hasBeerGland', 0)
    console.log(beerGlandEffect)
    const gulaSlotEffect = slotType == GulaSlot

    inventory.allItems.forEach(item => {
        if (item.isEmpty()) return

        if (!onlySet.has(item.getId())) {
            if (item.hasTag('kubejs:cake') && sweetsGlandEffect == 2) {
                let foodPro = CakeFoodProperties[item.getId().toString()]
                if (!foodPro) return
                
                attackUp = attackUp + foodPro.saturation * 2
                healthUp = healthUp + foodPro.nutrition / 4
            } else if (item.hasTag('kubejs:sweets') && sweetsGlandEffect >= 1) {
                let foodPro = item.getFoodProperties(entity)
                if (!foodPro) return
                let nutrition = foodPro.getNutrition()
                let staturation = foodPro.getSaturationModifier() * nutrition

                attackUp = attackUp + staturation * 2
                healthUp = healthUp + nutrition / 4
            } else if (item.hasTag('kubejs:beer') && beerGlandEffect >= 1) {
                let foodPro = item.getFoodProperties(entity)
                if (!foodPro) return
                let nutrition = foodPro.getNutrition()
                let staturation = foodPro.getSaturationModifier() * nutrition
                attackUp = attackUp + staturation * 2 + nutrition * 2
                if (beerGlandEffect == 2) {
                    // 允许重复放置
                    return
                }
            } else if (item.hasTag('kubejs:wine') && beerGlandEffect >= 1) {
                if (beerGlandEffect == 2) {
                    let age = $WineYears.getWineAge(item, level)
                    attackUp = attackUp + 0.4 * age
                } else {
                    attackUp = attackUp + 4
                }
            } else {
                let foodPro = item.getFoodProperties(entity)
                if (!foodPro) return
                let nutrition = foodPro.getNutrition()
                let staturation = foodPro.getSaturationModifier() * nutrition
                if (gulaSlotEffect) {
                    attackUp = attackUp + staturation / 2
                    healthUp = healthUp + nutrition / 2
                } else {
                    attackUp = attackUp + staturation / 4
                    healthUp = healthUp + nutrition / 4
                }
            }
            onlySet.add(item.getId())
        }

    })

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
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:king_of_stomach')
        .addOnlyStrategy('organ_take_on', KingOfStomachTakeOn)
        .addOnlyStrategy('organ_take_off', KingOfStomachTakeOff)
        .addOnlyStrategy('chest_cavity_update', KingOfStomachChestCavityUpdate)
)