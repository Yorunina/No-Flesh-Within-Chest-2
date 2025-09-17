// priority: 1000
MantleJSEvents.bookRegistry(event => {
    event.create('time_anch_beacon')
        .addBookRepository('kubejs:book/time_anch_beacon')

    event.create('world_edit_magic')
        .addBookRepository('kubejs:book/world_edit_magic')
})
StartupEvents.registry('item', event => {
    event.create('kubejs:time_anch_beacon_book', 'mantle:book')
        .setBookData('time_anch_beacon')

    event.create('kubejs:world_edit_magic_book', 'mantle:book')
        .setBookData('world_edit_magic')
})