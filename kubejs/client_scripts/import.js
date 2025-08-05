// priority: 5000
const $ChestCavityUtil = Java.loadClass('net.tigereye.chestcavity.util.ChestCavityUtil')
const $ClientMagicData = Java.loadClass('io.redspace.ironsspellbooks.player.ClientMagicData')
const $SpellSelectionManager = Java.loadClass('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager')
const $SpellSelectionEvent = Java.loadClass('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager$SpellSelectionEvent')
const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')
const $KeyMapping = Java.loadClass("net.minecraft.client.KeyMapping")
const $GLFWKey = Java.loadClass("org.lwjgl.glfw.GLFW")
const $KeyMappingRegistry = Java.loadClass("dev.architectury.registry.client.keymappings.KeyMappingRegistry")
const $OverlayTexture = Java.loadClass('net.minecraft.client.renderer.texture.OverlayTexture')
const $ModelData = Java.loadClass('net.minecraftforge.client.model.data.ModelData')
const $RenderType = Java.loadClass('net.minecraft.client.renderer.RenderType')

const $MPMModelData = Java.loadClass('noppes.mpm.ModelData')
const $MpmPartData = Java.loadClass('noppes.mpm.client.parts.MpmPartData')
const $MpmPackets = Java.loadClass('noppes.mpm.packets.Packets')
const $PacketPlayerDataSend = Java.loadClass('noppes.mpm.packets.client.PacketPlayerDataSend')

const $MapDimension = Java.loadClass('dev.ftb.mods.ftbchunks.client.map.MapDimension')
const $WaypointImpl = Java.loadClass('dev.ftb.mods.ftbchunks.client.map.WaypointImpl')
const $WaypointType = Java.loadClass('dev.ftb.mods.ftbchunks.client.map.WaypointType')

const $ScreenshakeInstance = Java.loadClass('team.lodestar.lodestone.systems.screenshake.ScreenshakeInstance')
const $ScreenshakeHandler = Java.loadClass('team.lodestar.lodestone.handlers.ScreenshakeHandler')
const $Easing = Java.loadClass('team.lodestar.lodestone.systems.easing.Easing')

const $SkillWheelOverlay = Java.loadClass('net.tigereye.chestcavity.ui.SkillWheelOverlay')