// priority: 500
/**
 * kubeloader 兼容层：将整合包核心接口共享给附属内容包
 * 附属侧通过 ContentPacks.getShared('接口名') 获取，例如：
 *   const _RegistryOrgan = ContentPacks.getShared('RegistryOrgan')
 *   const _OrganStrategyModel = ContentPacks.getShared('OrganStrategyModel')
 */

// ================ 策略/模型基础类 ================
ContentPacks.putShared('RegistryOrganStrategy', RegistryOrganStrategy)
ContentPacks.putShared('OrganStrategyModel', OrganStrategyModel)
ContentPacks.putShared('OrganEventModel', OrganEventModel)
ContentPacks.putShared('OrganItemModel', OrganItemModel)
ContentPacks.putShared('OrganKeyActiveEventModel', OrganKeyActiveEventModel)
ContentPacks.putShared('OrganTakeOnStrategyModel', OrganTakeOnStrategyModel)
ContentPacks.putShared('OrganTakeOffStrategyModel', OrganTakeOffStrategyModel)
ContentPacks.putShared('SlotStrategyModel', SlotStrategyModel)
ContentPacks.putShared('AttributeUUIDModel', AttributeUUIDModel)
ContentPacks.putShared('AttributeManagerModel', AttributeManagerModel)
ContentPacks.putShared('PiecewiseMappingModel', PiecewiseMappingModel)
ContentPacks.putShared('PiecewiseItemModel', PiecewiseItemModel)
ContentPacks.putShared('PriorityStrategyModel', PriorityStrategyModel)
ContentPacks.putShared('PriorityFuncModel', PriorityFuncModel)
ContentPacks.putShared('PriorityArgsModel', PriorityArgsModel)
ContentPacks.putShared('ConditionStrategyModel', ConditionStrategyModel)
ContentPacks.putShared('StrategyModel', StrategyModel)
ContentPacks.putShared('StandardWaveEntityItemModel', StandardWaveEntityItemModel)
ContentPacks.putShared('FunctionWaveEntityItemModel', FunctionWaveEntityItemModel)
ContentPacks.putShared('WeightRandomItem', WeightRandomItem)
ContentPacks.putShared('WeightRandomModel', WeightRandomModel)

// ================ 精英怪(Champion)词条域 ================
ContentPacks.putShared('ChampionStrategyModel', ChampionStrategyModel)
ContentPacks.putShared('ChampionEventModel', ChampionEventModel)
ContentPacks.putShared('RegistryChampionStrategy', RegistryChampionStrategy)

// ================ 饰品(Curios)域 ================
ContentPacks.putShared('CuriosStrategyModel', CuriosStrategyModel)
ContentPacks.putShared('CuriosEventModel', CuriosEventModel)
ContentPacks.putShared('RegistryCuriosStrategy', RegistryCuriosStrategy)

// ================ 策略表(只读查询) ================
ContentPacks.putShared('OrganStrategyMap', OrganStrategyMap)
ContentPacks.putShared('ChampionStrategyMap', ChampionStrategyMap)
ContentPacks.putShared('CuriosStrategyMap', CuriosStrategyMap)

// ================ 注册函数 ================
ContentPacks.putShared('RegistryAttributeIdentifier', RegistryAttributeIdentifier)
ContentPacks.putShared('RegistryOrgan', RegistryOrgan)
ContentPacks.putShared('RegistryPseudoOrgan', RegistryPseudoOrgan)
ContentPacks.putShared('RegistryOrganScoreAttribute', RegistryOrganScoreAttribute)

// ================ 肿瘤域 ================
ContentPacks.putShared('TumorMutationConfigModel', TumorMutationConfigModel)
ContentPacks.putShared('RegistryTumorMutationConfig', RegistryTumorMutationConfig)
ContentPacks.putShared('UnformedTumorFluidConfigModel', UnformedTumorFluidConfigModel)
ContentPacks.putShared('RegistryUnformedTumorFluidConfig', RegistryUnformedTumorFluidConfig)

