// priority: 500
/**
 * @type {Map<number, Internal.ItemStack>}
 */
const OrganSkillWheelMap = new Map()

/**
 * @param {Map<number, Internal.ItemStack>} wheelMap
 */
function UpdateOrganSkillWheelItems(wheelMap) {
    let curSkillItems = []
    let slots = []
    wheelMap.forEach((item, slot) => {
        slots.push(slot)
    })
    // 按照slot排序
    slots.sort((a, b) => a - b).forEach(slot => {
        curSkillItems.push(wheelMap.get(slot))
    })
    SkillWheelOverlay.setSkillItems(curSkillItems)
}

SkillWheelEvents.itemSelected(event => {
    const item = event.getActiveItem()
    const itemNbt = item.getNbt()
    const wheelData = itemNbt ? itemNbt.getCompound('kubejs_skill_wheel') : null
    let nbt = new $CompoundTag()
    nbt.putInt('slot', wheelData ? wheelData.getInt('slot') : -1)
    nbt.putString('itemId', item.id)
    event.player.sendData('key_active', nbt)
})


NetworkEvents.dataReceived('update_organ_skill_wheel_item', event => {
    const data = event.data
    const type = data.getString('type')
    const slot = data.getInt('slot')
    switch (type) {
        case 'add':
            OrganSkillWheelMap.set(slot, $ItemStack.of(data.getCompound('stack')))
            UpdateOrganSkillWheelItems(OrganSkillWheelMap)
            break
        case 'delete':
            OrganSkillWheelMap.delete(slot)
            UpdateOrganSkillWheelItems(OrganSkillWheelMap)
            break
        case 'refresh':
            OrganSkillWheelMap.clear()
            UpdateOrganSkillWheelItems(OrganSkillWheelMap)
    }
})
