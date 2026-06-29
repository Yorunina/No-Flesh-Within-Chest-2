// priority: 500
const GrowingOathEntitySpawnedUUID = UUID.fromString('E1C16618-5E2F-42A7-AF28-416FC6713373')
const GrowingOathEntitySpawnedIdentifier = 'GrowingOathModifier'
const ImmortalOathEntitySpawnedUUID = UUID.fromString('68D2AB65-9548-405F-8444-E495DE25AC8D')
const ImmortalOathEntitySpawnedIdentifier = 'ImmortalOathModifier'
const EternalOathEntitySpawnedUUID = UUID.fromString('82FFC3F4-EB37-46B8-87CE-05668E406FE6')
const EternalOathEntitySpawnedIdentifier = 'EternalOathModifier'

const EternalOathEntitySpawnedConfig = [
    { healthMulti: 1, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 1 },
    { healthMulti: 2, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 1.1 },
    { healthMulti: 3, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 1.2 },
    { healthMulti: 5, attackMulti: 1.5, armorMulti: 1, toughnessMulti: 1, lootMulti: 1.5 },
    { healthMulti: 10, attackMulti: 1.5, armorMulti: 1, toughnessMulti: 1, lootMulti: 1.8 },
    { healthMulti: 20, attackMulti: 2, armorMulti: 1.5, toughnessMulti: 1.5, lootMulti: 2 },
    { healthMulti: 30, attackMulti: 3, armorMulti: 1.5, toughnessMulti: 1.5, lootMulti: 2.2 },
    { healthMulti: 50, attackMulti: 4, armorMulti: 2, toughnessMulti: 2, lootMulti: 2.5 },
    { healthMulti: 100, attackMulti: 5, armorMulti: 2, toughnessMulti: 2, lootMulti: 3 },
    { healthMulti: 300, attackMulti: 6, armorMulti: 2.5, toughnessMulti: 2.5, lootMulti: 3 },
    { healthMulti: 500, attackMulti: 7, armorMulti: 2.5, toughnessMulti: 2.5, lootMulti: 3 },
    { healthMulti: 1000, attackMulti: 8, armorMulti: 3, toughnessMulti: 3, lootMulti: 3 },
]

LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.CHEST)
        .apply(ctx => {
            const player = ctx.player
            if (!player) return

            let curiosItemHandler = GetCuriosInventoryCap(player)
            let oathStackOpt = curiosItemHandler.getStacksHandler('oath')
            if (!oathStackOpt.isPresent()) return
            let oathStackHandler = oathStackOpt.get()
            let oathStacks = oathStackHandler.getStacks()
            if (oathStacks.getSlots() <= 0) return

            oathStacks.allItems.forEach(pItem => {
                if (pItem.is('kubejs:eternal_oath')) {
                    let nbt = pItem.getOrCreateTag()
                    let state = Math.min(nbt.getInt('state'), 11)
                    let spawnConfig = EternalOathEntitySpawnedConfig[state]
                    ctx.loot.forEach(pLoot => {
                        pLoot.setCount(pLoot.getCount() * spawnConfig.lootMulti)
                    })
                }
            })
        })
})

ItemEvents.rightClicked('kubejs:eternal_oath', event => {
    const item = event.item
    if (!item.hasNBT()) item.setNbt(new $CompoundTag())
    const nbt = item.getNbt()
    let state = nbt.getInt('state')
    nbt.putInt('state', (state + 1) % 12)
})

/**
 * @param {Internal.MinecraftServer} server
 * @returns 
 */
function OathDayCountIncr(server) {
    server.playerList.players.forEach(pPlayer => {
        let curiosItemHandler = GetCuriosInventoryCap(pPlayer)
        let oathStackOpt = curiosItemHandler.getStacksHandler('oath')
        if (!oathStackOpt.isPresent()) return
        let oathStackHandler = oathStackOpt.get()
        let oathStacks = oathStackHandler.getStacks()
        if (oathStacks.getSlots() <= 0) return
        oathStacks.allItems.forEach(pItem => {
            if (!pItem.is('kubejs:count_day_oath')) return
            let nbt = pItem.getOrCreateTag()
            nbt.putInt('dayCount', nbt.getInt('dayCount') + 1)
            pItem.setNbt(nbt)
        })
    })
}

/**
 * 
 * @param {Internal.EntitySpawnedEventJS} event 
 */
