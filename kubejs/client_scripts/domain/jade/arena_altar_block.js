// priority: 1000
JadeEvents.onClientRegistration((event) => {
    event.block('skyarena:altar_block', $AltarBlock)
        .tooltip((tooltip, accessor, pluginConfig) => {
            altarBlockTooltip(tooltip, accessor, pluginConfig)
        })
    event.block('skyarena:altar_block', $AltarBlockTop)
        .tooltip((tooltip, accessor, pluginConfig) => {
            altarBlockTooltip(tooltip, accessor, pluginConfig)
        })
    
})

/**
 * 
 * @param {Internal.ITooltipWrapper} tooltip 
 * @param {snownee.jade.api.BlockAccessor} accessor 
 * @param {Internal.IPluginConfig} pluginConfig 
 * @returns 
 */
function altarBlockTooltip(tooltip, accessor, pluginConfig) {
    const serverData = accessor.getServerData()
    const player = accessor.getPlayer()
    if (!serverData) return
    let playerIsShifting = player.isShiftKeyDown()
    if (serverData.contains('arena_type')) {
        tooltip.add(Text.translatable(`jade.kubejs.altar_block.arena_type.${serverData.getString('arena_type')}`))
    }
    if (serverData.contains('difficult_level')) {
        tooltip.add(Text.translatable('jade.kubejs.altar_block.difficulty_level', serverData.getInt('difficult_level').toFixed(0)))
    }
    if (serverData.contains('modifier_list')) {
        let modifierList = serverData.getList('modifier_list', GET_STRING_TYPE)
        modifierList.forEach((modifierTag) => {
            let modifier = modifierTag.getAsString()
            tooltip.add(Text.translatable(`jade.kubejs.altar_block.modifier.${modifier}`))
            if (playerIsShifting) {
                tooltip.add(Text.translatable(`jade.kubejs.altar_block.modifier.${modifier}.detail`))
            }
        })
    }
}