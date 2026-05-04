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
    this.shiftDescription = Text.translatable('tooltips.kubejs.multi_state.shift.1')
    this.shiftHoldingDescription = Text.translatable('tooltips.kubejs.multi_state.shift_holding.1')
    this.ctrlDescription = Text.translatable('tooltips.kubejs.multi_state.ctrl.1')
    this.ctrlHoldingDescription = Text.translatable('tooltips.kubejs.multi_state.ctrl_holding.1')
    this.altDescription = Text.translatable('tooltips.kubejs.multi_state.alt.1')
    this.altHoldingDescription = Text.translatable('tooltips.kubejs.multi_state.alt_holding.1')
}
MultiStateTooltip.prototype = {
    /**
     * @param {Internal.MutableComponent | function(Internal.List<any>, Internal.ItemStack): Internal.MutableComponent[]} textComponent
     */
    addDefault: function (textComponent) {
        this.defaultTooltips.push(textComponent)
        return this
    },
    /**
     * @param {Internal.MutableComponent | function(Internal.List<any>, Internal.ItemStack): Internal.MutableComponent[]} textComponent
     */
    addCtrl: function (textComponent) {
        this.ctrlTooltips.push(textComponent)
        return this
    },
    /**
     * @param {Internal.MutableComponent | function(Internal.List<any>, Internal.ItemStack): Internal.MutableComponent[]} textComponent
     */
    addShift: function (textComponent) {
        this.shiftTooltips.push(textComponent)
        return this
    },
    /**
     * @param {Internal.MutableComponent | function(Internal.List<any>, Internal.ItemStack): Internal.MutableComponent[]} textComponent
     */
    addAlt: function (textComponent) {
        this.altTooltips.push(textComponent)
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


/**
 * 
 * @param {MultiStateTooltip} tooltipModel 
 */
function ApplyMultiStateTooltip(tooltipModel) {
    ItemEvents.tooltip(tooltip => {
        tooltip.addAdvanced(tooltipModel.itemId, (item, advanced, text) => {
            let lineNum = 1
            if (tooltipModel.defaultTooltips.length > 0) {
                lineNum = AddTextFuncLines(text, tooltipModel.defaultTooltips, item, lineNum)
            }
            
            switch (true) {
                case tooltip.isCtrl():
                    if (tooltipModel.ctrlTooltips.length > 0) {
                        lineNum = AddTextLines(text, [tooltipModel.ctrlHoldingDescription], lineNum)
                        lineNum = AddTextFuncLines(text, tooltipModel.ctrlTooltips, item, lineNum)
                        return
                    }
                    break
                case tooltip.isShift():
                    if (tooltipModel.shiftTooltips.length > 0) {
                        lineNum = AddTextLines(text, [tooltipModel.shiftHoldingDescription], lineNum)
                        lineNum = AddTextFuncLines(text, tooltipModel.shiftTooltips, item, lineNum)
                        return
                    }
                case tooltip.isAlt():
                    if (tooltipModel.altTooltips.length > 0) {
                        lineNum = AddTextLines(text, [tooltipModel.altHoldingDescription], lineNum)
                        lineNum = AddTextFuncLines(text, tooltipModel.altTooltips, item, lineNum)
                        return
                    }
            }

            if (tooltipModel.ctrlTooltips.length > 0) {
                lineNum = AddTextLines(text, [tooltipModel.ctrlDescription], lineNum)
            }
            if (tooltipModel.shiftTooltips.length > 0) {
                lineNum = AddTextLines(text, [tooltipModel.shiftDescription], lineNum)
            }
            if (tooltipModel.altTooltips.length > 0) {
                lineNum = AddTextLines(text, [tooltipModel.altDescription], lineNum)
            }
        })
    })
}