function OathEntitySpawned(event) {
    const player = event.player
    /**@type {Internal.LivingEntity} */
    const entity = event.entity
    if (!entity.isLiving()) return
    if (!entity.isMonster()) return

    let curiosItemHandler = GetCuriosInventoryCap(player)
    let oathStackOpt = curiosItemHandler.getStacksHandler('oath')
    if (!oathStackOpt.isPresent()) return
    let oathStackHandler = oathStackOpt.get()
    let oathStacks = oathStackHandler.getStacks()
    if (oathStacks.getSlots() <= 0) return

    oathStacks.allItems.forEach(pItem => {
        let nbt = pItem.getOrCreateTag()
        if (pItem.is('kubejs:eternal_oath')) {
            ApplyEternalOathSpawnedAttr(entity, Math.min(nbt.getInt('state'), 11))
        }
        if (pItem.is('kubejs:growing_oath')) {
            ApplyOathSpawnedAttr(entity, GrowingOathEntitySpawnedUUID, GrowingOathEntitySpawnedIdentifier, nbt.getInt('dayCount'))
        }
        if (pItem.is('kubejs:immortal_oath')) {
            ApplyOathSpawnedAttr(entity, ImmortalOathEntitySpawnedUUID, ImmortalOathEntitySpawnedIdentifier, nbt.getInt('dayCount'))
        }
    })
}

/**
 * @param {Internal.LivingEntity} entity 
 * @param {number} nbt 
 */
function ApplyEternalOathSpawnedAttr(entity, state) {
    const spawnConfig = EternalOathEntitySpawnedConfig[state]
    let healthAttr = entity.getAttribute('minecraft:generic.max_health')
    if (healthAttr) {
        healthAttr.addPermanentModifier(new $AttributeModifier(EternalOathEntitySpawnedUUID, EternalOathEntitySpawnedIdentifier, spawnConfig.healthMulti, 'multiply_base'))
    }
    let attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
    if (attackAttr) {
        attackAttr.addPermanentModifier(new $AttributeModifier(EternalOathEntitySpawnedUUID, EternalOathEntitySpawnedIdentifier, spawnConfig.attackMulti, 'multiply_base'))
    }
    let armorAttr = entity.getAttribute('minecraft:generic.armor')
    if (armorAttr) {
        armorAttr.addPermanentModifier(new $AttributeModifier(EternalOathEntitySpawnedUUID, EternalOathEntitySpawnedIdentifier, spawnConfig.armorMulti, 'multiply_base'))
    }
    let armorToughnessAttr = entity.getAttribute('minecraft:generic.armor_toughness')
    if (armorToughnessAttr) {
        armorToughnessAttr.addPermanentModifier(new $AttributeModifier(EternalOathEntitySpawnedUUID, EternalOathEntitySpawnedIdentifier, spawnConfig.toughnessMulti, 'multiply_base'))
    }
}


/**
 * @param {Internal.LivingEntity} entity 
 * @param {UUID} uuid 
 * @param {String} identifier 
 * @param {number} dayCount 
 */
function ApplyOathSpawnedAttr(entity, uuid, identifier, dayCount) {
    let healthAttr = entity.getAttribute('minecraft:generic.max_health')
    if (healthAttr) {
        healthAttr.addPermanentModifier(new $AttributeModifier(uuid, identifier, dayCount * 0.2, 'multiply_base'))
    }
    let attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
    if (attackAttr) {
        attackAttr.addPermanentModifier(new $AttributeModifier(uuid, identifier, dayCount * 0.02, 'multiply_base'))
    }
    let armorAttr = entity.getAttribute('minecraft:generic.armor')
    if (armorAttr) {
        armorAttr.addPermanentModifier(new $AttributeModifier(uuid, identifier, dayCount * 0.1, 'multiply_base'))
    }
    let armorToughnessAttr = entity.getAttribute('minecraft:generic.armor_toughness')
    if (armorToughnessAttr) {
        armorToughnessAttr.addPermanentModifier(new $AttributeModifier(uuid, identifier, dayCount * 0.1, 'multiply_base'))
    }
}

/**
 * @param {Internal.LivingEntityDeathEventJS} event
 */
function OathDayCountModifyOnDeath(event) {
    const player = event.player

    let curiosItemHandler = GetCuriosInventoryCap(player)
    let oathStackOpt = curiosItemHandler.getStacksHandler('oath')
    if (!oathStackOpt.isPresent()) return
    let oathStackHandler = oathStackOpt.get()
    let oathStacks = oathStackHandler.getStacks()
    if (oathStacks.getSlots() <= 0) return

    oathStacks.allItems.forEach(pItem => {
        let nbt = pItem.getOrCreateTag()
        let dayCount = nbt.getInt('dayCount')
        if (pItem.is('kubejs:growing_oath')) {
            nbt.putInt('dayCount', Math.max(dayCount - 10, 0))
        }
        if (pItem.is('kubejs:immortal_oath')) {
            nbt.putInt('dayCount', Math.max(dayCount + 10, 0))
        }
    })
}