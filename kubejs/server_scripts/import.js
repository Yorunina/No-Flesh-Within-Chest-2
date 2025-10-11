// priority: 10000
const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')
const $ListTag = Java.loadClass('net.minecraft.nbt.ListTag')
const $UUID = Java.loadClass('java.util.UUID')
const $StructurePlaceSettings = Java.loadClass('net.minecraft.world.level.levelgen.structure.templatesystem.StructurePlaceSettings')
const $BlockStatePredicate = Java.loadClass('dev.latvian.mods.kubejs.block.state.BlockStatePredicate')
const $ChunkPos = Java.loadClass('net.minecraft.world.level.ChunkPos')
const $Mirror = Java.loadClass('net.minecraft.world.level.block.Mirror')
const $Rotation = Java.loadClass('net.minecraft.world.level.block.Rotation')
const $ChunkStatus = Java.loadClass('net.minecraft.world.level.chunk.ChunkStatus')
const $PalettedContainer = Java.loadClass('net.minecraft.world.level.chunk.PalettedContainer')
const $StructureMode = Java.loadClass('net.minecraft.world.level.block.state.properties.StructureMode')
const $MobEffects = Java.loadClass('net.minecraft.world.effect.MobEffects')
const $ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer')
const $Player = Java.loadClass('net.minecraft.world.entity.player.Player')
const $ParticleTypes = Java.loadClass('net.minecraft.core.particles.ParticleTypes')
const $ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
const $Registries = Java.loadClass('net.minecraft.core.registries.Registries')
const $LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity')
const $ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
const $Float = Java.loadClass('java.lang.Float')
const $Integer = Java.loadClass('java.lang.Integer')
const $ChestCavityUtil = Java.loadClass('net.tigereye.chestcavity.util.ChestCavityUtil')
const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
const $PathfinderMob = Java.loadClass('net.minecraft.world.entity.PathfinderMob')
const $AbstractGolem = Java.loadClass('dev.xkmc.modulargolems.content.entity.common.AbstractGolemEntity')
const $AbstractSpellCastingPet = Java.loadClass('net.alshanex.alshanex_familiars.entity.generic.AbstractSpellCastingPet')
const $LootParamsBuilder = Java.loadClass('net.minecraft.world.level.storage.loot.LootParams$Builder')
const $LootContextParamSets = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParamSets')
const $Containers = Java.loadClass('net.minecraft.world.Containers')
const $ChorusFlowerBlock = Java.loadClass('net.minecraft.world.level.block.ChorusFlowerBlock')
const $BambooStalkBlock = Java.loadClass('net.minecraft.world.level.block.BambooStalkBlock')
const $BambooLeaves = Java.loadClass('net.minecraft.world.level.block.state.properties.BambooLeaves')
const $RandomPos = Java.loadClass('net.minecraft.world.entity.ai.util.RandomPos')
const $MobEffectInstance = Java.loadClass('net.minecraft.world.effect.MobEffectInstance')
const $LocationPredicate = Java.loadClass('net.minecraft.advancements.critereon.LocationPredicate')
const $Operation = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation')
const $ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')
const $TagKey = Java.loadClass('net.minecraft.tags.TagKey')
const $DamageTypes = Java.loadClass('net.minecraft.world.damagesource.DamageTypes')
const $DamageSources = Java.loadClass('net.minecraft.world.damagesource.DamageSources')
const $GameRules = Java.loadClass('net.minecraft.world.level.GameRules')

const $MPMModelData = Java.loadClass('noppes.mpm.ModelData')
const $MpmPartData = Java.loadClass('noppes.mpm.client.parts.MpmPartData')
const $MpmPackets = Java.loadClass('noppes.mpm.packets.Packets')
const $PacketPlayerDataSend = Java.loadClass('noppes.mpm.packets.client.PacketPlayerDataSend')
const $SimpleMenuProvider = Java.loadClass('net.minecraft.world.SimpleMenuProvider')
const $ChestCavityScreenHandler = Java.loadClass('net.tigereye.chestcavity.ui.ChestCavityScreenHandler')
const $ChestCavityEntity = Java.loadClass('net.tigereye.chestcavity.interfaces.ChestCavityEntity')

const $SpellSelectionManager = Java.loadClass('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager')

const $PositionGoopEmitter = Java.loadClass('absolutelyaya.goop.api.emitter.PositionGoopEmitter')
const $ExtraGoopData = Java.loadClass('absolutelyaya.goop.api.ExtraGoopData')
const $WaterHandling = Java.loadClass('absolutelyaya.goop.api.WaterHandling')


const $MobSpawnType = Java.loadClass('net.minecraft.world.entity.MobSpawnType')


const $CustomBossEvent = Java.loadClass('net.minecraft.server.bossevents.CustomBossEvent')
const $BossBarColor = Java.loadClass('net.minecraft.world.BossEvent$BossBarColor')
const $ItemEntity = Java.loadClass('net.minecraft.world.entity.item.ItemEntity')

