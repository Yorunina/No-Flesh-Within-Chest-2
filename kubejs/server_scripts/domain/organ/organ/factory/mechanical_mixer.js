// priority: 500

RegistryOrgan('kubejs:mechanical_mixer')
    .addScore('kubejs:stress', -1)
const mechanicalMixerUUID = UUID.fromString('8FF6968C-B438-4F7E-B5F5-C8965141B0E4')
/**
 * 处理器官事件：entity_tick。
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function mechanicalMixerEntityTick(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    ChangeItemDamage(organItem, 1)
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) return
    let basinSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, 2]])
    if (basinSlot.length == 0) return
    let basinItem = ccInv.getStackInSlot(basinSlot[0].getId())
    if (basinItem.getId() != 'kubejs:basin') return
    let groups = GetBundleIngredientGroups(basinItem)
    if (groups.length == 0 || groups.length > 2) return
    let curItem = groups[0].item
    let curItem1 = groups.length == 2 ? groups[1].item : null
    let outputItemList = mechanicalMixerOrganRecipe(event, curItem, curItem1)
    if (outputItemList == null) return
    let outputItem = outputItemList[0]
    let outputItem1 = outputItemList[1]
    const beltEffect = GetFactoryBeltEffect(chestCavity)
    if (beltEffect == 1) {
        if (groups.length == 1 && groups[0].count == 1 && organItem.hasNBT() && organItem.getNbt().contains('otherbeltmode')) {
            if (!ConsumeBundleIngredients(basinItem, groups, [1])) return
            ChangeItemDamage(organItem, -5)
            AddItemIntoBundle(basinItem, outputItem, 1, pStack => pStack.getMaxStackSize() / 64)
            if (outputItem1 && !outputItem1.isEmpty()) SpawnLootAtLocation(level, player.blockPosition(), [outputItem1])
        } else {
            let outputSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[1, 1]])
            if (outputSlot.length == 0) return
            let existingItem = ccInv.getStackInSlot(outputSlot[0].getId())
            if (!CanMergeItemStacks(existingItem, outputItem, ccInv.getMaxStackSize())) return
            if (!ConsumeBundleIngredients(basinItem, groups, groups.map(group => 1))) return
            ChangeItemDamage(organItem, -5)
            SetChestCavityOutput(
                customData,
                chestCavity,
                outputItem,
                outputSlot[0].getId(),
                !chestCavity.getOrganQueryIndex().hasItem('kubejs:factory_heart', true, FactoryCoreSlot)
            )
            if (outputItem1 != null) {
                if (outputItem1.getId() == 'kubejs:other_fabritem') {
                    let query = chestCavity.getOrganQueryIndex()
                    let deployerIndex = query.findItem('kubejs:deployer', false, null)
                    let deployerItem = deployerIndex < 0 ? null : ccInv.getStackInSlot(deployerIndex)
                    if (query.hasItem('create:package_frogport', false, null) && deployerItem && deployerItem.getCount() == 1 && deployerItem.getId() == 'kubejs:deployer') {
                        let remainder = outputItem1.copy()
                        let available = 64 - GetBundleCountentWeight(deployerItem, pStack => 1)
                        if (available > 0) {
                            let candidate = remainder.copyWithCount(Math.min(remainder.getCount(), available))
                            let insertedCount = AddItemIntoBundle(deployerItem, candidate, 64, pStack => pStack.getMaxStackSize() / 64)
                            remainder.shrink(insertedCount)
                        }
                        if (!remainder.isEmpty()) SpawnLootAtLocation(level, player.blockPosition(), [remainder])
                    } else {
                        SpawnLootAtLocation(level, player.blockPosition(), [outputItem1])
                    }
                } else {
                    SpawnLootAtLocation(level, player.blockPosition(), [outputItem1])
                }
            }
        }
    } else {
        if (!ConsumeBundleIngredients(basinItem, groups, groups.map(group => 1))) return
        ChangeItemDamage(organItem, -5)
        let lootList = []
        outputItemList.forEach(item => {
            if (item && !item.isEmpty()) lootList.push(item)
        })
        if (lootList.length > 0) SpawnLootAtLocation(level, player.blockPosition(), lootList)
    }
}

/**
 * 处理器官事件：entity_be_hurt。
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function mechanicalMixerSwitch(customData, event, organItem, organIndex, slotType) {
    if (organItem.getDamageValue() == 100) {
        let staleAttribute = event.entity.getAttribute('minecraft:generic.armor')
        if (staleAttribute) staleAttribute.removeModifier(mechanicalMixerUUID)
        return
    }
    const player = event.entity
    if (!player.isPlayer()) return
    const chestCavity = player.chestCavityInstance
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) {
        let staleAttribute = player.getAttribute('minecraft:generic.armor')
        if (staleAttribute) staleAttribute.removeModifier(mechanicalMixerUUID)
        return
    }
    let remaining = organItem.getMaxDamage() - organItem.getDamageValue()
    let value = stressValue * Math.ceil(remaining / 10) * 0.5

    const attributeInstance = player.getAttribute('minecraft:generic.armor')
    if (!attributeInstance) return

    attributeInstance.removeModifier(mechanicalMixerUUID)
    let attributeModifier = new $AttributeModifier(mechanicalMixerUUID, 'MechanicalMixer', value, $Operation.ADDITION)
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
function mechanicalMixerTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    const attributeInstance = entity.getAttribute('minecraft:generic.armor')
    if (attributeInstance) {
        attributeInstance.removeModifier(mechanicalMixerUUID)
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
function mechanicalMixerClearInvalidAttribute(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    if (organItem.getDamageValue() < organItem.getMaxDamage() && chestCavity.getOrganScore('kubejs:stress') >= 0) return
    const attribute = entity.getAttribute('minecraft:generic.armor')
    if (attribute) attribute.removeModifier(mechanicalMixerUUID)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:mechanical_mixer')
        .addStrategy('entity_tick', mechanicalMixerEntityTick)
        .addOnlyStrategy('entity_be_hurt', mechanicalMixerSwitch, 1)
        .addOnlyStrategy('organ_take_off', mechanicalMixerTakeOff, 1)
        .addOnlyStrategy('entity_tick', mechanicalMixerClearInvalidAttribute, -1)
        .addOnlyStrategy('chest_cavity_update', mechanicalMixerClearInvalidAttribute, -1)
)

const mixerRecipes = []

/**
 * @param {string|null} input1
 * @param {string|null} input1Tag
 * @param {string|null} input2
 * @param {string|null} organ
 * @param {string[]} outputs
 */
