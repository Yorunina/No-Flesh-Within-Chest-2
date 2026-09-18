// priority: 500
const OrganBagRankMap = {
    'kubejs:common_organ_bag': 0,
    'kubejs:fine_organ_bag': 1,
    'kubejs:rare_organ_bag': 2,
    'kubejs:epic_organ_bag': 3,
    'kubejs:legendary_organ_bag': 4,
}

ItemEvents.rightClicked(event => {
    let rank = OrganBagRankMap[event.item.id]
    if (rank == undefined) return
    if (event.level.isClientSide()) return

    let pool = []
    OrganList.forEach(organ => {
        if (organ.rank == rank) pool.push(organ.itemId)
    })
    let organId = RandomGet(pool)
    if (!organId) return

    GivePlayerItemList(event.player, [Item.of(organId)])
    event.item.shrink(1)
    event.player.playSound('item.bundle.drop_contents')
    event.cancel()
})
