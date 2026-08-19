// priority: 500
/**
 * kubeloader 客户端兼容层：将整合包客户端接口共享给附属内容包
 * 附属侧通过 ContentPacks.getShared('接口名') 获取，例如：
 *   const _RegistryOrganTooltip = ContentPacks.getShared('RegistryOrganTooltip')
 *   const _MultiStateTooltip = ContentPacks.getShared('MultiStateTooltip')
 */

// ================ Tooltip 模型与注册 ================
ContentPacks.putShared('RegistryOrganTooltip', RegistryOrganTooltip)
ContentPacks.putShared('ApplyMultiStateTooltip', ApplyMultiStateTooltip)
ContentPacks.putShared('MultiStateTooltip', MultiStateTooltip)

// ================ 关键词构造工具(附属自建 Hover 关键词必备) ================
ContentPacks.putShared('HoverTextList', HoverTextList)
ContentPacks.putShared('NewLine', NewLine)

// ================ 槽位类型文本 ================
ContentPacks.putShared('DefaultSlotType', DefaultSlotType)
ContentPacks.putShared('HighAdaptabilitySlotType', HighAdaptabilitySlotType)
ContentPacks.putShared('RosyExplosionSlotType', RosyExplosionSlotType)
ContentPacks.putShared('RevolutionFlameType', RevolutionFlameType)
ContentPacks.putShared('MachinaryLubricantSlotType', MachinaryLubricantSlotType)
ContentPacks.putShared('GulaSlotType', GulaSlotType)
ContentPacks.putShared('ContainerSlotType', ContainerSlotType)
ContentPacks.putShared('DigestSlotType', DigestSlotType)
ContentPacks.putShared('TransdimensionalMechanizedType', TransdimensionalMechanizedType)
ContentPacks.putShared('FertileSlotType', FertileSlotType)
ContentPacks.putShared('HarvestSlotType', HarvestSlotType)
ContentPacks.putShared('AwakeRelicsSlotType', AwakeRelicsSlotType)

// ================ 通用/交互关键词 Hover ================
ContentPacks.putShared('LuckHover', LuckHover)
ContentPacks.putShared('ItemCoverHover', ItemCoverHover)
ContentPacks.putShared('EngraveHover', EngraveHover)
ContentPacks.putShared('AlwaysEatHover', AlwaysEatHover)
ContentPacks.putShared('DirectlyNearbyOrganHover', DirectlyNearbyOrganHover)
ContentPacks.putShared('NearbyOrganHover', NearbyOrganHover)
ContentPacks.putShared('DiagonalOrganHover', DiagonalOrganHover)
ContentPacks.putShared('KeyActiveHover', KeyActiveHover)
ContentPacks.putShared('KillEntityHover', KillEntityHover)
ContentPacks.putShared('EntityDeathHover', EntityDeathHover)
ContentPacks.putShared('EntityFallHover', EntityFallHover)
ContentPacks.putShared('FrozenHover', FrozenHover)
ContentPacks.putShared('OnFireHover', OnFireHover)
ContentPacks.putShared('SoildCoreHover', SoildCoreHover)
ContentPacks.putShared('VitaToxinsHover', VitaToxinsHover)
ContentPacks.putShared('PutridToxinsHover', PutridToxinsHover)
ContentPacks.putShared('SurgicalAnesthesiaHover', SurgicalAnesthesiaHover)
ContentPacks.putShared('SatenanceEffectHover', SatenanceEffectHover)
ContentPacks.putShared('FullChargeAttackHover', FullChargeAttackHover)
ContentPacks.putShared('SpectralFireHover', SpectralFireHover)
ContentPacks.putShared('MarkingHover', MarkingHover)

