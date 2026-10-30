// priority: 500

// The retired belt organ used a permanent speed modifier. Keep its UUID only
// for save cleanup; the item and its strategies are no longer registered.
const retiredFactorySpeedUUID = UUID.fromString('EE172FDD-6642-7C3F-9857-820B308B1c72')

/** @param {Internal.Entity} entity */
function ClearRetiredFactorySpeed(entity) {
    if (!entity || !entity.isLiving()) return
    const attribute = entity.getAttribute('minecraft:generic.movement_speed')
    if (attribute && attribute.getModifier(retiredFactorySpeedUUID)) {
        attribute.removeModifier(retiredFactorySpeedUUID)
    }
}

// Also fires when existing entities are loaded from a save.
EntityEvents.spawned(event => ClearRetiredFactorySpeed(event.entity))
PlayerEvents.loggedIn(event => ClearRetiredFactorySpeed(event.player))
