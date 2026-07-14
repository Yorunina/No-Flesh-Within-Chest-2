// priority: 500
const RollEnergyRollCountUpUUID = UUID.fromString('CAE270DA-4C5B-42D1-BB8C-28FD322FCAB2')
const RollEnergyRollCountUpIdentifier = 'RollEnergyRollCountUp'
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function RollEnergyRollCountUpdateOrganScore(event) {
    const entity = event.entity
    const organScoreValue = Math.floor(event.chestCavity.getOrganScore('kubejs:roll_energy'))
    const attributeInstance = entity.getAttribute('block_factorys_bosses:roll_count')
    if (!attributeInstance) return
    attributeInstance.removeModifier(RollEnergyRollCountUpUUID)
    if (organScoreValue == 0) return
    attributeInstance.addPermanentModifier(
        new $AttributeModifier(
            RollEnergyRollCountUpUUID,
            RollEnergyRollCountUpIdentifier,
            organScoreValue,
            $Operation.ADDITION)
    )
}

RegistryOrganScoreAttribute('kubejs:roll_energy', RollEnergyRollCountUpdateOrganScore)
