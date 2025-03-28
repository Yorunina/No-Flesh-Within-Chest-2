// priority: 999
const OrganKeyBindEvent = new OrganKeyActiveEventModel('key_active')

NetworkEvents.dataReceived('mine_menu_use_item', event => {
    const player = event.player
    const nbt = event.data
    if (!player || !nbt) return
    const item = DeserializeItemFromNbt(nbt)
    let customData = {}
    let cooldowns = player.getCooldowns()
    
    if (cooldowns.isOnCooldown(item)) {
        let cooldownInstance = cooldowns.cooldowns.getOrDefault(item.getItem(), null)
        if (!cooldownInstance) return
        let endTime = cooldownInstance.endTime
        let leftTime = endTime - cooldowns.tickCount
        player.setStatusMessage(Text.translatable('status_msg.kubejs.warden_core.key_active.cooldown', Text.gold(item.getHoverName()), leftTime / 20))
        return
    }

    OrganKeyBindEvent.run(player, item, customData, [event])
    UpdateClientISSSpellDataEvent(customData, player)
})