const $SpellData = Java.loadClass('io.redspace.ironsspellbooks.api.spells.SpellData')
const $TitleManager = Java.loadClass('aurilux.titles.common.core.TitleManager')
const $TamableAnimal = Java.loadClass('net.minecraft.world.entity.TamableAnimal')
const $AlcoholManager = Java.loadClass('net.satisfy.brewery.core.effect.alcohol.AlcoholManager')
const $DoubleBlockHalf = Java.loadClass('net.minecraft.world.level.block.state.properties.DoubleBlockHalf')
const $EvaluateChestCavityJS = Java.loadClass('net.tigereye.chestcavity.compat.kubejs.events.EvaluateChestCavityJS')
const $WineYears = Java.loadClass('net.satisfy.vinery.core.util.WineYears')

const $MapItemSavedData = Java.loadClass('net.minecraft.world.level.saveddata.maps.MapItemSavedData')
const $MapItem = Java.loadClass('net.minecraft.world.item.MapItem')
const $MapDecorationType = Java.loadClass('net.minecraft.world.level.saveddata.maps.MapDecoration$Type')
const $ModBlocks = Java.loadClass('noobanidus.mods.lootr.init.ModBlocks')
const $RandomizableContainerBlockEntity = Java.loadClass('net.minecraft.world.level.block.entity.RandomizableContainerBlockEntity')


const $BonemealableBlock = Java.loadClass('net.minecraft.world.level.block.BonemealableBlock')
const $BoneMealItem = Java.loadClass('net.minecraft.world.item.BoneMealItem')

const $EntityHitResult = Java.loadClass('net.minecraft.world.phys.EntityHitResult')
const $BlockHitResult = Java.loadClass('net.minecraft.world.phys.BlockHitResult')
const $SpellUtil = Java.loadClass('com.hollingsworth.arsnouveau.api.util.SpellUtil')
const $ClientboundSetEntityMotionPacket = Java.loadClass('net.minecraft.network.protocol.game.ClientboundSetEntityMotionPacket')

const $AxeItem = Java.loadClass('net.minecraft.world.item.AxeItem')
const $SoundSource = Java.loadClass('net.minecraft.sounds.SoundSource')

const $CreateRecipesType = Java.loadClass('com.simibubi.create.AllRecipeTypes')
const $RecipeWrapper = Java.loadClass('net.minecraftforge.items.wrapper.RecipeWrapper')
const $ProcessingInventory = Java.loadClass('com.simibubi.create.content.processing.recipe.ProcessingInventory')

const $ItemHelper = Java.loadClass('com.simibubi.create.foundation.item.ItemHelper')

const $OpticManager = Java.loadClass('team.creative.opticmanager.OpticManager')

const $PlayerProgressionData = Java.loadClass('com.araxer.araxers_bestiary.data.PlayerProgressionData')
const $AnimHeadSummon = Java.loadClass('com.hollingsworth.arsnouveau.common.entity.AnimHeadSummon')
const $AnimBlockSummon = Java.loadClass('com.hollingsworth.arsnouveau.common.entity.AnimBlockSummon')

// native event
const $SpellSelectionEvent = Java.loadClass('io.redspace.ironsspellbooks.api.magic.SpellSelectionManager$SpellSelectionEvent')
const $ModifySpellLevelEvent = Java.loadClass('io.redspace.ironsspellbooks.api.events.ModifySpellLevelEvent')
const $LivingHurtEvent = Java.loadClass('net.minecraftforge.event.entity.living.LivingHurtEvent')
const $LivingDamageEvent = Java.loadClass('net.minecraftforge.event.entity.living.LivingDamageEvent')
const $EffectResolveEventPost = Java.loadClass('com.hollingsworth.arsnouveau.api.event.EffectResolveEvent$Post')
const $EffectResolveEventPre = Java.loadClass('com.hollingsworth.arsnouveau.api.event.EffectResolveEvent$Pre')
const $ShieldBlockEvent = Java.loadClass('net.minecraftforge.event.entity.living.ShieldBlockEvent')
const $DrunkEffect = Java.loadClass('net.satisfy.brewery.core.effect.DrunkEffect')


const $CustomMachineContainer = Java.loadClass('fr.frinn.custommachinery.common.init.CustomMachineContainer')
const $MachineTile = Java.loadClass('fr.frinn.custommachinery.api.machine.MachineTile')

const $MonobankBlockEntity = Java.loadClass('io.github.mortuusars.monobank.content.monobank.MonobankBlockEntity')

const $BlockPatternBuilder = Java.loadClass('net.minecraft.world.level.block.state.pattern.BlockPatternBuilder')
const $BlockInWorld = Java.loadClass('net.minecraft.world.level.block.state.pattern.BlockInWorld')
const $InteractionHand = Java.loadClass('net.minecraft.world.InteractionHand')
const $IncarnationHelper = Java.loadClass("com.example.startres.kubejs.IncarnationKubeJSHelper")

const $CaravanMember = Java.loadClass('dev.obscuria.caravans.world.caravans.CaravanMember')
const $CaravanVariation = Java.loadClass('dev.obscuria.caravans.world.caravans.CaravanVariation')
const $CaravanSpawner = Java.loadClass('dev.obscuria.caravans.world.caravans.CaravanSpawner')
const $CustomGoal = Java.loadClass('net.liopyu.entityjs.util.ai.CustomGoal')