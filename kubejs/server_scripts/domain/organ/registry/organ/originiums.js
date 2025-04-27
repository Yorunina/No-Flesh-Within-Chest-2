// priority: 500
RegistryOrgan('kubejs:originiums')
    .addScore('chestcavity:health', -1)

RegistryOrgan('kubejs:sub_originiums')
    .addScore('chestcavity:health', -0.5)

const SubOriginiumsMagicList = [
    {
        id: "irons_spellbooks:starfall",
        maxLevel: 10,
    },
    {
        id: "irons_spellbooks:evasion",
        maxLevel: 5,
    },
    {
        id: "irons_spellbooks:magic_arrow",
        maxLevel: 20,
    },
    {
        id: "irons_spellbooks:magic_missile",
        maxLevel: 15,
    },
    {
        id: "irons_spellbooks:teleport",
        maxLevel: 5,
    },
    {
        id: "irons_spellbooks:echoing_strikes",
        maxLevel: 5,
    },
    {
        id: "irons_spellbooks:black_hole",
        maxLevel: 6,
    },
    {
        id: "irons_spellbooks:counterspell",
        maxLevel: 1,
    },
    {
        id: "irons_spellbooks:dragon_breath",
        maxLevel: 10,
    },
    {
        id: "irons_spellbooks:summon_ender_chest",
        maxLevel: 1,
    },
    {
        id: "irons_spellbooks:recall",
        maxLevel: 1,
    },
]

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.SpellOnCastEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function OriginiumsPlayerCastEvent(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const manaCost = event.getManaCost()
    const chestCavity = player.chestCavityInstance
    let genProbability = Math.min(Math.pow(manaCost, 0.5) / 15, 1)
    if (Math.random() < genProbability) return

    let subOriginiums = Item.of('kubejs:sub_originiums')
    let nbt = subOriginiums.getOrCreateTag()
    let randomSpell = RandomGet(SubOriginiumsMagicList)
    let spellLvl = Math.floor(Math.random() * randomSpell.maxLevel) + 1
    nbt.putString('spellId', randomSpell.id)
    nbt.putInt('spellLvl', spellLvl)

    let canSetSlotList = []
    for (let i = 0; i < chestCavity.inventory.getContainerSize(); i++) {
        if (chestCavity.inventory.getItem(i).isEmpty()) {
            canSetSlotList.push(i)
        }
    }
    let targetIndex = -1
    if (canSetSlotList.length == 0) {
        targetIndex = Math.floor(Math.random() * chestCavity.inventory.getContainerSize())
    } else {
        targetIndex = RandomGet(canSetSlotList)
    }
    let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
    SetChestCavityOrgan(customData, chestCavity, subOriginiums, targetIndex, targetSlotType, true)

    player.addItemCooldown(organItem, 20 * 30)
}

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function OriginiumsMpmTakeOn(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    let player = event.entity
    let partId = player.profile.isLegacy() ? 'kubejs:parts/arms/originium_dragon_arm_wide_model.json' : 'kubejs:parts/arms/originium_dragon_arm_slim_model.json'

    let index = customData.modelData.mpmParts.findIndex(mpmData => mpmData.partId.toString() == partId)

    if (index == -1) {
        customData.modelData.mpmParts.add(new MpmDataModel(partId).exportModelData())
    }
}

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 */
function OriginiumsMpmTakeOff(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    let player = event.entity
    let partId = player.profile.isLegacy() ? 'kubejs:parts/arms/originium_dragon_arm_wide_model.json' : 'kubejs:parts/arms/originium_dragon_arm_slim_model.json'
    customData.modelData.mpmParts.removeIf(mpmData => mpmData.partId.toString() == partId)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:originiums')
        .addOnlyStrategy('player_spell_cast', OriginiumsPlayerCastEvent)
        .addOnlyStrategy('mpm_render_take_on', OriginiumsMpmTakeOn)
        .addOnlyStrategy('mpm_render_take_off', OriginiumsMpmTakeOff)
)


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SubOriginiumsChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    let nbt = organItem.getOrCreateTag()
    let spellId = nbt.getString('spellId')
    let spellLvl = nbt.getInt('spellLvl')
    AddSpellSelection(customData, chestCavity, spellId, spellLvl)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function SubOriginiumsTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    let nbt = organItem.getOrCreateTag()
    let spellId = nbt.getString('spellId')
    let spellLvl = nbt.getInt('spellLvl')
    RemoveSpellSelection(customData, chestCavity, spellId, spellLvl)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:sub_originiums')
        .addStrategy('chest_cavity_update', SubOriginiumsChestCavityUpdate)
        .addStrategy('organ_take_off', SubOriginiumsTakeOff)
)