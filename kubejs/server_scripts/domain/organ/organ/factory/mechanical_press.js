// priority: 500

RegistryOrgan('kubejs:mechanical_press')
    .addScore('kubejs:stress', -1)
const mechanicalPressUUID = UUID.fromString('6E1F5205-9D0F-3A3C-B61E-675E162ABD55')

/**
 * 处理器官事件：entity_tick。
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function mechanicalPressEntityTick(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const chestCavity = player.chestCavityInstance
    if (slotType == FastWorkingSlot) return
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    ChangeItemDamage(organItem, 1)
    if (slotType == MachinaryLubricant) {
        let organEffect = new OragnEffectModel(organItem)
            .setPriority(organIndex)
            .setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
        return
    }
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) return
    let belowSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, 1]])
    if (belowSlot.length == 0) return
    let curItem = ccInv.getStackInSlot(belowSlot[0].getId())
    if (curItem.isEmpty()) return
    let outputItem = null
    let recipe = mechanicalPressOrganRecipe(curItem)
    if (recipe == null) {
        let outputItemList = GetProcessingRecipeResults(level, curItem, [$CreateRecipesType.PRESSING], chestCavity, organIndex)
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
            let outputSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[1, 1]])
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
function mechanicalPressKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) return
    if (slotType == FastWorkingSlot) {
        let belowSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, 1]])
        if (belowSlot.length == 0) return
        let curItem = ccInv.getStackInSlot(belowSlot[0].getId())
        if (curItem.isEmpty()) return
        let itemCount = curItem.getCount()
        let testItem = curItem.copy()
        testItem.setCount(1)
        let recipe = mechanicalPressOrganRecipe(testItem)
        if (recipe == null) {
            let outputItemList = GetProcessingRecipeResults(level, testItem, [$CreateRecipesType.PRESSING], chestCavity, organIndex)
            if (outputItemList.length <= 0) return
            let fastOutput = ScaleItemOutputs(outputItemList, itemCount)
            curItem.shrink(itemCount)
            SpawnLootAtLocation(level, player.blockPosition(), fastOutput)
        } else {
            let outputItem = recipe
            outputItem.setCount(itemCount)
            curItem.shrink(itemCount)
            SpawnLootAtLocation(level, player.blockPosition(), [outputItem])
        }
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
function mechanicalPressSwitch(customData, event, organItem, organIndex, slotType) {
    if (organItem.getDamageValue() == 100) {
        let stalePlayer = event.source.actual
        if (stalePlayer && stalePlayer.isPlayer()) {
            let staleAttribute = stalePlayer.getAttribute('minecraft:generic.attack_damage')
            if (staleAttribute) staleAttribute.removeModifier(mechanicalPressUUID)
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
        attributeInstance.removeModifier(mechanicalPressUUID)
        return
    }
    let remaining = organItem.getMaxDamage() - organItem.getDamageValue()
    attributeInstance.removeModifier(mechanicalPressUUID)
    let attributeModifier = new $AttributeModifier(
        mechanicalPressUUID,
        'MechanicalPress',
        (stressValue * remaining) / 4,
        $Operation.ADDITION
    )
    attributeInstance.addPermanentModifier(attributeModifier)
}

/**
 * 处理器官事件：organ_take_on。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function mechanicalPressTakeOn(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const chestCavity = player.chestCavityInstance
    if (slotType == MachinaryLubricant) {
        let organEffect = new OragnEffectModel(organItem)
            .setPriority(organIndex)
            .setCustomText((organItem.getMaxDamage() - organItem.getDamageValue()).toFixed(0))
        SetOrganEffect(chestCavity, organEffect)
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
function mechanicalPressTakeOff(customData, event, organItem, organIndex, slotType) {
    ClearCachedNativeRecipe(event.entity.chestCavityInstance, organIndex)
    const { entity } = event
    const player = event.entity
    const chestCavity = player.chestCavityInstance
    RemoveOrganEffect(chestCavity, 'kubejs:mechanical_press')
    const attributeInstance = entity.getAttribute('minecraft:generic.attack_damage')
    if (attributeInstance) {
        attributeInstance.removeModifier(mechanicalPressUUID)
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
function mechanicalPressClearInvalidAttribute(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    if (organItem.getDamageValue() < organItem.getMaxDamage() && chestCavity.getOrganScore('kubejs:stress') >= 0) return
    const attribute = entity.getAttribute('minecraft:generic.attack_damage')
    if (attribute) attribute.removeModifier(mechanicalPressUUID)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:mechanical_press')
        .addStrategy('entity_tick', mechanicalPressEntityTick)
        .addOnlyStrategy('entity_do_damage', mechanicalPressSwitch)
        .addOnlyStrategy('organ_take_on', mechanicalPressTakeOn)
        .addOnlyStrategy('organ_take_off', mechanicalPressTakeOff)
        .addOnlyStrategy('key_active', mechanicalPressKeyActive)
        .addOnlyStrategy('entity_tick', mechanicalPressClearInvalidAttribute, -1)
        .addOnlyStrategy('chest_cavity_update', mechanicalPressClearInvalidAttribute, -1)
)

const pressRecipes = []

/**
 * @param {string|null} input
 * @param {string} output
 */
function registerPressRecipe(input, output) {
    pressRecipes.push({
        input: input,
        output: output
    })
}

/**
 * @param {Internal.ItemStack} curItem
 * @returns {Internal.ItemStack|null}
 */
function mechanicalPressOrganRecipe(curItem) {
    for (let recipe of pressRecipes) {
        if (recipe.input != null) {
            if (curItem != recipe.input) continue
        }

        return Item.of(recipe.output)
    }

    return null
}

registerPressRecipe('kubejs:final_fabritem', 'kubejs:first_fabritem')
registerPressRecipe('biomancy:living_flesh', 'kubejs:flesh_sheet')
