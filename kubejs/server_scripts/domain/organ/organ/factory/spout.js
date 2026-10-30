// priority: 500

RegistryOrgan('kubejs:spout')
    .addScore('kubejs:stress', -1)
const spoutUUID = UUID.fromString('712EA98A-C8AD-6AAF-5B11-656D0EED2DE9')
/**
 * 处理器官事件：entity_tick。
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function spoutEntityTick(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const level = player.level
    const chestCavity = player.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    ChangeItemDamage(organItem, 1)
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) return
    let aboveSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[0, 1]])
    if (aboveSlot.length == 0) return
    let aboveSlotDef = aboveSlot[0]
    let aboveSlotIndex = aboveSlotDef.getId()
    let inputItem = ccInv.getStackInSlot(aboveSlotIndex)
    if (inputItem.isEmpty()) return
    let contents = GetBundleContents(organItem)
    if (contents.length == 0) return
    // Drain a detached canister; failed simulation/execution cannot alter the source.
    let bundleItem = contents[0].copy()
    if (bundleItem.getId() != 'createdieselgenerators:canister') return
    let tankHandler = GetItemFluidHandler(bundleItem)
    if (!tankHandler) return
    let tankFluid = tankHandler.getFluid()
    let spoutRecipe = spoutOrganRecipe(inputItem, tankHandler)
    if (spoutRecipe == null) return
    let outputItem = spoutRecipe.output
    let fluidToRemove = spoutRecipe.fluidToRemove
    const beltEffect = GetFactoryBeltEffect(chestCavity)
    let targetIndex = -1
    let replaceInput = false
    if (beltEffect == 1) {
        if (inputItem.getCount() == 1 && organItem.hasNBT() && organItem.getNbt().contains('otherbeltmode')) {
            targetIndex = aboveSlotIndex
            replaceInput = true
        } else {
            let outputSlot = GetDirectionRelativeSlotByParam(invTypeData, organIndex, [[1, 1]])
            if (outputSlot.length == 0) return
            targetIndex = outputSlot[0].getId()
            let existingItem = ccInv.getStackInSlot(targetIndex)
            if (!CanMergeItemStacks(existingItem, outputItem, ccInv.getMaxStackSize())) return
        }
    }
    // Quantity is an execution condition, not part of recipe identity.
    if (!tankFluid.containsFluid(fluidToRemove)) return
    let simulated = tankHandler.drain(fluidToRemove, 'simulate')
    if (!simulated || simulated.getAmount() != fluidToRemove.getAmount() || !simulated.isFluidEqual(fluidToRemove)) return
    let drained = tankHandler.drain(fluidToRemove, 'execute')
    if (!drained || drained.getAmount() != fluidToRemove.getAmount() || !drained.isFluidEqual(fluidToRemove)) return

    organItem.getNbt().getList('Items', TAG_COMPOUND).set(0, tankHandler.getContainer().save(new $CompoundTag()))
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
 * 处理器官事件：entity_be_hurt。
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function spoutSwitch(customData, event, organItem, organIndex, slotType) {
    if (organItem.getDamageValue() == 100) {
        let staleAttribute = event.entity.getAttribute('minecraft:generic.max_health')
        if (staleAttribute) staleAttribute.removeModifier(spoutUUID)
        return
    }
    const player = event.entity
    const chestCavity = player.chestCavityInstance
    let stressValue = chestCavity.getOrganScore('kubejs:stress')
    if (stressValue < 0) {
        let staleAttribute = player.getAttribute('minecraft:generic.max_health')
        if (staleAttribute) staleAttribute.removeModifier(spoutUUID)
        return
    }
    let remaining = organItem.getMaxDamage() - organItem.getDamageValue()
    let value = remaining / 10
    const attributeInstance = player.getAttribute('minecraft:generic.max_health')
    if (!attributeInstance) return
    attributeInstance.removeModifier(spoutUUID)
    let attributeModifier = new $AttributeModifier(spoutUUID, 'Spout', stressValue * value, $Operation.ADDITION)
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
function spoutTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity } = event
    const attributeInstance = entity.getAttribute('minecraft:generic.max_health')
    if (attributeInstance) {
        attributeInstance.removeModifier(spoutUUID)
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
function spoutClearInvalidAttribute(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    if (organItem.getDamageValue() < organItem.getMaxDamage() && chestCavity.getOrganScore('kubejs:stress') >= 0) return
    const attribute = entity.getAttribute('minecraft:generic.max_health')
    if (attribute) attribute.removeModifier(spoutUUID)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:spout')
        .addStrategy('entity_tick', spoutEntityTick)
        .addOnlyStrategy('entity_be_hurt', spoutSwitch, 1)
        .addOnlyStrategy('organ_take_off', spoutTakeOff)
        .addOnlyStrategy('entity_tick', spoutClearInvalidAttribute, -1)
        .addOnlyStrategy('chest_cavity_update', spoutClearInvalidAttribute, -1)
)

const spoutRecipes = []

/**
 * 注册注液器官的输入、所需流体与产物。
 * @param {string | Internal.ItemStack | null} input
 * @param {Internal.FluidStack} requiredFluid
 * @param {string | Internal.ItemStack} output
 * @returns {void}
 */
