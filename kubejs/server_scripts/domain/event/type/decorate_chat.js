// priority: 999
const OrgaDecorateChatEvent = new OrganEventModel('decorate_chat')

PlayerEvents.decorateChat(event => {
    const player = event.player
    let customData = {}
    OrgaDecorateChatEvent.run(player, customData, [event])
})
