// priority: 1000
const RogueHuntPavilionChunks = [[-1, -1], [0, 0], [1, -1], [-1, 1], [1, 1], [-1, -3], [-3, -1], [1, -3], [-3, 1], [-3, -3], [3, -1], [-1, 3], [3, 1], [1, 3], [3, -3], [-3, 3], [-1, -5], [-5, -1], [1, -5], [-5, 1], [3, 3], [-3, -5], [-5, -3], [5, -1], [-1, 5], [3, -5], [5, 1], [-5, 3], [1, 5], [5, -3], [-3, 5], [-5, -5], [-1, -7], [-7, -1], [5, 3], [3, 5], [1, -7], [-7, 1], [-3, -7], [-7, -3], [5, -5], [-5, 5], [3, -7], [-7, 3], [7, -1], [-1, 7], [7, 1], [1, 7], [5, 5], [-5, -7], [-7, -5], [7, -3], [-3, 7]]
const RogueHuntSavingsJarSlotUUID = UUID.fromString('8f3c1a6e-2b94-4d71-9c08-5e7a1b4d6f20')

/**
 * @param {Internal.ServerLevel} level
 * @returns {Internal.CompoundTag}
 */
function CreateRogueHuntPlayerData(level) {
    let fake = $FakePlayerFactory.get(level, new $GameProfile($UUID.randomUUID(), 'PlayerShells'))
    fake.getInventory().setItem(0, Item.of('lightmanscurrency:portable_terminal'))
    let curiosCap = fake.getCapability($CuriosCapability.INVENTORY)
    if (curiosCap.isPresent()) {
        curiosCap.resolve().get().addPermanentSlotModifier('savings_jar', RogueHuntSavingsJarSlotUUID, 'RogueHuntSavingsJar', 1, $Operation.ADDITION)
    }
    let playerData = fake.saveWithoutId(new $CompoundTag())
    playerData.putInt('playerGameType', 2)
    playerData.putInt('previousPlayerGameType', 0)
    playerData.putBoolean('infLifeShell', false)
    playerData.putString('playerType', 'rogue_hunt')
    return playerData
}

function FindRogueHuntEmptyPavilion(level, player) {
    let playerData = CreateRogueHuntPlayerData(level)
    for (let i = 0; i < RogueHuntPavilionChunks.length; i++) {
        let cx = RogueHuntPavilionChunks[i][0]
        let cz = RogueHuntPavilionChunks[i][1]
        let origin = new BlockPos(cx * 16 + 8, 64, cz * 16 + 8)
        level.getChunk(cx, cz)
        if ($PlayerShellsAPI.createForgeWithShell(level, origin, Direction.SOUTH, player.uuid, playerData)) return origin
    }
    return null
}

StartupEvents.registry('item', event => {
    event.create('kubejs:rogue_hunt_passport')
        .maxStackSize(1)
        .useDuration(itemStack => 40)
        .useAnimation('bow')
        .use((level, player, hand) => true)
        .releaseUsing((itemstack, level, entity) => itemstack)
        .finishUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            let huntLevel = level.server.getLevel('kubejs:rogue_hunt')
            if (!huntLevel) {
                entity.statusMessage(Text.translatable('status_msg.kubejs.rogue_hunt.passport_no_dim'))
                return itemstack
            }
            let found = FindRogueHuntEmptyPavilion(huntLevel, entity)
            if (!found) {
                entity.statusMessage(Text.translatable('status_msg.kubejs.rogue_hunt.passport_full'))
                return itemstack
            }
            entity.statusMessage(Text.translatable('status_msg.kubejs.rogue_hunt.passport_ready', found.x, found.y, found.z))
            return Item.empty
        })
        .texture('kubejs:item/rogue_hunt_passport')

    event.create('kubejs:xp_necklace')
        .texture('kubejs:item/curios/xp_necklace')
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .canUnequip(() => true)
        )
        .tag('curios:necklace')
})
