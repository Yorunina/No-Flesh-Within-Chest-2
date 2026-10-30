// priority: 1000
const RogueHuntDimension = 'kubejs:rogue_hunt'
const RogueHuntGatewayPos = new BlockPos(8, 64, 8)
const RogueHuntGatewayReference = new $PositionReference(RogueHuntGatewayPos, Direction.SOUTH, new ResourceLocation('kubejs', 'rogue_hunt'))
const RogueHuntEnterOption = new ResourceLocation('maa', 'enter_rogue_hunt')
const RogueHuntSavingsJarSlotUUID = $UUID.fromString('8f3c1a6e-2b94-4d71-9c08-5e7a1b4d6f20')

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

/**
 *
 * @param {Internal.MinecraftServer} server
 * @param {uuid} playerUuid
 * @returns
 */
function FindRogueHuntShell(server, playerUuid) {
    let shellData = $ShellSavedData.getShellData(server.overworld())
    let iterator = shellData.getAll(playerUuid).iterator()
    while (iterator.hasNext()) {
        let state = iterator.next()
        if (state != null && state.shellForgePos().dimension().toString() == RogueHuntDimension && shellData.isLiveShell(server, state)) return state
    }
    return null
}

/**
 *
 * @param {Internal.Player} player
 * @param {*} source
 * @returns
 */
function EnterRogueHunt(player, source) {
    if (String(player.level.dimension) == RogueHuntDimension || source.dimension().toString() != String(player.level.dimension)) return false
    if (player.blockPosition().distSqr(source.pos()) > 64.0) return false
    let sourceForge = player.level.getBlockEntity(source.pos())
    if (sourceForge == null || sourceForge.isGateway() || sourceForge.getShellState().name() != 'CREATE') {
        player.setStatusMessage(Text.translatable('status_msg.kubejs.rogue_hunt.need_empty_forge'))
        return true
    }
    let huntLevel = player.server.getLevel(RogueHuntDimension)
    if (huntLevel == null) {
        player.setStatusMessage(Text.translatable('status_msg.kubejs.rogue_hunt.no_dim'))
        return true
    }
    huntLevel.getChunkAt(RogueHuntGatewayPos)
    let gateway = huntLevel.getBlockEntity(RogueHuntGatewayPos)
    if (gateway == null || !gateway.isGateway()) {
        if (!(gateway instanceof $ShellForgeBlockEntity)) {
            player.setStatusMessage(Text.translatable('status_msg.kubejs.rogue_hunt.no_gateway'))
            return true
        }
        gateway.setGateway(true)
    }
    let resumeShell = FindRogueHuntShell(player.server, player.uuid)
    let huntData = resumeShell == null ? CreateRogueHuntPlayerData(huntLevel) : resumeShell.playerData().copy()
    if (player['playershells$isInfLifeShell']()) $ShellSavedData.getShellData(player.server.overworld()).putTrueBodyBackup(player.uuid, player['playershells$getData']())
    sourceForge.transferPlayerFrom(player)
    if (gateway.getShellState().name() != 'CREATE') gateway.exterminateShell()
    gateway.createShellByData(player.uuid, huntData)
    gateway.transferPlayerTo(player)
    if (resumeShell != null) {
        let resumeLevel = player.server.getLevel(resumeShell.shellForgePos().dimension().toString())
        let resumeForge = resumeLevel == null ? null : resumeLevel.getBlockEntity(resumeShell.shellForgePos().pos())
        if (resumeForge != null) resumeForge.exterminateShell()
    }
    return true
}

$ShellSelectionHooks.registerOption(RogueHuntEnterOption, 'menu.kubejs.rogue_hunt.enter',
    player => String(player.level.dimension) != RogueHuntDimension,
    (player, source) => EnterRogueHunt(player, source),
    RogueHuntGatewayReference)

StartupEvents.registry('item', event => {
    event.create('kubejs:xp_necklace')
        .texture('kubejs:item/curios/xp_necklace')
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .canUnequip(() => true)
        )
        .tag('curios:necklace')
})
