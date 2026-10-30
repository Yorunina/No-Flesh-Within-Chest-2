// priority: 500
RegistryOrgan('kubejs:mechanical_saw')
    .addScore('kubejs:stress', -1)
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
function mechanicalSawEntityTick(customData, event, organItem, organIndex, slotType) {
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
function mechanicalSawKeyActive(customData, event, organItem, organIndex, slotType) {
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
function mechanicalSawBlockRightClicked(customData, event, organItem, organIndex, slotType) {
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
 * 处理器官事件：entity_do_damage。
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function mechanicalSawSwitch(customData, event, organItem, organIndex, slotType) {
    if (organItem.getDamageValue() == 100) {
        let stalePlayer = event.source.actual
        if (stalePlayer && stalePlayer.isPlayer()) {
            let staleAttribute = stalePlayer.getAttribute('attributeslib:armor_pierce')
            if (staleAttribute) staleAttribute.removeModifier(mechanicalSawUUID)
        }
        return
    }
    /**@type {Internal.LivingEntity} */
    const player = event.source.actual
    if (!player.isPlayer()) return
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
function mechanicalSawTakeOff(customData, event, organItem, organIndex, slotType) {
    ClearCachedNativeRecipe(event.entity.chestCavityInstance, organIndex)
    const { entity } = event
    const attributeInstance = entity.getAttribute('attributeslib:armor_pierce')
    if (attributeInstance) {
        attributeInstance.removeModifier(mechanicalSawUUID)
    }
}

/**
 * 处理器官事件：entity_tick / chest_cavity_update。
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS | Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function mechanicalSawClearInvalidAttribute(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    if (organItem.getDamageValue() < organItem.getMaxDamage() && chestCavity.getOrganScore('kubejs:stress') >= 0) return
    const attribute = entity.getAttribute('attributeslib:armor_pierce')
    if (attribute) attribute.removeModifier(mechanicalSawUUID)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:mechanical_saw')
        .addStrategy('entity_tick', mechanicalSawEntityTick)
        .addOnlyStrategy('key_active', mechanicalSawKeyActive)
        .addOnlyStrategy('block_right_clicked', mechanicalSawBlockRightClicked)
        .addOnlyStrategy('entity_do_damage', mechanicalSawSwitch)
        .addOnlyStrategy('organ_take_off', mechanicalSawTakeOff)
        .addOnlyStrategy('entity_tick', mechanicalSawClearInvalidAttribute, -1)
        .addOnlyStrategy('chest_cavity_update', mechanicalSawClearInvalidAttribute, -1)
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
