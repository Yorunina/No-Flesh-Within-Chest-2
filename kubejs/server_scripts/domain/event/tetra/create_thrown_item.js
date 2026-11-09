// priority: 500

const TetraCreateThrownItemEvent = new TetraEffectEventModel('create_thrown_item')

TetraJSEvents.createThrownItem(/** @param {Internal.CreateThrownItemEventJS} event */ event => {
    let customData = {}
    TetraCreateThrownItemEvent.run(customData, [event])
})
