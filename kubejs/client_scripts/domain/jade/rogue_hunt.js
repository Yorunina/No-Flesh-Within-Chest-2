// priority: 1000
JadeEvents.onClientRegistration(event => {
    event.entity('kubejs:rogue_hunt_rank', $LivingEntity)
        .tooltip((toolTip, accessor, config) => {
            if (!accessor.serverData || !accessor.serverData.contains('rogue_hunt_rank')) return
            let rank = accessor.serverData.getInt('rogue_hunt_rank')
            toolTip.add(1, Text.translatable('jade.kubejs.rogue_hunt.rank', rank).gold())
        })
})