// ================ 传送门(Gateway)域 ================
ContentPacks.putShared('GatewayTypeStackRewardMappingModel', GatewayTypeStackRewardMappingModel)
ContentPacks.putShared('GatewayExtractantMaterialWeightModel', GatewayExtractantMaterialWeightModel)
ContentPacks.putShared('GatewayAuxiliaryMaterialWeightModel', GatewayAuxiliaryMaterialWeightModel)
ContentPacks.putShared('GatewaySpecialAwakeStoneWeightModel', GatewaySpecialAwakeStoneWeightModel)
ContentPacks.putShared('RegistryGatewayExtractantStrategy', RegistryGatewayExtractantStrategy)
ContentPacks.putShared('ArtificalTicketConvertConfigModel', ArtificalTicketConvertConfigModel)
ContentPacks.putShared('RegistryArtificalTicketConvertConfig', RegistryArtificalTicketConvertConfig)
ContentPacks.putShared('GatewayWaveEntityMapping', GatewayWaveEntityMapping)
ContentPacks.putShared('GatewayChaosModifierMapping', GatewayChaosModifierMapping)

// ================ 器官事件实例(addInit/addDefer 挂载钩子) ================
ContentPacks.putShared('OrganArsEffectResolvePre', OrganArsEffectResolvePre)
ContentPacks.putShared('OrganArsEffectResolvePost', OrganArsEffectResolvePost)
ContentPacks.putShared('OrgaDecorateChatEvent', OrgaDecorateChatEvent)
ContentPacks.putShared('OrganISSEntitySpellCastEvent', OrganISSEntitySpellCastEvent)
ContentPacks.putShared('OrganISSPlayerSpellCastEvent', OrganISSPlayerSpellCastEvent)
ContentPacks.putShared('OrganISSSpellLevelModifyEvent', OrganISSSpellLevelModifyEvent)
ContentPacks.putShared('OrganISSSpellSelectionEvent', OrganISSSpellSelectionEvent)
ContentPacks.putShared('OrganShieldBlockEvent', OrganShieldBlockEvent)
ContentPacks.putShared('OrganAddStatusEffectEvent', OrganAddStatusEffectEvent)
ContentPacks.putShared('OrganBlockBrokenEvent', OrganBlockBrokenEvent)
ContentPacks.putShared('OrganBlockRightClickedEvent', OrganBlockRightClickedEvent)
ContentPacks.putShared('OrganChestCavityUpdateStrategy', OrganChestCavityUpdateStrategy)
ContentPacks.putShared('OrganTakeOnStrategy', OrganTakeOnStrategy)
ContentPacks.putShared('OrganTakeOffStrategy', OrganTakeOffStrategy)
ContentPacks.putShared('SlotChestCavityUpdateStrategy', SlotChestCavityUpdateStrategy)
ContentPacks.putShared('OrganChestLootEvent', OrganChestLootEvent)
ContentPacks.putShared('OrganEntityBeHurtEvent', OrganEntityBeHurtEvent)
ContentPacks.putShared('OrganEntityDeathEvent', OrganEntityDeathEvent)
ContentPacks.putShared('OrganEntityKillEvent', OrganEntityKillEvent)
ContentPacks.putShared('OrganEntityDoDamageEvent', OrganEntityDoDamageEvent)
ContentPacks.putShared('OrganEntityLootEvent', OrganEntityLootEvent)
ContentPacks.putShared('OrganEntityTickEvent', OrganEntityTickEvent)
ContentPacks.putShared('OrganEntityFallEvent', OrganEntityFallEvent)
ContentPacks.putShared('OrganFoodEatenEvent', OrganFoodEatenEvent)
ContentPacks.putShared('OrganItemRightClickedEvent', OrganItemRightClickedEvent)
ContentPacks.putShared('OrganItemLeftClickedEvent', OrganItemLeftClickedEvent)
ContentPacks.putShared('OrganKeyActiveEvent', OrganKeyActiveEvent)
ContentPacks.putShared('OrganPlayerEnchantEvent', OrganPlayerEnchantEvent)
ContentPacks.putShared('OrganPlayerRollEvent', OrganPlayerRollEvent)
ContentPacks.putShared('OrganPlayerSpawnPhantomsEvent', OrganPlayerSpawnPhantomsEvent)
ContentPacks.putShared('OrganTradeWithVillagerEvent', OrganTradeWithVillagerEvent)
ContentPacks.putShared('OrganVillagerUpdateSpecialPricesEvent', OrganVillagerUpdateSpecialPricesEvent)
ContentPacks.putShared('OrganEntityInteractEvent', OrganEntityInteractEvent)
ContentPacks.putShared('OrganEntityBeInteractedEvent', OrganEntityBeInteractedEvent)
ContentPacks.putShared('OrganExposureFrameAdded', OrganExposureFrameAdded)

