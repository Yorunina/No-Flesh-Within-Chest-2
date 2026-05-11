// priority: 800
ApplyMultiStateTooltip(new MultiStateTooltip('kubejs:badge')
    .addDefault((text, item) => {
        const nbt = item.getOrCreateTag()
        const tooltipsList = []
        if (!nbt.contains('userName') || !nbt.contains('time')) return tooltipsList
        const userName = nbt.getString('userName')
        const time = nbt.getLong('time')
        const date = new Date(time)
        tooltipsList.push(Text.translatable('tooltips.kubejs.badge.default.1', userName, date.getFullYear().toFixed(), (date.getMonth() + 1).toFixed(), date.getDay().toFixed(), date.getHours().toFixed(), date.getMinutes().toFixed()).gray())
        tooltipsList.push(Text.translatable('tooltips.kubejs.badge.default.2').gray())
        return tooltipsList
    })
)