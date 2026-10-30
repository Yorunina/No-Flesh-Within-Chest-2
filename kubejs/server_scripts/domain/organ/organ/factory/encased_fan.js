// priority: 500

RegistryOrgan('kubejs:encased_fan')
    .addScore('kubejs:stress', -1)
const encasedFanUUID = UUID.fromString('57FB6D2E-FBD6-3588-1674-40F15BB04088')

/**
 * 处理器官事件：entity_tick。
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function encasedFanEntityTick(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const registryAccess = level.registryAccess()
    const chestCavity = player.chestCavityInstance
    if (slotType == FastWorkingSlot) return
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    ChangeItemDamage(organItem, 1)
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) return
    let belowSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, 1]])
    if (belowSlot.length == 0) return
    let curItem = ccInv.getStackInSlot(belowSlot[0].getId())
    if (curItem.isEmpty()) return
    let recipe = encasedFanOrganRecipe(curItem)
    let outputItem = null
    if (recipe == null) {
        let smeltingRecipe = GetSmeltingRecipe(level, curItem, chestCavity, organIndex)
        if (!smeltingRecipe) {
            if (curItem.getId() == 'kubejs:throat_fabritem' && curItem.hasNBT()) {
                if (!curItem.getNbt().contains('greedyThroatUUID')) return
                outputItem = Item.of('kubejs:throat_fabritem')
            } else return
        } else {
            outputItem = smeltingRecipe.getResultItem(registryAccess).copy()
            if (outputItem.isEmpty()) return
        }
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
            SetChestCavityOutput(
                customData,
                chestCavity,
                outputItem,
                outputSlot[0].getId(),
                !chestCavity.getOrganQueryIndex().hasItem('kubejs:factory_heart', true, FactoryCoreSlot)
            )
            if (slotType == DigestSlot) encasedFanResetGreedyThroatCooldown(player, chestCavity)
        }
    } else {
        curItem.shrink(1)
        ChangeItemDamage(organItem, -5)
        SpawnLootAtLocation(level, player.blockPosition(), [outputItem])
        if (slotType == DigestSlot) encasedFanResetGreedyThroatCooldown(player, chestCavity)
    }
}

/**
 * 重置玩家胸腔中贪婪喉的冷却。
 * @param {Internal.LivingEntity} player
 * @param {Internal.ChestCavityInstance} chestCavity
 * @returns {void}
 */
function encasedFanResetGreedyThroatCooldown(player, chestCavity) {
    if (!player.isPlayer()) return
    const throatIndex = chestCavity.getOrganQueryIndex().findItem('kubejs:greedy_throat', false, null)
    if (throatIndex < 0) return
    const throatItem = chestCavity.inventory.getStackInSlot(throatIndex)
    if (!throatItem.isEmpty() && throatItem.getId() == 'kubejs:greedy_throat') {
        player.addItemCooldown(throatItem, 0)
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
function encasedFanKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const registryAccess = level.registryAccess()
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
        let recipe = encasedFanOrganRecipe(curItem)
        let outputItem = null
        if (recipe == null) {
            let smeltingRecipe = GetSmeltingRecipe(level, curItem, chestCavity, organIndex)
            if (!smeltingRecipe) return
            outputItem = smeltingRecipe.getResultItem(registryAccess).copy()
            if (outputItem.isEmpty()) return
        } else {
            outputItem = recipe
        }
        outputItem.setCount(itemCount)

        curItem.shrink(itemCount)
        SpawnLootAtLocation(level, player.blockPosition(), [outputItem])
    }
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
function encasedFanSwitch(customData, event, organItem, organIndex, slotType) {
    if (organItem.getDamageValue() == 100) {
        let staleAttribute = event.entity.getAttribute('ars_nouveau:ars_nouveau.perk.mana_regen')
        if (staleAttribute) staleAttribute.removeModifier(encasedFanUUID)
        return
    }
    const player = event.entity
    if (!player.isPlayer()) return
    const level = player.level
    const chestCavity = event.chestCavity
    if (slotType == DigestSlot) {
        ChangeItemDamage(organItem, -5)
    }
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) {
        let staleAttribute = player.getAttribute('ars_nouveau:ars_nouveau.perk.mana_regen')
        if (staleAttribute) staleAttribute.removeModifier(encasedFanUUID)
        return
    }
    let remaining = organItem.getMaxDamage() - organItem.getDamageValue()
    const fanEffect = encasedFanMode(organItem)
    if (fanEffect == 1) {
        let fireTick = player.getRemainingFireTicks()
        if (remaining != 0) {
            fireTick = fireTick + (stressValue * remaining) / 2
            player.setRemainingFireTicks(fireTick)
        } else {
            player.setRemainingFireTicks(0)
        }
    } else if (fanEffect == 2) {
        if (stressValue < 5) return
        if (remaining < 90) return
        if (player.age % 200 != 0) return
        RecoverPlayerHungerAndSaturation(player, 20)
    } else if (fanEffect == 3) {
        const attributeInstance = event.entity.getAttribute('ars_nouveau:ars_nouveau.perk.mana_regen')
        if (!attributeInstance) return
        let stressValue = chestCavity.getOrganScore('kubejs:stress')
        let remaining = organItem.getMaxDamage() - organItem.getDamageValue()
        attributeInstance.removeModifier(encasedFanUUID)
        let attributeModifier = new $AttributeModifier(encasedFanUUID, 'Encasedfan', (stressValue * remaining) / 100, $Operation.ADDITION)
        attributeInstance.addPermanentModifier(attributeModifier)
    } else if (fanEffect == 4) {
        if (stressValue < 2) return
        if (!player.isCrouching()) return
        const blockPos = event.entity.blockPosition()
        const radius = Math.min(16, Math.floor(stressValue / 2))
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dz = -radius; dz <= radius; dz++) {
                    TryBonemeal(level, blockPos.offset(dx, dy, dz), player, 'minecraft:happy_villager', true)
                }
            }
        }
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
function encasedFanTakeOff(customData, event, organItem, organIndex, slotType) {
    ClearCachedNativeRecipe(event.entity.chestCavityInstance, organIndex)
    const { entity } = event
    const attributeInstance = entity.getAttribute('ars_nouveau:ars_nouveau.perk.mana_regen')
    if (attributeInstance) {
        attributeInstance.removeModifier(encasedFanUUID)
    }
}

