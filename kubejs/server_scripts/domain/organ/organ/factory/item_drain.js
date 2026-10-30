// priority: 500

RegistryOrgan('kubejs:item_drain')
    .addScore('kubejs:stress', -1)
const itemDrainUUID = UUID.fromString('BEC13193-1626-7A02-C1E4-CE130630EBEF')
/**
 * 处理器官事件：entity_tick。
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function itemDrainEntityTick(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    ChangeItemDamage(organItem, 1)
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) return
    let aboveSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, -1]])
    if (aboveSlot.length == 0) return
    let aboveSlotDef = aboveSlot[0]
    let aboveSlotIndex = aboveSlotDef.getId()
    let inputItem = ccInv.getStackInSlot(aboveSlotIndex)
    if (inputItem.isEmpty()) return
    let outputItem = null
    let fluidToAdd = null
    let drainRecipe = itemDrainOrganRecipe(inputItem)
    let itemType = inputItem.getItem()
    if (drainRecipe != null) {
        outputItem = drainRecipe.output
        fluidToAdd = drainRecipe.fluidToAdd
    } else if (itemType instanceof $BucketItem) {
        if (itemType instanceof $MobBucketItem || itemType instanceof $sulfurcubebucketitem) return
        let fluid = inputItem.getId().replace('_bucket', '')
        outputItem = Item.of('minecraft:bucket')
        fluidToAdd = Fluid.of(fluid, 1000)
    } else return
    const beltEffect = GetFactoryBeltEffect(chestCavity)
    let bundleSource = organItem
    let targetIndex = -1
    let replaceInput = false
    if (beltEffect == 1) {
        const query = chestCavity.getOrganQueryIndex()
        const spoutIndex = query.hasItem('create:mechanical_pump', false, null)
            ? query.findItem('kubejs:spout', false, null) : -1
        if (spoutIndex >= 0) {
            let spoutItem = ccInv.getStackInSlot(spoutIndex)
            if (!spoutItem.isEmpty() && spoutItem.getId() == 'kubejs:spout') bundleSource = spoutItem
        }
        if (inputItem.getCount() == 1 && organItem.hasNBT() && organItem.getNbt().contains('otherbeltmode')) {
            targetIndex = aboveSlotIndex
            replaceInput = true
        } else {
            let outputSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[1, -1]])
            if (outputSlot.length == 0) return
            targetIndex = outputSlot[0].getId()
            let existingItem = ccInv.getStackInSlot(targetIndex)
            if (!CanMergeItemStacks(existingItem, outputItem, ccInv.getMaxStackSize())) return
        }
    }
    let contents = GetBundleContents(bundleSource)
    let bundleItem = contents[0]
    if (bundleItem == null) return
    // Fill a detached canister and commit only after the full amount is accepted.
    let tankHandler = GetItemFluidHandler(bundleItem.copy())
    if (!tankHandler) return
    let amount = fluidToAdd.getAmount()
    if (tankHandler.fill(fluidToAdd, 'simulate') != amount) return
    if (tankHandler.fill(fluidToAdd, 'execute') != amount) return
    bundleSource.getNbt().getList('Items', TAG_COMPOUND).set(0, tankHandler.getContainer().save(new $CompoundTag()))
    inputItem.shrink(1)
    ChangeItemDamage(organItem, -5)
    if (beltEffect == 1) {
        if (replaceInput) {
            let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
            SetChestCavityOrgan(customData, chestCavity, outputItem.copy(), targetIndex, targetSlotType, true)
        } else {
            SetChestCavityOutput(
                customData,
                chestCavity,
                outputItem,
                targetIndex,
                !chestCavity.getOrganQueryIndex().hasItem('kubejs:factory_heart', true, FactoryCoreSlot)
            )
        }
    } else {
        SpawnLootAtLocation(level, player.blockPosition(), [outputItem])
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
function itemDrainSwitch(customData, event, organItem, organIndex, slotType) {
    if (organItem.getDamageValue() == 100) {
        let stalePlayer = event.source.actual
        if (stalePlayer && stalePlayer.isPlayer()) {
            let staleAttribute = stalePlayer.getAttribute('attributeslib:life_steal')
            if (staleAttribute) staleAttribute.removeModifier(itemDrainUUID)
        }
        return
    }
    /**@type {Internal.LivingEntity} */
    const player = event.source.actual
    if (!player.isPlayer()) return
    const chestCavity = player.chestCavityInstance
    const attributeInstance = player.getAttribute('attributeslib:life_steal')
    if (!attributeInstance) return
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) {
        attributeInstance.removeModifier(itemDrainUUID)
        return
    }
    let remaining = organItem.getMaxDamage() - organItem.getDamageValue()
    attributeInstance.removeModifier(itemDrainUUID)
    let attributeModifier = new $AttributeModifier(itemDrainUUID, 'ItemDrain', (stressValue * remaining) / 10000, $Operation.ADDITION)
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
function itemDrainTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    const attributeInstance = entity.getAttribute('attributeslib:life_steal')
    if (attributeInstance) {
        attributeInstance.removeModifier(itemDrainUUID)
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
function itemDrainClearInvalidAttribute(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    if (organItem.getDamageValue() < organItem.getMaxDamage() && chestCavity.getOrganScore('kubejs:stress') >= 0) return
    const attribute = entity.getAttribute('attributeslib:life_steal')
    if (attribute) attribute.removeModifier(itemDrainUUID)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:item_drain')
        .addStrategy('entity_tick', itemDrainEntityTick)
        .addOnlyStrategy('entity_do_damage', itemDrainSwitch)
        .addOnlyStrategy('organ_take_off', itemDrainTakeOff)
        .addOnlyStrategy('entity_tick', itemDrainClearInvalidAttribute, -1)
        .addOnlyStrategy('chest_cavity_update', itemDrainClearInvalidAttribute, -1)
)

const itemDrainRecipes = []

/**
 * 注册分液器官的物品与流体产物。
 * @param {string | null} input
 * @param {{output: Internal.ItemStack, fluidToAdd: Internal.FluidStack}} output
 * @returns {void}
 */
function registerItemDrainRecipe(input, output) {
    itemDrainRecipes.push({
        input: input,
        output: output
    })
}

/**
 * 匹配分液配方并复制物品产物。
 * @param {Internal.ItemStack} inputItem
 * @returns {{output: Internal.ItemStack, fluidToAdd: Internal.FluidStack} | null}
 */
function itemDrainOrganRecipe(inputItem) {
    for (let recipe of itemDrainRecipes) {
        if (recipe.input != null) {
            if (inputItem != recipe.input) continue
        }

        return {
            output: recipe.output.output.copy(),
            fluidToAdd: recipe.output.fluidToAdd
        }
    }

    return null
}
registerItemDrainRecipe('kubejs:second_fabritem', {
    output: Item.of('kubejs:third_fabritem'),
    fluidToAdd: Fluid.of('kubejs:other_fluid', 1000)
})
registerItemDrainRecipe('kubejs:furnace_fabritem', {
    output: Item.of('kubejs:purgatory'),
    fluidToAdd: Fluid.of('minecraft:lava', 100)
})
registerItemDrainRecipe('kubejs:burning_fabritem', {
    output: Item.of('kubejs:purgatory'),
    fluidToAdd: Fluid.of('minecraft:lava', 500)
})
