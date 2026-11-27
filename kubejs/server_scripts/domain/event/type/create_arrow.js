// priority: 999
const TetraCreateArrowEvent = new TetraEffectEventModel('create_arrow')

TetraJSEvents.createArrow('bow', /** @param {Internal.CreateArrowEventJS} event */ event => {
    if (event.drawProgress < 18) return
    let customData = {}
    TetraCreateArrowEvent.run(event.player, customData, [event])
})

TetraJSEvents.createArrow('crossbow', /** @param {Internal.CreateArrowEventJS} event */ event => {
    let customData = {}
    TetraCreateArrowEvent.run(event.player, customData, [event])
})
