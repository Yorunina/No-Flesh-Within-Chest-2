// priority: 5000
const $ChestCavityUtil = Java.loadClass('net.tigereye.chestcavity.util.ChestCavityUtil')
const $ClientMagicData = Java.loadClass('io.redspace.ironsspellbooks.player.ClientMagicData')
const $SpellSelectionManager = Java.loadClass('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager')
const $SpellSelectionEvent = Java.loadClass('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager$SpellSelectionEvent')

const $KeyMapping = Java.loadClass("net.minecraft.client.KeyMapping")
const $GLFWKey = Java.loadClass("org.lwjgl.glfw.GLFW")
const $KeyMappingRegistry = Java.loadClass("dev.architectury.registry.client.keymappings.KeyMappingRegistry")

const $ModelData = Java.loadClass('noppes.mpm.ModelData')
const $MpmPartData = Java.loadClass('noppes.mpm.client.parts.MpmPartData')
const $MpmPackets = Java.loadClass('noppes.mpm.packets.Packets')
const $PacketPlayerDataSend = Java.loadClass('noppes.mpm.packets.client.PacketPlayerDataSend')

const $MapDimension = Java.loadClass('dev.ftb.mods.ftbchunks.client.map.MapDimension')
const $WaypointImpl = Java.loadClass('dev.ftb.mods.ftbchunks.client.map.WaypointImpl')
const $WaypointType = Java.loadClass('dev.ftb.mods.ftbchunks.client.map.WaypointType')