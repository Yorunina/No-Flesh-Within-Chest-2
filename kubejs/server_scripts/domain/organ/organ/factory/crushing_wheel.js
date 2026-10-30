// priority: 500

RegistryOrgan('kubejs:crushing_wheel')
    .addScore('kubejs:stress', -1)
const crushingWheelUUID = UUID.fromString('10381375-F52C-FE3C-07EB-1853B244CCAA')
/**
 * 处理器官事件：entity_tick。
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function crushingWheelEntityTick(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const chestCavity = player.chestCavityInstance
    if (slotType == FastWorkingSlot) return
    ChangeItemDamage(organItem, 1)
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) return
    let groups = GetBundleIngredientGroups(organItem)
    if (groups.length != 1) {
        return
    }

    let curItem = groups[0].item
    if (curItem.isEmpty()) return
    let outputItemList = null
    let recipe = crushingWheelOrganRecipe(curItem)
    if (recipe == null) {
        outputItemList = GetProcessingRecipeResults(level, curItem, [$CreateRecipesType.CRUSHING, $CreateRecipesType.MILLING], chestCavity, organIndex)
    } else {
        outputItemList = recipe
    }
    if (outputItemList.length <= 0) return
    let firstOutput = outputItemList[0]
    let otherOutputs = []
    for (let i = 1; i < outputItemList.length; i++) {
        otherOutputs.push(outputItemList[i])
    }

    const beltEffect = GetFactoryBeltEffect(chestCavity)
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    if (beltEffect == 1) {
        if (groups[0].count == 1 && organItem.getNbt().contains('otherbeltmode')) {
            let belowSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, 1]])
            if (belowSlot.length == 0) return
            let belowItem = ccInv.getStackInSlot(belowSlot[0].getId())
            if (!belowItem.isEmpty()) return
            if (!ConsumeBundleIngredients(organItem, groups, [1])) return
            ChangeItemDamage(organItem, -5)
            let targetIndex = belowSlot[0].getId()
            let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
            SetChestCavityOrgan(customData, chestCavity, firstOutput.copy(), targetIndex, targetSlotType, true)
            if (otherOutputs.length > 0) {
                SpawnLootAtLocation(level, player.blockPosition(), otherOutputs)
            }
        } else {
            let outputSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[1, 1]])
            if (outputSlot.length == 0) return
            let outputItem = ccInv.getStackInSlot(outputSlot[0].getId())
            if (!CanMergeItemStacks(outputItem, firstOutput, ccInv.getMaxStackSize())) return

            if (!ConsumeBundleIngredients(organItem, groups, [1])) return
            ChangeItemDamage(organItem, -5)
            SetChestCavityOutput(customData, chestCavity, firstOutput, outputSlot[0].getId(), false)

            if (otherOutputs.length > 0) {
                SpawnLootAtLocation(level, player.blockPosition(), otherOutputs)
            }
        }
    } else {
        if (!ConsumeBundleIngredients(organItem, groups, [1])) return
        ChangeItemDamage(organItem, -5)
        SpawnLootAtLocation(level, player.blockPosition(), outputItemList)
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
function crushingWheelKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const chestCavity = player.chestCavityInstance
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) return
    if (slotType == FastWorkingSlot) {
        let groups = GetBundleIngredientGroups(organItem)
        if (groups.length != 1) {
            return
        }
        let curItem = groups[0].item
        if (curItem.isEmpty()) return
        let itemCount = groups[0].count
        let testItem = curItem.copy()
        testItem.setCount(1)
        let recipe = crushingWheelOrganRecipe(testItem)
        let outputItemList = null
        if (recipe == null) {
            outputItemList = GetProcessingRecipeResults(level, testItem, [$CreateRecipesType.CRUSHING, $CreateRecipesType.MILLING], chestCavity, organIndex)
        } else {
            outputItemList = recipe
        }
        if (outputItemList.length <= 0) return
        let fastOutputs = ScaleItemOutputs(outputItemList, itemCount)
        if (!ConsumeBundleIngredients(organItem, groups, [itemCount])) return
        SpawnLootAtLocation(level, player.blockPosition(), fastOutputs)
    }
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
function crushingWheelDamage(customData, event, organItem, organIndex, slotType) {
    if (organItem.getDamageValue() == 100) {
        let stalePlayer = event.source.actual
        if (stalePlayer && stalePlayer.isPlayer()) {
            let staleAttribute = stalePlayer.getAttribute('minecraft:generic.attack_damage')
            if (staleAttribute) staleAttribute.removeModifier(crushingWheelUUID)
        }
        return
    }
    /**@type {Internal.LivingEntity} */
    const player = event.source.actual
    if (!player.isPlayer()) return
    const chestCavity = player.chestCavityInstance
    const attributeInstance = player.getAttribute('minecraft:generic.attack_damage')
    if (!attributeInstance) return
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) {
        attributeInstance.removeModifier(crushingWheelUUID)
        return
    }
    let remaining = organItem.getMaxDamage() - organItem.getDamageValue()
    let mainhand = player.mainHandItem
    let isHoldingWrench = false
    if (!mainhand.isEmpty()) {
        if (mainhand.hasTag('forge:tools/wrench')) {
            isHoldingWrench = true
        }
    }
    if (isHoldingWrench) {
        attributeInstance.removeModifier(crushingWheelUUID)
        let attributeModifier = new $AttributeModifier(
            crushingWheelUUID,
            'CrushingWheel',
            (stressValue * remaining) / 2,
            $Operation.ADDITION
        )
        attributeInstance.addPermanentModifier(attributeModifier)
    } else {
        attributeInstance.removeModifier(crushingWheelUUID)
    }
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
function crushingWheelTakeOff(customData, event, organItem, organIndex, slotType) {
    ClearCachedNativeRecipe(event.entity.chestCavityInstance, organIndex)
    let attribute = event.entity.getAttribute('minecraft:generic.attack_damage')
    if (attribute) attribute.removeModifier(crushingWheelUUID)
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
function crushingWheelClearInvalidAttribute(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    let mainhand = entity.mainHandItem
    if (organItem.getDamageValue() < organItem.getMaxDamage() && chestCavity.getOrganScore('kubejs:stress') >= 0
        && !mainhand.isEmpty() && mainhand.hasTag('forge:tools/wrench')) return
    const attribute = entity.getAttribute('minecraft:generic.attack_damage')
    if (attribute) attribute.removeModifier(crushingWheelUUID)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:crushing_wheel')
        .addStrategy('entity_tick', crushingWheelEntityTick)
        .addOnlyStrategy('key_active', crushingWheelKeyActive)
        .addOnlyStrategy('entity_do_damage', crushingWheelDamage)
        .addOnlyStrategy('organ_take_off', crushingWheelTakeOff)
        .addOnlyStrategy('entity_tick', crushingWheelClearInvalidAttribute, -1)
        .addOnlyStrategy('chest_cavity_update', crushingWheelClearInvalidAttribute, -1)
)

const crushingRecipes = []

/**
 * @param {string|null} input
 * @param {Internal.ItemStack[]} output
 */
function registerCrushingRecipe(input, output) {
    crushingRecipes.push({
        input: input,
        output: output
    })
}

/**
 * @param {Internal.ItemStack} curItem
 * @returns {Internal.ItemStack[]|null}
 */
function crushingWheelOrganRecipe(curItem) {
    let list = []

    for (let recipe of crushingRecipes) {
        if (recipe.input != null) {
            if (curItem != recipe.input) continue
        }
        for (let item of recipe.output) {
            list.push(item.copy())
        }
        return list
    }

    return null
}

registerCrushingRecipe('kubejs:dried_taste_worm', [Item.of('kubejs:taste_worm_powder', 3)])
registerCrushingRecipe('minecraft:nether_wart_block', [Item.of('biomancy:nutrient_paste', 9), Item.of('biomancy:nutrient_paste', 9)])
