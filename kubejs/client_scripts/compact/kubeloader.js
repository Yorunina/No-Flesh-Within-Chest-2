// priority: 998
const IsLoadedKubeloader = Platform.isLoaded('kubeloader')

if (IsLoadedKubeloader) {
    ContentPacks.putShared('RegisteryOrganTooltip', RegisteryOrganTooltip)
    ContentPacks.putShared('MultiStateTooltip', MultiStateTooltip)

    ContentPacks.putShared('DefaultSlotType', DefaultSlotType)
    ContentPacks.putShared('HighAdaptabilitySlotType', HighAdaptabilitySlotType)
    ContentPacks.putShared('RosyExplosionSlotType', RosyExplosionSlotType)
    ContentPacks.putShared('EternalFlameSlotType', EternalFlameSlotType)
    ContentPacks.putShared('MachinaryLubricantSlotType', MachinaryLubricantSlotType)
    ContentPacks.putShared('GulaSlotType', GulaSlotType)
    ContentPacks.putShared('ContainerSlotType', ContainerSlotType)
    ContentPacks.putShared('DigestSlotType', DigestSlotType)

    ContentPacks.putShared('OrganItemMPMTypeNotShow', OrganItemMPMTypeNotShow)
    ContentPacks.putShared('OrganItemMPMTypeNotShowText', OrganItemMPMTypeNotShowText)
    ContentPacks.putShared('OrganItemMPMTypeShow', OrganItemMPMTypeShow)
    ContentPacks.putShared('OrganItemMPMTypeShowText', OrganItemMPMTypeShowText)

    ContentPacks.putShared('LuckHover', LuckHover)
    ContentPacks.putShared('PointAtHover', PointAtHover)
    ContentPacks.putShared('KeyActiveHover', KeyActiveHover)
    ContentPacks.putShared('FrozenHover', FrozenHover)
    ContentPacks.putShared('SoildCoreHover', SoildCoreHover)
    ContentPacks.putShared('VitaToxinsHover', VitaToxinsHover)
    ContentPacks.putShared('PutridToxinsHover', PutridToxinsHover)
    ContentPacks.putShared('MagicOverloadHover', MagicOverloadHover)
    ContentPacks.putShared('ChestcavityTypeHover', ChestcavityTypeHover)
    ContentPacks.putShared('RevolutionMachineTypeHover', RevolutionMachineTypeHover)
    ContentPacks.putShared('FunctionalEntityTypeHover', FunctionalEntityTypeHover)
    ContentPacks.putShared('GulaTypeHover', GulaTypeHover)
    ContentPacks.putShared('RoseTypeHover', RoseTypeHover)
    ContentPacks.putShared('DefaultTypeHover', DefaultTypeHover)
    ContentPacks.putShared('TimeStabilityHover', TimeStabilityHover)
}