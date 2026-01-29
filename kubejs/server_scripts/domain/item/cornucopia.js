// priority: 500
ItemEvents.foodEaten('bakery:croissant', event => {
    const player = event.player
    if (RandomWithPlayerLuck(player) > 0.95) {
        player.give(Item.of('cornucopia:cornucopia'))
    }
})