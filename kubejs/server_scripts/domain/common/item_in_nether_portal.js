// priority: 500
const InfinityPortalItem2Item = new Map()
function RegisterPortalItem2Item(item, item2) {
    InfinityPortalItem2Item.set(item, item2)
}


const InfinityPortalItem2DimId = new Map()
function RegisterPortalItem2DimId(dimItem, dimId) {
    InfinityPortalItem2DimId.set(dimItem, dimId)
}
RegisterPortalItem2DimId('minecraft:obsidian', 'infinity:cube')
RegisterPortalItem2DimId('minecraft:slime_ball', 'infinity:slime')
RegisterPortalItem2DimId('minecraft:grass_block', 'infinity:hills')
RegisterPortalItem2DimId('minecraft:cherry_leaves', 'infinity:spiral')
RegisterPortalItem2DimId('minecraft:sponge', 'infinity:sponge')
RegisterPortalItem2DimId('minecraft:stick', 'infinity:content')
RegisterPortalItem2DimId('minecraft:mossy_cobblestone', 'infinity:classic')
RegisterPortalItem2DimId('minecraft:bricks', 'infinity:isolation')
RegisterPortalItem2DimId('minecraft:black_wool', 'infinity:chess')
RegisterPortalItem2DimId('minecraft:book', 'infinity:library')
RegisterPortalItem2DimId('minecraft:glowstone', 'infinity:nexus')
RegisterPortalItem2DimId('minecraft:redstone', 'infinity:perfection')
RegisterPortalItem2DimId('minecraft:terracotta', 'infinity:custom')
RegisterPortalItem2DimId('minecraft:white_concrete', 'infinity:ant')
RegisterPortalItem2DimId('minecraft:dragon_egg', 'infinity:skygrid')
RegisterPortalItem2DimId('minecraft:gold_block', 'infinity:golden')
RegisterPortalItem2DimId('kubejs:elder_guardian_core', 'infinity:void')
RegisterPortalItem2DimId('minecraft:sandstone', 'infinity:redstone_flat')
RegisterPortalItem2DimId('minecraft:dragon_breath', 'infinity:missingno')
RegisterPortalItem2DimId('minecraft:shroomlight', 'infinity:cavern')
RegisterPortalItem2DimId('lightmanscurrency:coin_gold', 'infinity:room')
RegisterPortalItem2DimId('kaleidoscope_cookery:raw_noodles', 'infinity:noodles')
RegisterPortalItem2DimId('lightmanscurrency:coin_diamond', 'kubejs:oath')
RegisterPortalItem2DimId('minecraft:dirt', 'infinity:hunting')

InfinityEvents.itemInPortal(event => {
    const itemEntity = event.entity
    if (itemEntity.isOnPortalCooldown()) return
    itemEntity.setPortalCooldown(20)
    /** @type {Internal.ItemStack} */
    const itemStack = itemEntity.getItem()
    const level = event.getLevel()
    if (level.isClientSide()) return
    const itemId = String(itemStack.getId())
    const pos = event.getPos()
    if (itemStack.is('kubejs:key_to_infinity')) {
        let nameString = GetInfinityKeyDim(itemStack)
        itemEntity.remove('changed_dimension')
        InfinityPortalCreator.tryCreatePortalById(nameString, level, pos)
    } else if (InfinityPortalItem2Item.has(itemId)) {
        itemEntity.setPortalCooldown(100)
        itemEntity.setItem(Item.of(InfinityPortalItem2Item.get(itemId), itemStack.getCount()))
    } else if (InfinityPortalItem2DimId.has(itemId)) {
        itemEntity.remove('changed_dimension')
        InfinityPortalCreator.tryCreatePortalById(InfinityPortalItem2DimId.get(itemId), level, pos)
    }
})

/**
 * 获取无限门的维度ID
 * @param {Internal.ItemStack} itemStack
 * @returns {string}
 */
function GetInfinityKeyDim(itemStack) {
    if (itemStack.hasCustomHoverName()) {
        let rawName = itemStack.getHoverName().getString()

        if (rawName.startsWith('infinity:')) {
            rawName = rawName.replace('infinity:', '')
        }
        rawName = rawName.trim().toLowerCase()

        if (rawName == 'random') {
            return 'infinity:random'
        }

        // 特殊维度特殊处理
        if (InfinityMod.provider.easterizer.isEaster(rawName)) return 'infinity:' + rawName

        if (!/^[a-z0-9/._-]+$/.test(rawName)) {
            return 'infinity:random'
        }

        if (!rawName.startsWith('generated_')) {
            rawName = 'generated_' + rawName
        }

        return 'infinity:' + rawName
    } else {
        return 'infinity:random'
    }
}