function registerMixerRecipe(input1, input1Tag, input2, organ, outputs) {
    mixerRecipes.push({
        input1: input1,
        input1Tag: input1Tag,
        input2: input2,
        organ: organ,
        outputs: outputs
    })
}

/**
 * 按物品与胸腔器官条件匹配搅拌配方。
 * @param {Internal.OpenedEntityTickJS} event
 * @param {Internal.ItemStack} curItem
 * @param {Internal.ItemStack | null} curItem1
 * @returns {Internal.ItemStack[] | null}
 */
function mechanicalMixerOrganRecipe(event, curItem, curItem1) {
    const player = event.entity
    const chestCavity = player.chestCavityInstance
    for (let recipe of mixerRecipes) {
        if (recipe.input1 != null) {
            if (curItem != recipe.input1) continue
        } else {
            if (!curItem.hasTag(recipe.input1Tag)) continue
        }
        if (recipe.input2 != null) {
            if (curItem1 != recipe.input2) continue
        } else {
            if (curItem1 != null) continue
        }
        if (recipe.organ && !chestCavity.getOrganQueryIndex().hasItem(recipe.organ, false, null)) continue
        return recipe.outputs.map(id => Item.of(id))
    }
    return null
}

registerMixerRecipe('kubejs:first_fabritem', null, null, null, ['kubejs:second_fabritem', 'kubejs:other_fabritem'])
registerMixerRecipe(null, 'create:pulpifiable', null, null, ['create:pulp'])
registerMixerRecipe('minecraft:andesite', null, 'minecraft:iron_nugget', null, ['create:andesite_alloy'])
registerMixerRecipe('minecraft:andesite', null, 'create:zinc_nugget', null, ['create:andesite_alloy'])
registerMixerRecipe('minecraft:copper_ingot', null, 'create:zinc_ingot', 'kubejs:furnace_core', ['2x create:brass_ingot'])
registerMixerRecipe('create:brass_ingot', null, 'biomancy:living_flesh', 'kubejs:burning_heart', ['kubejs:flesh_ingot'])
registerMixerRecipe('create:crushed_raw_zinc', null, 'minecraft:stone', 'kubejs:burning_heart', ['create:asurine'])
registerMixerRecipe('minecraft:iron_ingot', null, 'minecraft:end_stone', 'kubejs:furnace_core', ['createutilities:void_steel_ingot'])
registerMixerRecipe('kubejs:purgatory', null, null, 'kubejs:furnace_core', ['kubejs:furnace_fabritem'])
registerMixerRecipe('kubejs:purgatory', null, null, 'kubejs:burning_heart', ['kubejs:burning_fabritem'])
