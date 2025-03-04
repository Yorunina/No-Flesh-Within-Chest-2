// priority: 500
const OrganEffectSlotDefinition = [
    {
        id: 'organ_effect_0',
        x: '-$screenW/2+149',
        y: '3'
    },
    {
        id: 'organ_effect_1',
        x: '-$screenW/2+167',
        y: '3'
    },
    {
        id: 'organ_effect_2',
        x: '-$screenW/2+185',
        y: '3'
    },
    {
        id: 'organ_effect_3',
        x: '-$screenW/2+203',
        y: '3'
    },
    {
        id: 'organ_effect_4',
        x: '-$screenW/2+221',
        y: '3'
    }
]

PlayerEvents.loggedIn(event => {
    event.player.paint({
        'organ_effect_ui': {
            'type': 'rectangle',
            'x': '-$screenW/2+220',
            'y': '0',
            'z': 1,
            'w': 98,
            'h': 23,
            'alignX': 'right',
            'alignY': 'bottom',
            'texture': 'kubejs:textures/gui/organ_effect_ui.png',
            'visible': true
        }
    })
    let paintObj = {}
    OrganEffectSlotDefinition.forEach(slotDef => {
        paintObj[slotDef.id] = {
            'type': 'item',
            'x': slotDef.x,
            'y': slotDef.y,
            'z': 1,
            'w': 14,
            'h': 14,
            'alignX': 'right',
            'alignY': 'bottom',
            'item': 'minecraft:air',
            'overlay': true,
            'visible': false
        }
    })
    event.player.paint(paintObj)
})

PlayerEvents.tick(event => {
    const player = event.player
    if (!player.chestCavityInstance || !player.chestCavityInstance.inventory) return
    const chestCavity = player.chestCavityInstance
    const customDataMap = chestCavity.customEntityDataMap
    if (!customDataMap.containsKey('organEffectChanged') || !customDataMap.get('organEffectChanged')) return
    if (!customDataMap.containsKey('organEffectMap')) return
    /** @type {Map<string, OragnEffectModel>} */
    let organEffectMap = customDataMap.get('organEffectMap')
    let organEffectList = []
    organEffectMap.forEach((value, key) => {
        if (value instanceof OragnEffectModel) {
            organEffectList.push(value)
        }
    })

    organEffectList.sort((a, b) => {
        return b.priority - a.priority
    })
    let paintObj = {}
    for (let i = 0; i < organEffectList.length; i++) {
        if (i >= OrganEffectSlotDefinition.length) break
        /**@type {OragnEffectModel} */
        let effect = organEffectList[i]
        let slotDef = OrganEffectSlotDefinition[i]
        paintObj[slotDef.id] = {
            'x': slotDef.x,
            'y': slotDef.y,
            'item': effect.item.id,
            'overlay': effect.overlay,
            'customText': effect.customText,
            'visible': effect.visible
        }
    }
    for (let i = organEffectList.length; i < OrganEffectSlotDefinition.length; i++) {
        let slotDef = OrganEffectSlotDefinition[i]
        paintObj[slotDef.id] = { 'visible': false }
    }
    customDataMap.put('organEffectChanged', false)
    player.paint(paintObj)
})
