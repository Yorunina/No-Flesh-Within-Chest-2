// priority: 1000
ItemEvents.modification(event => {
    event.modify('wildernature:bison_horn', ctx => {
        ctx.maxStackSize = 64
    })
})