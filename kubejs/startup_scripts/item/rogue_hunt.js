// priority: 1000
const $BlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')
const $Direction = Java.loadClass('net.minecraft.core.Direction')
const $FakePlayerFactory = Java.loadClass('net.minecraftforge.common.util.FakePlayerFactory')
const $GameProfile = Java.loadClass('com.mojang.authlib.GameProfile')
const $Operation = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation')
const $PositionReference = Java.loadClass('com.ultramega.playershells.utils.PositionReference')
const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const $ShellSavedData = Java.loadClass('com.ultramega.playershells.storage.ShellSavedData')
const $ShellSelectionHooks = Java.loadClass('com.ultramega.playershells.utils.ShellSelectionHooks')
const $ShellForgeBlockEntity = Java.loadClass('com.ultramega.playershells.blockentities.ShellForgeBlockEntity')
const $CuriosCapability = Java.loadClass('top.theillusivec4.curios.api.CuriosCapability')
const $UUID = Java.loadClass('java.util.UUID')

const RogueHuntDimension = 'kubejs:rogue_hunt'
const RogueHuntGatewayPos = new $BlockPos(8, 64, 8)
const RogueHuntGatewayReference = new $PositionReference(RogueHuntGatewayPos, $Direction.SOUTH, new $ResourceLocation('kubejs', 'rogue_hunt'))
const RogueHuntEnterOption = new $ResourceLocation('maa', 'enter_rogue_hunt')
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

function FindRogueHuntShell(server, playerUuid) {
    let shellData = $ShellSavedData.getShellData(server.overworld())
    let iterator = shellData.getAll(playerUuid).iterator()
    while (iterator.hasNext()) {
        let state = iterator.next()
        if (state != null && state.shellForgePos().dimension().toString() == RogueHuntDimension && shellData.isLiveShell(server, state)) return state
    }
    return null
}

function EnterRogueHunt(player, source) {
    if (player.level.dimension().location().toString() == RogueHuntDimension || source.dimension().toString() != player.level.dimension().location().toString()) return false
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
    player['playershells$applyData'](huntData, RogueHuntGatewayReference)
    if (resumeShell != null) {
        let resumeLevel = player.server.getLevel(resumeShell.shellForgePos().dimension().toString())
        let resumeForge = resumeLevel == null ? null : resumeLevel.getBlockEntity(resumeShell.shellForgePos().pos())
        if (resumeForge != null) resumeForge.exterminateShell()
    }
    return true
}

$ShellSelectionHooks.registerOption(RogueHuntEnterOption, '潜入狩猎维度',
    player => player.level.dimension().location().toString() != RogueHuntDimension,
    (player, source) => EnterRogueHunt(player, source))

StartupEvents.registry('item', event => {
    // 保留旧物品 ID，避免旧存档加载时出现未知物品；它不再负责进入狩猎维度。
    event.create('kubejs:rogue_hunt_passport')
        .texture('kubejs:item/rogue_hunt_passport')
        .maxStackSize(1)
        .use((level, player, hand) => {
            if (!level.isClientSide()) player.setStatusMessage(Text.translatable('status_msg.kubejs.rogue_hunt.passport_retired'))
            return true
        })

    event.create('kubejs:xp_necklace')
        .texture('kubejs:item/curios/xp_necklace')
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .canUnequip(() => true)
        )
        .tag('curios:necklace')
})