// ================ 胸控类型关键词 Hover ================
ContentPacks.putShared('ChestcavityTypeHover', ChestcavityTypeHover)
ContentPacks.putShared('RevolutionMachineTypeHover', RevolutionMachineTypeHover)
ContentPacks.putShared('FunctionalEntityTypeHover', FunctionalEntityTypeHover)
ContentPacks.putShared('TransdimnesionalMechanizedTypeHover', TransdimnesionalMechanizedTypeHover)
ContentPacks.putShared('TransdimnesionalRelicsTypeHover', TransdimnesionalRelicsTypeHover)
ContentPacks.putShared('TransdimnesionalPlantTypeHover', TransdimnesionalPlantTypeHover)
ContentPacks.putShared('TransdimnesionalRoseTypeHover', TransdimnesionalRoseTypeHover)
ContentPacks.putShared('RelicsAwakeningTypeHover', RelicsAwakeningTypeHover)
ContentPacks.putShared('PlantTypeHover', PlantTypeHover)
ContentPacks.putShared('GulaTypeHover', GulaTypeHover)
ContentPacks.putShared('RoseTypeHover', RoseTypeHover)
ContentPacks.putShared('Player17TypeHover', Player17TypeHover)
ContentPacks.putShared('Player21TypeHover', Player21TypeHover)
ContentPacks.putShared('Player25TypeHover', Player25TypeHover)
ContentPacks.putShared('Player27TypeHover', Player27TypeHover)

// ================ 器官配置关键词 Hover ================
ContentPacks.putShared('UnstableHover', UnstableHover)
ContentPacks.putShared('ExtremeStrengthHover', ExtremeStrengthHover)
ContentPacks.putShared('ExtremeFitnessHover', ExtremeFitnessHover)
ContentPacks.putShared('FrostShieldHover', FrostShieldHover)
ContentPacks.putShared('BasicTumorScoreHover', BasicTumorScoreHover)
ContentPacks.putShared('PotentialTumorScoreHover', PotentialTumorScoreHover)
ContentPacks.putShared('DyeRGBConfigHover', DyeRGBConfigHover)
ContentPacks.putShared('PheromoneConfigHover', PheromoneConfigHover)
ContentPacks.putShared('PrimitivePlantHover', PrimitivePlantHover)
ContentPacks.putShared('PressurizedArmFluidConfigHover', PressurizedArmFluidConfigHover)
ContentPacks.putShared('VeinCoreOreHover', VeinCoreOreHover)
ContentPacks.putShared('RelicsBossHover', RelicsBossHover)

// ================ 精英怪词条关键词 Hover ================
ContentPacks.putShared('ChampionLowDamageRestrictionHover', ChampionLowDamageRestrictionHover)
ContentPacks.putShared('ChampionHighDamageSuppressionHover', ChampionHighDamageSuppressionHover)
ContentPacks.putShared('ChampionHighFreqProtectionHover', ChampionHighFreqProtectionHover)
ContentPacks.putShared('ChampionLowFreqProtectionHover', ChampionLowFreqProtectionHover)
ContentPacks.putShared('ChampionRepelHover', ChampionRepelHover)
ContentPacks.putShared('ChampionPullHover', ChampionPullHover)
ContentPacks.putShared('ChampionPurityProtectionHover', ChampionPurityProtectionHover)
ContentPacks.putShared('ChampionChaosProtectionHover', ChampionChaosProtectionHover)
ContentPacks.putShared('ChampionStunAuraHover', ChampionStunAuraHover)

// ================ Tooltip 工具函数 ================
ContentPacks.putShared('AddTextLines', AddTextLines)
ContentPacks.putShared('AddTextFuncLines', AddTextFuncLines)
ContentPacks.putShared('GetMobNameByType', GetMobNameByType)
ContentPacks.putShared('JoinWithSeparator', JoinWithSeparator)
ContentPacks.putShared('RotatingTooltip', RotatingTooltip)

// ================ 通用工具函数 ================
ContentPacks.putShared('RandomGet', RandomGet)
ContentPacks.putShared('RandomGetN', RandomGetN)
ContentPacks.putShared('RandomWithLuck', RandomWithLuck)
ContentPacks.putShared('RandomWithPlayerLuck', RandomWithPlayerLuck)
ContentPacks.putShared('RoundFix', RoundFix)
ContentPacks.putShared('FloorFix', FloorFix)
ContentPacks.putShared('Shuffle', Shuffle)
ContentPacks.putShared('Intersect', Intersect)
ContentPacks.putShared('UnionArry', UnionArry)
ContentPacks.putShared('ToRomanNumeral', ToRomanNumeral)

// ================ 渲染模型 ================
ContentPacks.putShared('RGB', RGB)
ContentPacks.putShared('MoonDataModel', MoonDataModel)
ContentPacks.putShared('OutlineRenderModel', OutlineRenderModel)
ContentPacks.putShared('ConvertNbt2OutlineRenderList', ConvertNbt2OutlineRenderList)
ContentPacks.putShared('ConvertOutlineRenderList2Nbt', ConvertOutlineRenderList2Nbt)
