// priority: 1500
const OmniMaterialTiers = [
    { id: 0, axis: 4, durability: 80, integrityCost: 1, integrityGain: 4, magicCapacity: 90, toolLevel: 'minecraft:wood', toolEfficiency: 2, glyph: 'b0b0b0', texture: 'c8c8c8', requiredTools: { axe_dig: 'minecraft:wood' } },
    { id: 1, axis: 5, durability: 160, integrityCost: 1, integrityGain: 5, magicCapacity: 100, toolLevel: 'minecraft:stone', toolEfficiency: 4, glyph: '8fa3c8', texture: 'a8b8d8', requiredTools: { hammer_dig: 'minecraft:wood' } },
    { id: 2, axis: 6, durability: 320, integrityCost: 1, integrityGain: 6, magicCapacity: 110, toolLevel: 'minecraft:iron', toolEfficiency: 6, glyph: 'c9ae69', texture: 'e0c878', requiredTools: { hammer_dig: 'minecraft:gold' } },
    { id: 3, axis: 7, durability: 800, integrityCost: 1, integrityGain: 7, magicCapacity: 120, toolLevel: 'minecraft:diamond', toolEfficiency: 8, glyph: '7ec8c0', texture: '9ee0d8', requiredTools: { hammer_dig: 'minecraft:stone' } },
    { id: 4, axis: 8, durability: 1600, integrityCost: 1, integrityGain: 8, magicCapacity: 132, toolLevel: 'minecraft:netherite', toolEfficiency: 10, glyph: 'c47ae0', texture: 'e0a8f0', requiredTools: { hammer_dig: 'minecraft:iron' } },
]

const OmniMaterialCategories = [
    { id: 'wood', textures: ['crude', 'wooden'] },
    { id: 'stone', textures: ['grainy', 'crude', 'default'] },
    { id: 'metal', textures: ['metal', 'default'] },
    { id: 'gem', textures: ['shiny', 'crude'] },
    { id: 'bone', textures: ['bone', 'crude'] },
    { id: 'fibre', textures: ['crude', 'default'] },
    { id: 'skin', textures: ['skin', 'crude', 'default'] },
    { id: 'scale', textures: ['scale', 'skin', 'crude', 'default'] },
    { id: 'fabric', textures: ['crude', 'default'] },
    { id: 'socket', textures: ['default'] },
    { id: 'rod', textures: ['crude', 'default'] },
]

const OmniMaterialTypes = ['primary', 'secondary', 'tertiary']

function omniMaterialAxes(tier, type) {
    return {
        primary: type == 'primary' ? tier.axis : 0,
        secondary: type == 'secondary' ? tier.axis : 0,
        tertiary: type == 'tertiary' ? tier.axis : 0,
    }
}

ServerEvents.highPriorityData(event => {
    OmniMaterialTiers.forEach(tier => {
        OmniMaterialCategories.forEach(category => {
            OmniMaterialTypes.forEach(type => {
                let axes = omniMaterialAxes(tier, type)
                event.addJson(`tetra:materials/${category.id}/omni_${tier.id}_${type}.json`, {
                    key: `omni_${tier.id}_${category.id}_${type}`,
                    category: category.id,
                    hidden: true,
                    hiddenOutcomes: true,
                    primary: axes.primary,
                    secondary: axes.secondary,
                    tertiary: axes.tertiary,
                    durability: tier.durability,
                    integrityCost: tier.integrityCost,
                    integrityGain: tier.integrityGain,
                    magicCapacity: tier.magicCapacity,
                    toolLevel: tier.toolLevel,
                    toolEfficiency: tier.toolEfficiency,
                    tints: {
                        glyph: tier.glyph,
                        texture: tier.texture,
                    },
                    textures: category.textures,
                    material: {
                        items: [`kubejs:omni_material_${tier.id}`],
                        nbt: `{category:"${category.id}",type:"${type}"}`,
                    },
                    requiredTools: tier.requiredTools,
                })
            })
        })
    })
})

ServerEvents.tags('item', event => {
    event.add('kubejs:omni_material', [
        'kubejs:omni_material_0',
        'kubejs:omni_material_1',
        'kubejs:omni_material_2',
        'kubejs:omni_material_3',
        'kubejs:omni_material_4',
    ])
})
