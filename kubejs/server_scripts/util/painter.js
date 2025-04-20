// priority: 3000
/**
 * 
 * @param {Internal.ItemStack} item 
 */
function OragnEffectModel(item) {
    this.item = item
    this.customText = ''
    this.visible = true
    this.overlay = true
    this.priority = 100
}

OragnEffectModel.prototype = {
    setItem(item) {
        this.item = item
        return this
    },
    setCustomText(text) {
        this.customText = text
        return this
    },
    setVisible(visible) {
        this.visible = visible
        return this
    },
    setOverlay(overlay) {
        this.overlay = overlay
        return this
    },
    setPriority(priority) {
        this.priority = priority
        return this
    }
}

/**
 * 
 * @param {Internal.ChestCavityInstance} chestCavity 
 */
function MakeOrganEffectChanged(chestCavity) {
    SetCustomDataMap(chestCavity, 'organEffectChanged', true)
}

/**
 * 
 * @param {Internal.ChestCavityInstance} chestCavity 
 * @param {OragnEffectModel} organEffect 
 */
function SetOrganEffect(chestCavity, organEffect) {
    if (!chestCavity.customDataMap.containsKey('organEffectMap')) {
        SetCustomDataMap(chestCavity, 'organEffectMap', new Map()) 
    }
    let organEffectMap = chestCavity.customDataMap.get('organEffectMap')
    organEffectMap.set(String(organEffect.item.id), organEffect)
    MakeOrganEffectChanged(chestCavity)
}

/**
 * 
 * @param {Internal.ChestCavityInstance} chestCavity 
 * @param {string} itemId 
 */
function RemoveOrganEffect(chestCavity, itemId) {
    if (!chestCavity.customDataMap.containsKey('organEffectMap')) {
        SetCustomDataMap(chestCavity, 'organEffectMap', new Map())
    }
    /**@type {Map<string, OragnEffectModel>} */
    let organEffectMap = chestCavity.customDataMap.get('organEffectMap')
    organEffectMap.delete(String(itemId))
    MakeOrganEffectChanged(chestCavity)
}

/**
 * 
 * @param {Internal.ChestCavityInstance} chestCavity 
 * @param {string} itemId 
 * @returns {OragnEffectModel}
 */
function GetOrganEffect(chestCavity, itemId) {
    if (!chestCavity.customDataMap.containsKey('organEffectMap')) {
        SetCustomDataMap(chestCavity, 'organEffectMap', new Map()) 
    }
    let organEffectMap = chestCavity.customDataMap.get('organEffectMap')
    return organEffectMap.get(String(itemId))
}