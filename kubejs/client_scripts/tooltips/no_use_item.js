// priority: 800
ItemEvents.tooltip(tooltip => {
    /**
     * @param {string} item 
     */
    function MarkNoUseItem(item) {
        tooltip.add(item, Text.translatable('tooltips.kubejs.no_use_item').darkRed())
    }
    MarkNoUseItem('cataclysm:meat_shredder')
})