// priority: 800
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvanced('ropebridge:bridge_builder', (item, advanced, text) => {
        text.removeIf(line => {
            return line.getString().startsWith('-')
        })
        let lineNum = 1
        lineNum = AddTextLines(text, [Text.translate('tooltips.ropebridge.bridge_builder.usage.1').gray()], lineNum)
    })
})