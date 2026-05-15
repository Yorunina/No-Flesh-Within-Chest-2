// priority: 800
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvanced('create:schematic', (item, advanced, text) => {
        if (!item.hasNBT()) return
        let nbt = item.getNbt()
        if (nbt.getBoolean('canSurvivalPrint')) {
            text.add(Text.translate('tooltips.create.schematic.canSurvivalPrint').yellow())
        }
    })
})