// ================ 精英怪事件实例 ================
ContentPacks.putShared('ChampionEntitySpawnedEvent', ChampionEntitySpawnedEvent)
ContentPacks.putShared('ChampionEntityTickEvent', ChampionEntityTickEvent)
ContentPacks.putShared('ChampionEntityBeHurtEvent', ChampionEntityBeHurtEvent)
ContentPacks.putShared('ChampionEntityDeathEvent', ChampionEntityDeathEvent)
ContentPacks.putShared('ChampionEntityKillEvent', ChampionEntityKillEvent)

// ================ 饰品事件实例 ================
ContentPacks.putShared('CuriosEntitySpawnedEvent', CuriosEntitySpawnedEvent)
ContentPacks.putShared('CuriosEntityDeathEvent', CuriosEntityDeathEvent)
ContentPacks.putShared('CuriosEntityKillEvent', CuriosEntityKillEvent)
ContentPacks.putShared('CuriosChestLootEvent', CuriosChestLootEvent)
ContentPacks.putShared('CuriosNewDayEvent', CuriosNewDayEvent)

// ================ 器官/胸腔工具函数 ================
ContentPacks.putShared('GetEntityChestCavityInventory', GetEntityChestCavityInventory)
ContentPacks.putShared('GetChestCavitySlotType', GetChestCavitySlotType)
ContentPacks.putShared('GetDirectionRelativeSlotByParam', GetDirectionRelativeSlotByParam)
// customData 读写
ContentPacks.putShared('GetCustomDataOrDefault', GetCustomDataOrDefault)
ContentPacks.putShared('SetCustomData', SetCustomData)
ContentPacks.putShared('SetCustomDataMap', SetCustomDataMap)
ContentPacks.putShared('GetCustomDataMap', GetCustomDataMap)
ContentPacks.putShared('RemoveCustomDataMap', RemoveCustomDataMap)
// 腐败毒素/生命毒素
ContentPacks.putShared('SetPutridToxinsDamage', SetPutridToxinsDamage)
ContentPacks.putShared('GetPutridToxinsDamage', GetPutridToxinsDamage)
ContentPacks.putShared('ResetPutridToxins', ResetPutridToxins)
ContentPacks.putShared('ResetVitaToxins', ResetVitaToxins)
ContentPacks.putShared('SetVitaToxinsSource', SetVitaToxinsSource)
ContentPacks.putShared('GetVitaToxinsSource', GetVitaToxinsSource)
ContentPacks.putShared('SetVitaToxinsType', SetVitaToxinsType)
ContentPacks.putShared('GetVitaToxinsType', GetVitaToxinsType)
ContentPacks.putShared('SetVitaToxinsCoe', SetVitaToxinsCoe)
ContentPacks.putShared('GetVitaToxinsCoe', GetVitaToxinsCoe)
// 器官物品冷却与提示
ContentPacks.putShared('OrganItemCoolDown', OrganItemCoolDown)
ContentPacks.putShared('OrganItemCoolDownSlience', OrganItemCoolDownSlience)
ContentPacks.putShared('CommonDingNotice', CommonDingNotice)

// ================ 实体范围查询/光环工具函数 ================
ContentPacks.putShared('GetLivingWithinRadius', GetLivingWithinRadius)
ContentPacks.putShared('GetLivingWithinRadiusVec3d', GetLivingWithinRadiusVec3d)
ContentPacks.putShared('GetEntityWithinRadius', GetEntityWithinRadius)
ContentPacks.putShared('GetEntityWithinRadiusVec3d', GetEntityWithinRadiusVec3d)
ContentPacks.putShared('GetNearestEntity', GetNearestEntity)
ContentPacks.putShared('GetNearestEntityVec3d', GetNearestEntityVec3d)
ContentPacks.putShared('GetNearestPlayer', GetNearestPlayer)
ContentPacks.putShared('GetTamedEntityWithinRadius', GetTamedEntityWithinRadius)
ContentPacks.putShared('GetItemEntityWithinRadius', GetItemEntityWithinRadius)
ContentPacks.putShared('SpawnItemEntityWithMovement', SpawnItemEntityWithMovement)
ContentPacks.putShared('ApplyAuraEffect', ApplyAuraEffect)
ContentPacks.putShared('RemoveAuraEffect', RemoveAuraEffect)
ContentPacks.putShared('GetOwnerEntity', GetOwnerEntity)
