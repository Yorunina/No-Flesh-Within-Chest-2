// priority: 999

const TetraItemCooldownStartedEvent = new TetraEffectEventModel('item_cooldown_started')
const OrganItemCooldownStartedEvent = new OrganEventModel('item_cooldown_started')

MAAEvents.itemCooldownStarted(/** @param {Internal.ItemCooldownStartedEventJS} event */ event => {
    let customData = {}
    OrganItemCooldownStartedEvent.run(event.player, customData, [event])
    TetraItemCooldownStartedEvent.run(event.player, customData, [event])
})
