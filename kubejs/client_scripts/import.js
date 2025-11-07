// priority: 5000
const $ClientMagicData = Java.loadClass('io.redspace.ironsspellbooks.player.ClientMagicData')
const $Block = Java.loadClass('net.minecraft.world.level.block.Block')
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

const $RenderLevelStageEvent = Java.loadClass("net.minecraftforge.client.event.RenderLevelStageEvent")
const $RenderLevelStageEventStage = Java.loadClass("net.minecraftforge.client.event.RenderLevelStageEvent$Stage")
const $RenderSystem = Java.loadClass("com.mojang.blaze3d.systems.RenderSystem")
const $GameRenderer = Java.loadClass("net.minecraft.client.renderer.GameRenderer")
const $Tesselator = Java.loadClass("com.mojang.blaze3d.vertex.Tesselator")
const $VertexFormat = Java.loadClass('com.mojang.blaze3d.vertex.VertexFormat')
const $DefaultVertexFormat = Java.loadClass('com.mojang.blaze3d.vertex.DefaultVertexFormat')
const $BufferUploader = Java.loadClass('com.mojang.blaze3d.vertex.BufferUploader')

const $CodecUtils = Java.loadClass('com.chen1335.renderjs.utils.CodecUtils')
const $UVRange = Java.loadClass('com.chen1335.renderjs.utils.UVRange')

const $Float = Java.loadClass('java.lang.Float')
const $Integer = Java.loadClass('java.lang.Integer')

const $AltarBlock = Java.loadClass('net.jrdemiurge.skyarena.block.custom.AltarBlock')
const $AltarBlockTop = Java.loadClass('net.jrdemiurge.skyarena.block.custom.AltarBlockTop')

const $CreateRecipeCategory = Java.loadClass('com.simibubi.create.compat.jei.category.CreateRecipeCategory')