// priority: 800
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvanced('create:schematic', (item, advanced, text) => {
        if (!item.hasNBT()) return
        let nbt = item.getNbt()
        if (nbt.getInt('isCreative') == 1) {
            text.add(Text.translate('tooltips.create.schematic.isCreative').yellow().underlined())
        }
    })
})