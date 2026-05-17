// priority: 5000
const $ClientMagicData = Java.loadClass('io.redspace.ironsspellbooks.player.ClientMagicData')
const $Block = Java.loadClass('net.minecraft.world.level.block.Block')
const $SpellSelectionManager = Java.loadClass('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager')
const $SpellSelectionEvent = Java.loadClass('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager$SpellSelectionEvent')
const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')
const $OverlayTexture = Java.loadClass('net.minecraft.client.renderer.texture.OverlayTexture')
const $ModelData = Java.loadClass('net.minecraftforge.client.model.data.ModelData')
const $RenderType = Java.loadClass('net.minecraft.client.renderer.RenderType')

const $MapDimension = Java.loadClass('dev.ftb.mods.ftbchunks.client.map.MapDimension')
const $WaypointImpl = Java.loadClass('dev.ftb.mods.ftbchunks.client.map.WaypointImpl')
const $WaypointType = Java.loadClass('dev.ftb.mods.ftbchunks.client.map.WaypointType')

const $RenderLevelStageEvent = Java.loadClass('net.minecraftforge.client.event.RenderLevelStageEvent')
const $RenderLevelStageEventStage = Java.loadClass('net.minecraftforge.client.event.RenderLevelStageEvent$Stage')
const $GameRenderer = Java.loadClass('net.minecraft.client.renderer.GameRenderer')
const $Tesselator = Java.loadClass('com.mojang.blaze3d.vertex.Tesselator')
const $VertexFormat = Java.loadClass('com.mojang.blaze3d.vertex.VertexFormat')
const $DefaultVertexFormat = Java.loadClass('com.mojang.blaze3d.vertex.DefaultVertexFormat')
const $BufferUploader = Java.loadClass('com.mojang.blaze3d.vertex.BufferUploader')

const $CodecUtils = Java.loadClass('com.chen1335.renderjs.utils.CodecUtils')
const $UVRange = Java.loadClass('com.chen1335.renderjs.utils.UVRange')

const $Float = Java.loadClass('java.lang.Float')
const $Integer = Java.loadClass('java.lang.Integer')

const $CreateRecipeCategory = Java.loadClass('com.simibubi.create.compat.jei.category.CreateRecipeCategory')
const $ParticleUtil = Java.loadClass('com.hollingsworth.arsnouveau.client.particle.ParticleUtil')
const $GlowParticleData = Java.loadClass('com.hollingsworth.arsnouveau.client.particle.GlowParticleData')
const $ParticleColor = Java.loadClass('com.hollingsworth.arsnouveau.client.particle.ParticleColor')
const $AllGuiTextures = Java.loadClass('com.simibubi.create.foundation.gui.AllGuiTextures')

const $GuiStatIndicator = Java.loadClass('se.mickelus.tetra.gui.stats.bar.GuiStatIndicator')
const $TooltipGetterInteger = Java.loadClass('se.mickelus.tetra.gui.stats.getter.TooltipGetterInteger')

const $SpriteResourceLoader = Java.loadClass('net.minecraft.client.renderer.texture.atlas.SpriteResourceLoader')