// priority: 500

RegistryOrgan('kubejs:deployer')
    .addScore('kubejs:stress', -1)
/**
 * 处理器官事件：entity_tick。
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function deployerEntityTick(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
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
    let bundleGroups = GetBundleIngredientGroups(organItem)
    if (bundleGroups.length == 0) return
    let bundleItem = bundleGroups[0].item
    let outputItem = deployerOrganRecipe(curItem, bundleItem)
    if (outputItem == null) return
    const beltEffect = GetFactoryBeltEffect(chestCavity)
    if (beltEffect == 1) {
        if (curItem.getCount() == 1 && organItem.getNbt().contains('otherbeltmode')) {
            if (!bundleItem.hasTag('create:sandpaper') && !ConsumeBundleIngredients(organItem, [bundleGroups[0]], [1])) return
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

            if (!bundleItem.hasTag('create:sandpaper') && !ConsumeBundleIngredients(organItem, [bundleGroups[0]], [1])) return
            curItem.shrink(1)
            ChangeItemDamage(organItem, -5)
            SetChestCavityOutput(
                customData,
                chestCavity,
                outputItem,
                outputSlot[0].getId(),
                !chestCavity.getOrganQueryIndex().hasItem('kubejs:factory_heart', true, FactoryCoreSlot)
            )
        }
    } else {
        if (!bundleItem.hasTag('create:sandpaper') && !ConsumeBundleIngredients(organItem, [bundleGroups[0]], [1])) return
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
function deployerKeyActive(customData, event, organItem, organIndex, slotType) {
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
        let bundleGroups = GetBundleIngredientGroups(organItem)
        if (bundleGroups.length == 0) return
        let bundleItem = bundleGroups[0].item
        let bundleCount = bundleGroups[0].count
        let outputItem = deployerOrganRecipe(curItem, bundleItem)
        if (outputItem == null) return
        let consumesMaterial = !bundleItem.hasTag('create:sandpaper')
        let count = consumesMaterial ? Math.min(itemCount, bundleCount) : itemCount
        if (consumesMaterial && !ConsumeBundleIngredients(organItem, [bundleGroups[0]], [count])) return
        outputItem.setCount(count)
        curItem.shrink(count)
        SpawnLootAtLocation(level, player.blockPosition(), [outputItem])
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
function deployerBlockRightClicked(customData, event, organItem, organIndex, slotType) {
    const level = event.level
    const block = event.block
    const player = event.entity
    let fireTick = player.getRemainingFireTicks()
    if (fireTick < 400) return
    if (event.hand != 'main_hand') return
    if (!event.item.isEmpty()) return
    if (block.getId() != 'create:blaze_burner') return
    let blockState = block.getBlockState().toString()
    if (!blockState.includes('blaze=none')) return
    let newBlockState = Block.getBlock('create:blaze_burner').blockStates.find(s => s.toString().includes('blaze=smouldering'))
    fireTick = fireTick - 400
    player.setRemainingFireTicks(fireTick)
    level.playSound(null, block.pos.getX(), block.pos.getY(), block.pos.getZ(), 'block.fire.extinguish', 'blocks', 1, 1)
    level.setBlockAndUpdate(block.pos, newBlockState)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:deployer')
        .addStrategy('entity_tick', deployerEntityTick)
        .addOnlyStrategy('key_active', deployerKeyActive)
        .addOnlyStrategy('block_right_clicked', deployerBlockRightClicked)
)

const deployerRecipes = []

/**
 * @param {string|null} input1
 * @param {string|null} input1Tag
 * @param {string|null} input2
 * @param {string|null} input2Tag
 * @param {string} output
 */
function registerDeployerRecipe(input1, input1Tag, input2, input2Tag, output) {
    deployerRecipes.push({
        input1: input1,
        input1Tag: input1Tag,
        input2: input2,
        input2Tag: input2Tag,
        output: output
    })
}

/**
 * @param {Internal.ItemStack} curItem
 * @param {Internal.ItemStack} bundleItem
 * @returns {Internal.ItemStack|null}
 */
function deployerOrganRecipe(curItem, bundleItem) {
    for (let recipe of deployerRecipes) {
        if (recipe.input1 != null) {
            if (curItem != recipe.input1) continue
        } else {
            if (!curItem.hasTag(recipe.input1Tag)) continue
        }
        if (recipe.input2 != null) {
            if (bundleItem != recipe.input2) continue
        } else {
            if (!bundleItem.hasTag(recipe.input2Tag)) continue
        }

        return Item.of(recipe.output)
    }

    return null
}

registerDeployerRecipe('kubejs:third_fabritem', null, 'kubejs:other_fabritem', null, 'kubejs:fourth_fabritem')
registerDeployerRecipe(null, 'forge:stripped_logs', 'create:brass_ingot', null, 'create:brass_casing')
registerDeployerRecipe(null, 'forge:stripped_logs', 'minecraft:copper_ingot', null, 'create:copper_casing')
registerDeployerRecipe(null, 'forge:stripped_logs', 'create:andesite_alloy', null, 'create:andesite_casing')
registerDeployerRecipe('create:rose_quartz', null, null, 'create:sandpaper', 'create:polished_rose_quartz')
registerDeployerRecipe('kubejs:search_everything', null, 'kubejs:final_fabritem', null, 'kubejs:factory_heart')
registerDeployerRecipe('tetra:geode', null, 'create_connected:control_chip', null, 'kubejs:ore_vein_generator')
registerDeployerRecipe('create:brass_hand', null, 'create:iron_sheet', null, 'kubejs:telescopic_arm')
registerDeployerRecipe('kubejs:telescopic_arm', null, 'minecraft:gunpowder', null, 'kubejs:telescopic_attack_arm')
registerDeployerRecipe('kubejs:telescopic_attack_arm', null, 'minecraft:blaze_powder', null, 'kubejs:pressurized_arm')
registerDeployerRecipe('minecraft:writable_book', null, 'minecraft:glowstone_dust', null, 'kubejs:world_token_creative')
registerDeployerRecipe('minecraft:writable_book', null, 'minecraft:redstone', null, 'kubejs:world_token_gamerule')
registerDeployerRecipe('minecraft:writable_book', null, 'minecraft:prismarine_crystals', null, 'kubejs:world_token_weather')
registerDeployerRecipe('minecraft:amethyst_shard', null, null, 'create:sandpaper', 'createutilities:polished_amethyst')
registerDeployerRecipe('kubejs:twinkle_rib', null, null, 'create:sandpaper', 'kubejs:twinkle_rib')
registerDeployerRecipe('minecraft:obsidian', null, 'createutilities:void_steel_ingot', null, 'createutilities:void_casing')
registerDeployerRecipe('kubejs:witch_fibroma', null, 'supplementaries:jar', null, 'kubejs:machine_witch_fibroma')