/**
 * @param {Internal.ItemStack} organItem
 * @returns {number}
 */
function encasedFanMode(organItem) {
    let catalyst = GetBundleContents(organItem)[0]
    if (!catalyst || catalyst.isEmpty()) return 0
    switch (String(catalyst.getId())) {
        case 'create_connected:fan_blasting_catalyst': return 1
        case 'create_connected:fan_smoking_catalyst': return 2
        case 'create_connected:fan_haunting_catalyst': return 3
        case 'create_connected:fan_splashing_catalyst': return 4
    }
    return 0
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
function encasedFanClearInvalidAttribute(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    if (organItem.getDamageValue() < organItem.getMaxDamage() && chestCavity.getOrganScore('kubejs:stress') >= 0
        && encasedFanMode(organItem) == 3) return
    const attribute = entity.getAttribute('ars_nouveau:ars_nouveau.perk.mana_regen')
    if (attribute) attribute.removeModifier(encasedFanUUID)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:encased_fan')
        .addStrategy('entity_tick', encasedFanEntityTick)
        .addOnlyStrategy('key_active', encasedFanKeyActive)
        .addOnlyStrategy('entity_tick', encasedFanSwitch)
        .addOnlyStrategy('organ_take_off', encasedFanTakeOff)
        .addOnlyStrategy('entity_tick', encasedFanClearInvalidAttribute, -1)
        .addOnlyStrategy('chest_cavity_update', encasedFanClearInvalidAttribute, -1)
)

const encasedFanRecipes = []

/**
 * @param {string|null} input
 * @param {string} output
 */
function registerEncasedFanRecipe(input, output) {
    encasedFanRecipes.push({
        input: input,
        output: output
    })
}

/**
 * @param {Internal.ItemStack} curItem
 * @returns {Internal.ItemStack|null}
 */
function encasedFanOrganRecipe(curItem) {
    for (let recipe of encasedFanRecipes) {
        if (recipe.input != null) {
            if (curItem != recipe.input) continue
        }

        return Item.of(recipe.output)
    }

    return null
}

registerEncasedFanRecipe('minecraft:ink_sac', 'minecraft:glow_ink_sac')
registerEncasedFanRecipe('minecraft:sweet_berries', 'minecraft:glow_berries')
registerEncasedFanRecipe('minecraft:red_mushroom', 'minecraft:crimson_fungus')
registerEncasedFanRecipe('minecraft:brown_mushroom', 'minecraft:warped_fungus')
registerEncasedFanRecipe('create:wheat_flour', 'create:dough')
