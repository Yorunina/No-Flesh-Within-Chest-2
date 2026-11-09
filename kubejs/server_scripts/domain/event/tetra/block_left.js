// priority: 0

const TetraBlockLeftClickedEvent = new TetraEffectEventModel('block_left_clicked')

BlockEvents.leftClicked(/** @param {Internal.BlockLeftClickedEventJS} event */ event => {
    let customData = {}
    TetraBlockLeftClickedEvent.run(customData, [event])
})
