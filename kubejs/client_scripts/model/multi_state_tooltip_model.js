// priority: 1000
/**
 * 
 * @param {String} itemId 
 */
function MultiStateTooltip(itemId) {
    this.itemId = itemId
    this.defaultTooltips = []
    this.ctrlTooltips = []
    this.shiftTooltips = []
    this.altTooltips = []
    this.mpmTypeTooltipsMap = new Map()
    this.isBindEntity = false
    this.shiftDescription = Text.translatable('tooltips.kubejs.multi_state.shift.1')
    this.shiftHoldingDescription = Text.translatable('tooltips.kubejs.multi_state.shift_holding.1')
    this.ctrlDescription = Text.translatable('tooltips.kubejs.multi_state.ctrl.1')
    this.ctrlHoldingDescription = Text.translatable('tooltips.kubejs.multi_state.ctrl_holding.1')
    this.altDescription = Text.translatable('tooltips.kubejs.multi_state.alt.1')
    this.altHoldingDescription = Text.translatable('tooltips.kubejs.multi_state.alt_holding.1')
}
MultiStateTooltip.prototype = {
    /**
     * @param {Internal.MutableComponent} textComponent
     */
    addDefault: function (textComponent) {
        this.defaultTooltips.push(textComponent)
        return this
    },
    /**
     * @param {Internal.MutableComponent} textComponent
     */
    addCtrl: function (textComponent) {
        this.ctrlTooltips.push(textComponent)
        return this
    },
    /**
     * @param {Internal.MutableComponent} textComponent
     */
    addShift: function (textComponent) {
        this.shiftTooltips.push(textComponent)
        return this
    },
    /**
     * @param {Internal.MutableComponent} textComponent
     */
    addAlt: function (textComponent) {
        this.altTooltips.push(textComponent)
        return this
    },
    /**
     * @param {number} type
     * @param {Internal.MutableComponent} textComponent
     */
    addMPMType: function (type, textComponent) {
        this.mpmTypeTooltipsMap.set(type, textComponent)
        return this
    },
    /**
     * @param {Internal.MutableComponent} textComponent
     */
    setShiftDescription: function (textComponent) {
        this.shiftDescription = textComponent
        return this
    },
    /**
     * @param {Internal.MutableComponent} textComponent
     */
    setCtrlDescription: function (textComponent) {
        this.ctrlDescription = textComponent
        return this
    },
    /**
     * @param {Internal.MutableComponent} textComponent
     */
    setAltDescription: function (textComponent) {
        this.altDescription = textComponent
        return this
    },
    /**
     * @param {Internal.MutableComponent} textComponent
     */
    setShiftHoldingDescription: function (textComponent) {
        this.shiftHoldingDescription = textComponent
        return this
    },
    /**
     * @param {Internal.MutableComponent} textComponent
     */
    setCtrlHoldingDescription: function (textComponent) {
        this.ctrlHoldingDescription = textComponent
        return this
    },
    /**
     * @param {Internal.MutableComponent} textComponent
     */
    setAltHoldingDescription: function (textComponent) {
        this.altHoldingDescription = textComponent
        return this
    },
    /**
     * @param {boolean} isBindEntity
     */
    setIsBindEntity: function (isBindEntity) {
        this.isBindEntity = isBindEntity
        return this
    },
    registry: function () {
        RegistryMultiStateTooltip(this)
    }
}

/**
 * @type {Object<string, MultiStateTooltip>}
 */
const OrganTooltipRegistryMap = {}
/**
 * @param {MultiStateTooltip} tooltipModel
 */
function RegistryOrganTooltip(tooltipModel) {
    OrganTooltipRegistryMap[tooltipModel.itemId] = tooltipModel
}
