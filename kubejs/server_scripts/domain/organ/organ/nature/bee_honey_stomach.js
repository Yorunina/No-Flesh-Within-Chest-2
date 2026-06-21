// priority: 500
RegistryOrgan('kubejs:bee_honey_stomach')
    .addScore('chestcavity:digestion', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.BlockRightClickedEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BeeHoneyStomachBlockRightClicked(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const block = event.block
    if (event.hand != 'main_hand') return
    if (!block.hasTag('minecraft:flowers')) return
    if (OrganItemCoolDown(player, organItem)) return
    let damage = organItem.getDamageValue()

    if (damage <= 0) {
        SpawnItemEntityWithMovement(event.level, player.blockPosition(), Item.of('minecraft:honeycomb', Math.floor(Math.random() * 3 + 1)), new Vec3d(0, 0, 0))
        organItem.setDamageValue(organItem.getMaxDamage())
        damage = organItem.getMaxDamage()
    } else {
        damage = damage - 1
        organItem.setDamageValue(damage)
    }
    let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - damage).toFixed(0))
    SetOrganEffect(player.chestCavityInstance, organEffect)
    player.addItemCooldown(organItem, 20 * 3)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BeeHoneyStomachOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (entity instanceof $ServerPlayer) {
        RemoveOrganEffect(chestCavity, 'kubejs:bee_honey_stomach')
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function BeeHoneyStomachOrganTakeOn(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (entity instanceof $ServerPlayer) {
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
    }
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:bee_honey_stomach')
        .addOnlyStrategy('organ_take_on', BeeHoneyStomachOrganTakeOn)
        .addOnlyStrategy('organ_take_off', BeeHoneyStomachOrganTakeOff)
        .addOnlyStrategy('block_right_clicked', BeeHoneyStomachBlockRightClicked)
)