function registerSpoutRecipe(input, requiredFluid, output) {
    spoutRecipes.push({
        input: input,
        requiredFluid: requiredFluid,
        output: output
    })
}

/**
 * 根据输入物品与容器内流体匹配注液配方。
 * @param {Internal.ItemStack} inputItem
 * @param {Internal.FluidHandlerItemStack} tankHandler
 * @returns {{output: Internal.ItemStack, fluidToRemove: Internal.FluidStack} | null}
 */
function spoutOrganRecipe(inputItem, tankHandler) {
    for (let recipe of spoutRecipes) {
        if (recipe.input != null) {
            if (inputItem != recipe.input) continue
        }
        if (!tankHandler.getFluid().isFluidEqual(recipe.requiredFluid)) continue
        return {
            output: Item.of(recipe.output),
            fluidToRemove: recipe.requiredFluid
        }
    }
    return null
}

registerSpoutRecipe('kubejs:fourth_fabritem', Fluid.of('kubejs:other_fluid', 1000), 'kubejs:fifth_fabritem')
registerSpoutRecipe('create:blaze_cake_base', Fluid.of('minecraft:lava', 250), 'create:blaze_cake')
registerSpoutRecipe('minecraft:glass_bottle', Fluid.of('create:tea', 250), 'create:builders_tea')
registerSpoutRecipe(
    Item.of('tetra:thermal_cell', '{Damage:128}'),
    Fluid.of('minecraft:lava', 1000),
    Item.of('tetra:thermal_cell', '{Damage:0}')
)
registerSpoutRecipe(
    'create:cinder_flour',
    Fluid.of('create:potion', 5, { Bottle: 'REGULAR', Potion: 'minecraft:night_vision' }),
    'minecraft:glowstone_dust'
)
registerSpoutRecipe(
    'create:cinder_flour',
    Fluid.of('create:potion', 5, { Bottle: 'REGULAR', Potion: 'minecraft:strength' }),
    'minecraft:redstone'
)
registerSpoutRecipe(
    'create:cinder_flour',
    Fluid.of('create:potion', 5, { Bottle: 'REGULAR', Potion: 'minecraft:harming' }),
    'minecraft:gunpowder'
)
registerSpoutRecipe('minecraft:dirt', Fluid.of('minecraft:water', 500), 'minecraft:grass_block')
registerSpoutRecipe('minecraft:quartz', Fluid.of('kubejs:molten_rose_quartz', 100), 'create:rose_quartz')
registerSpoutRecipe(
    'kubejs:player_27_injection',
    Fluid.of('create_biotech:teleportation', 1000),
    'kubejs:transdimensional_mechanized_injection'
)
registerSpoutRecipe('biomancy:vial', Fluid.of('kubejs:ageing_fluid', 250), 'biomancy:ageing_serum')
registerSpoutRecipe('biomancy:vial', Fluid.of('kubejs:rejuvenation_fluid', 250), 'biomancy:rejuvenation_serum')
registerSpoutRecipe('biomancy:vial', Fluid.of('kubejs:neuroexcitatory_hormone_fluid', 250), 'biomancy:breeding_stimulant')
registerSpoutRecipe('biomancy:vial', Fluid.of('minecraft:milk', 250), 'biomancy:cleansing_serum')
registerSpoutRecipe('minecraft:purple_dye', Fluid.of('minecraft:lava', 1), 'minecraft:red_dye')
registerSpoutRecipe('minecraft:yellow_dye', Fluid.of('minecraft:lava', 1), 'minecraft:red_dye')
registerSpoutRecipe('minecraft:orange_dye', Fluid.of('minecraft:lava', 1), 'minecraft:red_dye')
registerSpoutRecipe('minecraft:yellow_dye', Fluid.of('biomancy:acid', 1), 'minecraft:green_dye')
registerSpoutRecipe('minecraft:cyan_dye', Fluid.of('biomancy:acid', 1), 'minecraft:green_dye')
registerSpoutRecipe('minecraft:cyan_dye', Fluid.of('minecraft:water', 1), 'minecraft:blue_dye')
registerSpoutRecipe('minecraft:purple_dye', Fluid.of('minecraft:water', 1), 'minecraft:blue_dye')
registerSpoutRecipe('minecraft:orange_dye', Fluid.of('create:honey', 1), 'minecraft:yellow_dye')
registerSpoutRecipe('kubejs:furnace_core', Fluid.of('minecraft:lava', 1000), 'kubejs:burning_heart')
