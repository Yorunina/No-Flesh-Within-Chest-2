
// priority: 800
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvanced('kubejs:clear_crystal', (item, advanced, text) => {
        AddForTextLines(text, [Text.translate(`tooltips.kubejs.clear_crystal.default.1`).gray()], 1)
        AddForTextLines(text, [Text.translate(`tooltips.kubejs.clear_crystal.default.2`).gray()], 2)
    })
})