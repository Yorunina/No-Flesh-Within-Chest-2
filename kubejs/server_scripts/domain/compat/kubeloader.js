// priority: 998
const IsLoadedKubeloader = Platform.isLoaded('kubeloader')

if (IsLoadedKubeloader) {
    let type = ContentPacks.type()
    let serverField = {
        funcs: {
            'RegisterTitleJson': RegisterTitleJson,
            'TitleJsonModel': TitleJsonModel,
            'RegistryOrganStrategy': RegistryOrganStrategy,
            'OrganStrategyModel': OrganStrategyModel,
            'RegistryAttributeIdentifier': RegistryAttributeIdentifier,
            'AttributeUUIDModel': AttributeUUIDModel,
            'RegistryOrgan': RegistryOrgan,
            'RegistryPseudoOrgan': RegistryPseudoOrgan,
            'OrganItemModel': OrganItemModel,
            'DungeonWaveModel': DungeonWaveModel,
            'DungeonEventActionModel': DungeonEventActionModel,
            'NewKillAmountWave': NewKillAmountWave,
            'NewContinousKillAmountWave': NewContinousKillAmountWave,
            'RegisterOrganScoreGoopRenderStrategy': RegisterOrganScoreGoopRenderStrategy,
            'RegisterOriginChangedStrategy': RegisterOriginChangedStrategy,
            'SlotStrategyModel': SlotStrategyModel,
        },
        consts: {
            'OrganBlockBrokenEvent': OrganBlockBrokenEvent,
            'OrganChestCavityUpdateStrategy': OrganChestCavityUpdateStrategy,
            'OrganTakeOnStrategy': OrganTakeOnStrategy,
            'OrganTakeOffStrategy': OrganTakeOffStrategy,
            'SlotChestCavityUpdateStrategy': SlotChestCavityUpdateStrategy,
            'OrganChestLootEvent': OrganChestLootEvent,
            'OrganEntityBeHurtEvent': OrganEntityBeHurtEvent,
            'OrganEntityDeathEvent': OrganEntityDeathEvent,
            'OrganEntityDoDamageEvent': OrganEntityDoDamageEvent,
            'OrganEntityLootEvent': OrganEntityLootEvent,
            'OrganEntityTickEvent': OrganEntityTickEvent,
            'OrganFoodEatenEvent': OrganFoodEatenEvent,
            'OrganItemRightClickedEvent': OrganItemRightClickedEvent,
            'OrganKeyBindEvent': OrganKeyBindEvent,
            'OrganPlayerEnchantEvent': OrganPlayerEnchantEvent,
            'PlayerSpellCastEvent': ISSPlayerSpellCastEvent,
            'OrganSpellLevelModifyEvent': ISSSpellLevelModifyEvent,
            'OrganSpellSelectionEvent': ISSSpellSelectionEvent,
            'OrganScoreGoopRenderStrategy': OrganScoreGoopRenderStrategy,
        },
    }

    ContentPacks.putShared(type, serverField)
}