// priority: 500
RegistryOrgan('kubejs:mechanical_saw')
    .addScore('kubejs:stress', -1)
    .setRank(2)
    .setCanSpawn(false)
const mechanicalSawUUID = UUID.fromString('5925BB46-AA14-3CD5-2EAE-A6BFBBA6087C')
/**
 * 处理器官事件：entity_tick。
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function MechanicalSawEntityTick(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const chestCavity = player.chestCavityInstance
    if (slotType == FastWorkingSlot) return
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    ChangeItemDamage(organItem, 1)
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) return
    let belowSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, -1]])
    if (belowSlot.length == 0) return
    let curItem = ccInv.getStackInSlot(belowSlot[0].getId())
    if (curItem.isEmpty()) return
    let outputItem = null
    let recipe = mechanicalSawOrganRecipe(curItem)
    if (recipe == null) {
        let outputItemList = GetProcessingRecipeResults(level, curItem, [$CreateRecipesType.CUTTING], chestCavity, organIndex)
        if (outputItemList.length <= 0) return
        outputItem = outputItemList[0]
    } else {
        outputItem = recipe
    }
    const beltEffect = GetFactoryBeltEffect(chestCavity)
    if (beltEffect == 1) {
        if (curItem.getCount() == 1 && organItem.getNbt().contains('otherbeltmode')) {
            curItem.shrink(1)
            ChangeItemDamage(organItem, -5)
            let targetIndex = belowSlot[0].getId()
            let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
            SetChestCavityOrgan(customData, chestCavity, outputItem.copy(), targetIndex, targetSlotType, true)
        } else {
            let outputSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[1, -1]])
            if (outputSlot.length == 0) return
            let existingItem = ccInv.getStackInSlot(outputSlot[0].getId())
            if (!CanMergeItemStacks(existingItem, outputItem, ccInv.getMaxStackSize())) return

            curItem.shrink(1)
            ChangeItemDamage(organItem, -5)
            SetChestCavityOutput(customData, chestCavity, outputItem, outputSlot[0].getId(), true)
        }
    } else {
        curItem.shrink(1)
        ChangeItemDamage(organItem, -5)
        SpawnLootAtLocation(level, player.blockPosition(), [outputItem])
    }
}

/**
 * 处理器官事件：key_active。
 * @param {OrganEventCustomData} customData
 * @param {Internal.NetworkEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function MechanicalSawKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) return
    if (slotType == FastWorkingSlot) {
        let belowSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, -1]])
        if (belowSlot.length == 0) return
        let curItem = ccInv.getStackInSlot(belowSlot[0].getId())
        if (curItem.isEmpty()) return
        let itemCount = curItem.getCount()
        let testItem = curItem.copy()
        testItem.setCount(1)
            let outputItemList = GetProcessingRecipeResults(level, testItem, [$CreateRecipesType.CUTTING], chestCavity, organIndex)
        if (outputItemList.length <= 0) return
        let fastOutput = ScaleItemOutputs(outputItemList, itemCount)
        curItem.shrink(itemCount)
        SpawnLootAtLocation(level, player.blockPosition(), fastOutput)
    }
}

/**
 * 处理器官事件：block_right_clicked。
 * @param {OrganEventCustomData} customData
 * @param {Internal.BlockRightClickedEventJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function MechanicalSawBlockRightClicked(customData, event, organItem, organIndex, slotType) {
    const level = event.level
    const block = event.block
    if (event.hand != 'main_hand') return
    if (!event.item.isEmpty()) return
    let resultBlockState = $AxeItem.getAxeStrippingState(block.blockState)
    if (!resultBlockState) return
    level.playSound(null, block.pos.getX(), block.pos.getY(), block.pos.getZ(), 'item.axe.strip', 'blocks', 1, 1)
    level.setBlockAndUpdate(block.pos, resultBlockState)
}

/**
 * 处理器官事件：entity_tick。
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function MechanicalSawAttributeEntityTick(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    if (!player.isPlayer()) return
    if (organItem.getDamageValue() == 100) {
        let staleAttribute = player.getAttribute('attributeslib:armor_pierce')
        if (staleAttribute) staleAttribute.removeModifier(mechanicalSawUUID)
        return
    }
    const chestCavity = player.chestCavityInstance
    const attributeInstance = player.getAttribute('attributeslib:armor_pierce')
    if (!attributeInstance) return
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) {
        attributeInstance.removeModifier(mechanicalSawUUID)
        return
    }
    let remaining = organItem.getMaxDamage() - organItem.getDamageValue()
    attributeInstance.removeModifier(mechanicalSawUUID)
    let attributeModifier = new $AttributeModifier(mechanicalSawUUID, 'MechanicalSaw', (stressValue * remaining) / 200, $Operation.ADDITION)
    attributeInstance.addPermanentModifier(attributeModifier)
}

/**
 * 处理器官事件：organ_take_off。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function MechanicalSawOrganTakeOff(customData, event, organItem, organIndex, slotType) {
    ClearCachedNativeRecipe(event.entity.chestCavityInstance, organIndex)
    const { entity } = event
    const attributeInstance = entity.getAttribute('attributeslib:armor_pierce')
    if (attributeInstance) {
        attributeInstance.removeModifier(mechanicalSawUUID)
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:mechanical_saw')
        .addStrategy('entity_tick', MechanicalSawEntityTick)
        .addOnlyStrategy('key_active', MechanicalSawKeyActive)
        .addOnlyStrategy('block_right_clicked', MechanicalSawBlockRightClicked)
        .addOnlyStrategy('entity_tick', MechanicalSawAttributeEntityTick, -1)
        .addOnlyStrategy('organ_take_off', MechanicalSawOrganTakeOff)
)

const sawRecipes = []

/**
 * @param {string|null} input
 * @param {string} output
 */
function registerMechanicalSawRecipe(input, output) {
    sawRecipes.push({
        input: input,
        output: output
    })
}

/**
 * @param {Internal.ItemStack} curItem
 * @returns {Internal.ItemStack|null}
 */
function mechanicalSawOrganRecipe(curItem) {
    for (let recipe of sawRecipes) {
        if (recipe.input != null) {
            if (curItem != recipe.input) continue
        }

        return Item.of(recipe.output)
    }

    return null
}

registerMechanicalSawRecipe('kubejs:eternal_oath', 'kubejs:growing_oath')
registerMechanicalSawRecipe('kubejs:growing_oath', 'kubejs:immortal_oath')
registerMechanicalSawRecipe('kubejs:immortal_oath', 'kubejs:eternal_oath')
