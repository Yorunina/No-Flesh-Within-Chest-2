// priority: 999
EntityEvents.death('minecraft:player', event => {
    OathDayCountModifyOnDeath(event)
})