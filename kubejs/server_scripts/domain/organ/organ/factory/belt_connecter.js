// priority: 500

RegistryOrgan('kubejs:belt_connecter')

/**
 * 处理器官事件：organ_take_on。
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @returns {void}
 */
function beltTakeOn(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const chestCavity = player.chestCavityInstance
    if (slotType == AutomationSlot) {
        SetCustomDataMap(chestCavity, 'beltEnabled', 1)
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText('ON')
        SetOrganEffect(chestCavity, organEffect)
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
function beltKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const chestCavity = player.chestCavityInstance
    if (slotType == AutomationSlot) {
        const beltEffect = GetFactoryBeltEffect(chestCavity)
        const mode = beltEffect > 0 ? 0 : 1
        SetCustomDataMap(chestCavity, 'beltEnabled', mode)
        let organEffect = new OragnEffectModel(organItem).setPriority(organIndex).setCustomText(beltEffect > 0 ? 'OFF' : 'ON')
        SetOrganEffect(chestCavity, organEffect)
        player.addItemCooldown(organItem, 20 * 2)
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
function beltTakeOff(customData, event, organItem, organIndex, slotType) {
    const player = event.entity
    const chestCavity = player.chestCavityInstance
    const query = chestCavity.getOrganQueryIndex()
    if (!query.hasItem('kubejs:belt_connecter', true, AutomationSlot)
        && !query.hasItem('kubejs:mechanized_belt', true, MachinaryLubricant)) {
        RemoveCustomDataMap(chestCavity, 'beltEnabled')
    }
    RemoveOrganEffect(chestCavity, 'kubejs:belt_connecter')
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:belt_connecter')
        .addOnlyStrategy('organ_take_on', beltTakeOn)
        .addOnlyStrategy('organ_take_off', beltTakeOff)
        .addOnlyStrategy('key_active', beltKeyActive)
)

/**
 * 从索引检查传送带安装状态，并读取 KJS 保存的主动开关。
 * @param {Internal.ChestCavityInstance} chestCavity
 * @returns {number}
 */
function GetFactoryBeltEffect(chestCavity) {
    const query = chestCavity.getOrganQueryIndex()
    if (query.hasItem('kubejs:belt_connecter', true, AutomationSlot)
        || query.hasItem('kubejs:mechanized_belt', true, MachinaryLubricant)) {
        return GetCustomDataMap(chestCavity, 'beltEnabled', 1)
    }
    return 0
}
