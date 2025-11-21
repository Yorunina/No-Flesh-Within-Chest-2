// priority: 4000
/**
 * 
 * @param {Internal.MutableComponent[]} textList 
 */
function HoverTextList(textList) {
    let resultList = []
    textList.forEach((text, index) => {
        if (index == textList.length - 1) {
            resultList.push(text)
            return
        }
        resultList.push(text)
        resultList.push(NewLine)
    })
    return resultList
}
const NewLine = Text.of('\n')

const DefaultSlotType = Text.translatable('slot_type.kubejs.default.1').color('#e0e0e0')
const HighAdaptabilitySlotType = Text.translatable('slot_type.kubejs.high_adaptability.1').color('#00d921')
const ImmunosuppressionSlotType = Text.translatable('slot_type.kubejs.immunosuppression_slot.1').color('#2682fa')
const RosyExplosionSlotType = Text.translatable('slot_type.kubejs.rosy_explosion.1').color('#f26ba8')
const EternalFlameSlotType = Text.translatable('slot_type.kubejs.revolution_flame.1').color('#ff672b')
const MachinaryLubricantSlotType = Text.translatable('slot_type.kubejs.machinary_lubricant.1').color('#e69900')
const GulaSlotType = Text.translatable('slot_type.kubejs.gula_slot.1').color('#ae5dce')
const ContainerSlotType = Text.translatable('slot_type.kubejs.container_slot.1').color('#afbab7')
const DigestSlotType = Text.translatable('slot_type.kubejs.digest_slot.1').color('#d5e05a')


const LuckHover = Text.translatable('tooltips.kubejs.hover.luck.0').green().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.luck.0').green(),
        Text.translatable('tooltips.kubejs.hover.luck.1'),
        Text.translatable('tooltips.kubejs.hover.luck.2'),
        Text.translatable('tooltips.kubejs.hover.luck.3')
    ]))
const KeyActiveHover = Text.translatable('tooltips.kubejs.hover.key_active.0').gold().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.key_active.0').gold(),
        Text.translatable('tooltips.kubejs.hover.key_active.1')
    ]))
const FrozenHover = Text.translatable('tooltips.kubejs.hover.frozen.0').aqua().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.frozen.0').aqua(),
        Text.translatable('tooltips.kubejs.hover.frozen.1'),
        Text.translatable('tooltips.kubejs.hover.frozen.2'),
    ]))
const SoildCoreHover = Text.translatable('tooltips.kubejs.hover.solid_core.0').gray().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.solid_core.0').gray(),
        Text.translatable('tooltips.kubejs.hover.solid_core.1'),
    ]))
const VitaToxinsHover = Text.translatable('tooltips.kubejs.hover.vita_toxins.0').red().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.vita_toxins.0').red(),
        Text.translatable('tooltips.kubejs.hover.vita_toxins.1'),
        Text.translatable('tooltips.kubejs.hover.vita_toxins.2'),
        Text.translatable('tooltips.kubejs.hover.vita_toxins.3'),
        Text.translatable('tooltips.kubejs.hover.vita_toxins.4'),
    ]))
const PutridToxinsHover = Text.translatable('tooltips.kubejs.hover.putrid_toxins.0').darkGreen().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.putrid_toxins.0').darkGreen(),
        Text.translatable('tooltips.kubejs.hover.putrid_toxins.1'),
        Text.translatable('tooltips.kubejs.hover.putrid_toxins.2'),
        Text.translatable('tooltips.kubejs.hover.putrid_toxins.3'),
    ]))
const MagicOverloadHover = Text.translatable('tooltips.kubejs.hover.magic_overload.0').aqua().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.magic_overload.0').aqua(),
        Text.translatable('tooltips.kubejs.hover.magic_overload.1'),
    ]))

const ChestcavityTypeHover = Text.translatable('tooltips.kubejs.hover.chestcavity_type.0').gold().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.chestcavity_type.0').gold(),
        Text.translatable('tooltips.kubejs.hover.chestcavity_type.1'),
        Text.translatable('tooltips.kubejs.hover.chestcavity_type.2'),
        Text.translatable('tooltips.kubejs.hover.chestcavity_type.3'),
    ]))
const RevolutionMachineTypeHover = Text.translatable('tooltips.kubejs.hover.revolution_machine_type.0').color('#f74200').underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.revolution_machine_type.0').color('#f74200'),
        Text.translatable('tooltips.kubejs.hover.revolution_machine_type.1'),
        Text.translatable('tooltips.kubejs.hover.revolution_machine_type.2'),
    ]))
const FunctionalEntityTypeHover = Text.translatable('tooltips.kubejs.hover.functional_entity_type.0').white().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.functional_entity_type.0').white(),
        Text.translatable('tooltips.kubejs.hover.functional_entity_type.1'),
        Text.translatable('tooltips.kubejs.hover.functional_entity_type.2'),
    ]))
const GulaTypeHover = Text.translatable('tooltips.kubejs.hover.gula_type.0').color('#ce00ee').underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.gula_type.0').color('#ce00ee'),
        Text.translatable('tooltips.kubejs.hover.gula_type.1'),
        Text.translatable('tooltips.kubejs.hover.gula_type.2'),
        Text.translatable('tooltips.kubejs.hover.gula_type.3'),
    ]))

const RoseTypeHover = Text.translatable('tooltips.kubejs.hover.rose_type.0').color('#e85195').underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.rose_type.0').color('#e85195'),
        Text.translatable('tooltips.kubejs.hover.rose_type.1'),
        Text.translatable('tooltips.kubejs.hover.rose_type.2'),
    ]))

const DefaultTypeHover = Text.translatable('tooltips.kubejs.hover.default_type.0').gray().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.default_type.0').gray(),
        Text.translatable('tooltips.kubejs.hover.default_type.1'),
    ]))

const TimeStabilityHover = Text.translatable('tooltips.kubejs.hover.time_stability.0').gold().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.time_stability.0').gray(),
        Text.translatable('tooltips.kubejs.hover.time_stability.1'),
    ]))


const UnstableHover = Text.translatable('tooltips.kubejs.hover.unstable.0').red().underlined()
    .hover(HoverTextList([
        Text.translatable('tooltips.kubejs.hover.unstable.0').red(),
        Text.translatable('tooltips.kubejs.hover.unstable.1'),
        Text.translatable('tooltips.kubejs.hover.unstable.2'),
    ]))