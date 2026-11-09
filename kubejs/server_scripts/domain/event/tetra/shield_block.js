// priority: 500

const TetraShieldBlockEvent = new TetraEffectEventModel('shield_block')
const TetraItemCooldownStartedEvent = new TetraEffectEventModel('item_cooldown_started')

NativeEvents.onEvent($EventPriority.LOWEST, false, $ShieldBlockEvent,
    /** @param {Internal.ShieldBlockEvent} event */ event => {
        let customData = {}
        TetraShieldBlockEvent.run(customData, [event])
    })

MAAEvents.itemCooldownStarted(/** @param {Internal.ItemCooldownStartedEventJS} event */ event => {
    let customData = {}
    TetraItemCooldownStartedEvent.run(customData, [event])
})
