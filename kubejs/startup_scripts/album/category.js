// priority: 1000
StampAlbumEvents.registerCategories(event => {
    event.removeAllCategories()
    event.addCategoryWithIcon('organ', 'Organ', 'chestcavity:chest_opener')
})

StampAlbumEvents.registerEntries(event => {
    event.addItemsToCategoryByTag('organ', 'kubejs:organ')
    event.registerAcquisitionSource('chest_open', 'chestcavity:chest_opener', '$stamp.kubejs.source.chest_open')
    event.bindAcquisitionSourceByTag('kubejs:spawn_in_cavity', 'chest_open')
})