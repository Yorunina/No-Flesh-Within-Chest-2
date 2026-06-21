// priority: 500
RegistryOrgan('kubejs:pillager_gland')
    .addScore('chestcavity:defense', -1)
    .addScore('chestcavity:endurance', 1)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.VillagerUpdateSpecialPrices} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function PillagerGlandVillagerUpdateSpecialPrices(customData, event, organItem, organIndex, slotType) {
    event.villager.offers.forEach(pOffer => {
        let price = pOffer.getBaseCostA().getCount()
        let currentDiscount = pOffer.getSpecialPriceDiff() / price
        pOffer.addToSpecialPriceDiff(Math.round((1.0 + currentDiscount) * -0.5 * price))
    })
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:pillager_gland')
        .addOnlyStrategy('villager_update_special_prices', PillagerGlandVillagerUpdateSpecialPrices)
)