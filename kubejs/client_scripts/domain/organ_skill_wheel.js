// priority: 500
/**
 * @type {Map<string, number>}
 */
const OrganSkillWheelMap = new Map()

SkillWheelEvents.itemSelected(event => {
    const item = event.getActiveItem()
    let nbt = new $CompoundTag()
    nbt.putString('itemId', item.id)
    event.player.sendData('key_active', nbt)
})


NetworkEvents.dataReceived('update_organ_skill_wheel_item', event => {
    const data = event.data
    const type = data.getString('type')
    const slot = data.getInt('slot')
    const itemId = String(data.getString('itemId'))
    // 按照slot排序
    let curSkillItems = []
    switch (type) {
        case 'add':
            OrganSkillWheelMap.set(itemId, slot)
            OrganSkillWheelMap.forEach((pSlot, pItemId) => {
                curSkillItems.push(Item.of(pItemId))
            })
            SkillWheelOverlay.setSkillItems(curSkillItems)
            break
        case 'delete':
            OrganSkillWheelMap.delete(itemId)
            OrganSkillWheelMap.forEach((pSlot, pItemId) => {
                curSkillItems.push(Item.of(pItemId))
            })
            SkillWheelOverlay.setSkillItems(curSkillItems)
            break
        case 'refresh':
            OrganSkillWheelMap.clear()
            SkillWheelOverlay.setSkillItems(curSkillItems)
    }
})