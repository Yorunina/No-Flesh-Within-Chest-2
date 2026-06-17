// priority: 800
// 材料
ItemEvents.tooltip(tooltip => {
    /**
     * 
     * @param {string} item 
     */
    function MarkNoUseItem(item) {
        tooltip.add(item, Text.translatable('tooltips.kubejs.no_ues_item').darkRed())
    }
    MarkNoUseItem('beyonddimensions:net_creater')
    MarkNoUseItem('sophisticatedbackpacks:inception_upgrade')
    MarkNoUseItem('sophisticatedbackpacks:stack_upgrade_omega_tier')
    MarkNoUseItem('cataclysm:meat_shredder')
})