//priority: 1001
const WitnessStrategy = new StrategyModel()
/**
 * 
 * @param {Internal.LivingDamageEvent} event 
 * @param {*} customData 
 */
function WitnessCuriosEntityBeHurt(event, customData) {
    const source = event.source.actual
    if (!source || !source.isPlayer()) return

    let curiosItemHandler = GetCuriosInventoryCap(source)
    let witnessStackOpt = curiosItemHandler.getStacksHandler('witness')
    if (!witnessStackOpt.isPresent()) return

    let witnessStackHandler = witnessStackOpt.get()
    let witnessStacks = witnessStackHandler.getStacks()

    if (witnessStacks.getSlots() <= 0) return

    for (let i = 0; i < witnessStacks.getSlots(); i++) {
        let pItem = witnessStacks.getStackInSlot(i)
        if (!pItem || pItem.isEmpty()) continue
        WitnessStrategy.run([String(pItem.getId())], [event, witnessStacks, pItem, i], customData)
    }
    
}

function RegistryWitnessStrategy(id, func) {
    WitnessStrategy.addStrategy(id, func)
}

