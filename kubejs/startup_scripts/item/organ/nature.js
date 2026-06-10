// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:sea_bunny_skin').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).texture('kubejs:item/organs/nature/sea_bunny_skin').tag('kubejs:nature')

    event.create('kubejs:mammary_gland').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).texture('kubejs:item/organs/nature/mammary_gland').tag('kubejs:nature')

    event.create('kubejs:moew_nose').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).texture('kubejs:item/organs/nature/moew_nose').tag('kubejs:nature')

    event.create('kubejs:leaf_insect_exoskeleton').maxStackSize(1).texture('kubejs:item/organs/nature/leaf_insect_exoskeleton').tag('kubejs:nature')

    event.create('kubejs:tentacles_harvester').maxStackSize(1).texture('kubejs:item/organs/nature/tentacles_harvester').tag('kubejs:nature')

    event.create('kubejs:dumbo_octopus_hat').maxStackSize(1).texture('kubejs:item/organs/nature/dumbo_octopus_hat').tag('kubejs:nature')

    event.create('kubejs:ferret_tail').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).texture('kubejs:item/organs/nature/ferret_tail').tag('kubejs:nature')

    event.create('kubejs:jumping_spider_leg').food(food => food.hunger(2).saturation(0.5).effect('minecraft:poison', 200, 0, 0.5)).maxStackSize(1).texture('kubejs:item/organs/nature/jumping_spider_leg').tag('kubejs:nature').tag('kubejs:muscle')

    event.create('kubejs:spider_leg').food(food => food.hunger(2).saturation(0.5).effect('minecraft:poison', 200, 0, 0.5)).maxStackSize(1).texture('kubejs:item/organs/nature/spider_leg').tag('kubejs:nature').tag('kubejs:muscle')

    event.create('kubejs:koi_fish_scale').maxStackSize(1).texture('kubejs:item/organs/nature/koi_fish_scale').tag('kubejs:nature')

    event.create('kubejs:otter_tooth').maxStackSize(1).texture('kubejs:item/organs/nature/otter_tooth').tag('kubejs:nature')

    event.create('kubejs:red_panda_tail').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).texture('kubejs:item/organs/nature/red_panda_tail').tag('kubejs:nature')

    event.create('kubejs:shima_enaga_feather').maxStackSize(1).texture('kubejs:item/organs/nature/shima_enaga_feather').tag('kubejs:nature')

    event.create('kubejs:deer_horn').maxStackSize(1).texture('kubejs:item/organs/nature/deer_horn').tag('kubejs:nature')

    event.create('kubejs:red_wolf_beard').maxDamage(30).maxStackSize(1).texture('kubejs:item/organs/nature/red_wolf_beard').tag('kubejs:nature')

    event.create('kubejs:raccoon_paw').food(food => food.hunger(1).saturation(0.5)).maxDamage(30).maxStackSize(1).texture('kubejs:item/organs/nature/raccoon_paw').tag('kubejs:nature')

    event.create('kubejs:boar_nose').maxDamage(30).maxStackSize(1).texture('kubejs:item/organs/nature/boar_nose').tag('kubejs:nature')

    event.create('kubejs:minisheep_gland').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).texture('kubejs:item/organs/nature/minisheep_gland').tag('kubejs:nature')

    event.create('kubejs:squirrel_tail').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).texture('kubejs:item/organs/nature/squirrel_tail').tag('kubejs:nature')

    event.create('kubejs:pelican_larynx').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).texture('kubejs:item/organs/nature/pelican_larynx').tag('kubejs:nature')

    event.create('kubejs:owl_vertebrae').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).texture('kubejs:item/organs/nature/owl_vertebrae').tag('kubejs:nature')

    event.create('kubejs:bison_horn').maxStackSize(1).texture('kubejs:item/organs/nature/bison_horn').tag('kubejs:nature')

    event.create('kubejs:turkey_gizzard').maxStackSize(1).texture('kubejs:item/organs/nature/turkey_gizzard').tag('kubejs:nature').tag('kubejs:stomach')

    event.create('kubejs:penguin_flipper').maxStackSize(1).texture('kubejs:item/organs/nature/penguin_flipper').tag('kubejs:nature')

    event.create('kubejs:dog_tail').maxStackSize(1).texture('kubejs:item/organs/nature/dog_tail').tag('kubejs:nature')

    event.create('kubejs:hedgehog_thorn').maxStackSize(1).texture('kubejs:item/organs/nature/hedgehog_thorn').tag('kubejs:nature')

    event.create('kubejs:cassowary_muscle').maxStackSize(1).texture('kubejs:item/organs/nature/cassowary_muscle').tag('kubejs:nature').tag('kubejs:muscle')

    event.create('kubejs:flamingo_beak').maxStackSize(1).texture('kubejs:item/organs/nature/flamingo_beak').tag('kubejs:nature')

    event.create('kubejs:urchinkin_stinger').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/urchinkin_stinger')

    event.create('kubejs:giant_claw').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/giant_claw')

    event.create('kubejs:cindaria_umbrella').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/cindaria_umbrella')

    event.create('kubejs:wilden_heart').maxStackSize(1).tag('kubejs:heart').tag('kubejs:nature').texture('kubejs:item/organs/nature/wilden_heart')

    event.create('kubejs:chimera_heart').maxStackSize(1).tag('kubejs:heart').tag('kubejs:nature').texture('kubejs:item/organs/nature/chimera_heart')

    event.create('kubejs:dragonfly_wing').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/dragonfly_wing')

    event.create('kubejs:leech_mouthpart').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/leech_mouthpart')

    event.create('kubejs:rat_ear').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/rat_ear')

    event.create('kubejs:bee_honey_stomach').maxStackSize(1).maxDamage(5).tag('kubejs:nature').texture('kubejs:item/organs/nature/bee_honey_stomach').tag('kubejs:stomach')

    event.create('kubejs:wolf_fang').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/wolf_fang')

    event.create('kubejs:pig_stomach').food(food => food.hunger(2).saturation(1)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/pig_stomach').tag('kubejs:stomach')

    event.create('kubejs:rib_blade').maxStackSize(1).tag('kubejs:nature').tag('kubejs:bone').texture('kubejs:item/organs/nature/rib_blade')

    event.create('kubejs:allay_wing').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/allay_wing')

    event.create('kubejs:symbiocto_arm').food(food => food.hunger(3).saturation(1)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/symbiocto_arm').tag('kubejs:nature').tag('kubejs:muscle')

    event.create('kubejs:axolotl_gill').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/axolotl_gill').tag('kubejs:lung')

    event.create('kubejs:bat_throat').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/bat_throat')

    event.create('kubejs:hatching_chamber').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/hatching_chamber')

    event.create('kubejs:swim_bladder').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/swim_bladder').tag('kubejs:lung')

    event.create('kubejs:dolphin_fin').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/dolphin_fin')

    event.create('kubejs:guardian_core').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/guardian_core')

    event.create('kubejs:elder_guardian_core').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/elder_guardian_core')

    event.create('kubejs:camel_hump').food(food => food.hunger(3).saturation(2)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/camel_hump')

    event.create('kubejs:fox_tail').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/fox_tail')

    event.create('kubejs:frog_tongue').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/frog_tongue')

    event.create('kubejs:glow_gland').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/glow_gland')

    event.create('kubejs:horse_tendon').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/horse_tendon').tag('kubejs:muscle')

    event.create('kubejs:llama_gland').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/llama_gland')

    event.create('kubejs:bear_paw').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/bear_paw')

    event.create('kubejs:pillager_gland').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/pillager_gland')

    event.create('kubejs:pufferfish_liver').food(food => food.hunger(2).saturation(1).effect('minecraft:poison', 200, 0, 1)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/pufferfish_liver').tag('kubejs:liver')

    event.create('kubejs:rabbit_foot').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/rabbit_foot')

    event.create('kubejs:ravager_hoof').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/ravager_hoof')

    event.create('kubejs:silverfish_gland').food(food => food.hunger(1).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/silverfish_gland')

    event.create('kubejs:slime_colloid').food(food => food.hunger(2).saturation(1)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/slime_colloid')

    event.create('kubejs:sulfur_cube_colloid').food(food => food.hunger(2).saturation(1)).maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/sulfur_cube_colloid')

    event.create('kubejs:pumpkin_shooter').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/pumpkin_shooter')

    event.create('kubejs:turtle_shell').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/turtle_shell')

    event.create('kubejs:refill_agreement').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/refill_agreement')

    event.create('kubejs:armadillo_shell').maxStackSize(1).tag('kubejs:nature').texture('kubejs:item/organs/nature/armadillo_shell')

    event.create('kubejs:appendix').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/appendix').tag('kubejs:appendix')
    event.create('kubejs:intestine').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/intestine').tag('kubejs:intestine')
    event.create('kubejs:heart').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/heart').tag('kubejs:heart')
    event.create('kubejs:kidney').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/kidney').tag('kubejs:kidney')
    event.create('kubejs:liver').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/liver').tag('kubejs:liver')
    event.create('kubejs:lung').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/lung').tag('kubejs:lung')
    event.create('kubejs:muscle').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/muscle').tag('kubejs:muscle')
    event.create('kubejs:rib').maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/rib').tag('kubejs:bone')
    event.create('kubejs:spine').maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/spine').tag('kubejs:spine')
    event.create('kubejs:spleen').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/spleen').tag('kubejs:spleen')
    event.create('kubejs:stomach').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/stomach').tag('kubejs:stomach')

    event.create('kubejs:animal_appendix').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/animal_appendix').tag('kubejs:appendix')
    event.create('kubejs:animal_intestine').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/animal_intestine').tag('kubejs:intestine')
    event.create('kubejs:animal_heart').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/animal_heart').tag('kubejs:heart')
    event.create('kubejs:animal_kidney').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/animal_kidney').tag('kubejs:kidney')
    event.create('kubejs:animal_liver').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/animal_liver').tag('kubejs:liver')
    event.create('kubejs:animal_lung').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/animal_lung').tag('kubejs:lung')
    event.create('kubejs:animal_muscle').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/animal_muscle').tag('kubejs:muscle')
    event.create('kubejs:animal_rib').maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/animal_rib').tag('kubejs:bone')
    event.create('kubejs:animal_spine').maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/animal_spine').tag('kubejs:spine')
    event.create('kubejs:animal_spleen').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/animal_spleen').tag('kubejs:spleen')
    event.create('kubejs:animal_stomach').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/animal_stomach').tag('kubejs:stomach')

    event.create('kubejs:rumen').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/rumen').tag('kubejs:stomach')

    event.create('kubejs:insect_stomach').food(food => food.hunger(1).saturation(0.5).effect('minecraft:nausea', 200, 0, 1)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/insect_stomach').tag('kubejs:stomach')
    event.create('kubejs:insect_caeca').food(food => food.hunger(1).saturation(0.5).effect('minecraft:nausea', 200, 0, 1)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/insect_caeca')
    event.create('kubejs:insect_heart').food(food => food.hunger(1).saturation(0.5).effect('minecraft:nausea', 200, 0, 1)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/insect_heart').tag('kubejs:heart')
    event.create('kubejs:insect_intestine').food(food => food.hunger(1).saturation(0.5).effect('minecraft:nausea', 200, 0, 1)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/insect_intestine').tag('kubejs:intestine')
    event.create('kubejs:insect_lung').food(food => food.hunger(1).saturation(0.5).effect('minecraft:nausea', 200, 0, 1)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/insect_lung').tag('kubejs:lung')
    event.create('kubejs:insect_muscle').food(food => food.hunger(1).saturation(0.5).effect('minecraft:nausea', 200, 0, 1)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/insect_muscle').tag('kubejs:muscle')

    event.create('kubejs:gills').food(food => food.hunger(2).saturation(0.5)).maxStackSize(1).tag('kubejs:nature').tag('kubejs:basic').texture('kubejs:item/organs/nature/gills').tag('kubejs:lung')

    event.create('kubejs:explosion_bag').maxStackSize(1)
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY || !slot.allowModification(player)) return false
            if (oStack.isEmpty()) {
                RemoveBundleOneStack(stack).ifPresent(pStack => {
                    PlayBundleRemoveSound(player)
                    access.set(pStack)
                })
            }
            return true
        })
        .overrideStackedOnOther((stack, slot, action, player) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY) return false
            let oStack = slot.getItem()
            if (oStack.isEmpty()) {
                PlayBundleRemoveSound(player)
                RemoveBundleOneStack(stack).ifPresent((pStack) => slot.safeInsert(pStack))
            }
            return true
        })
        .barWidth((stack) => {
            let stackList = GetBundleContents(stack)
            return Math.min(1 + 12 * Math.min(stackList.length, 1), 13)
        })
        .barColor(() => Color.DARK_BLUE)
        .tooltipImage((stack) => {
            let itemList = $NonNullList.create()
            GetBundleContents(stack).forEach((pStack) => itemList.add(pStack))
            return Optional.of(new $BundleTooltip(itemList, GetBundleCountentWeight(stack, (pStack) => pStack.getMaxStackSize() / 64)))
        })
        .canFitInsideContainerItems(false)
        .texture('kubejs:item/organs/nature/explosion_bag').tag('kubejs:nature').tag('kubejs:stomach')


    event.create('kubejs:parrot_beak').maxStackSize(1)
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY || !slot.allowModification(player)) return false
            if (oStack.isEmpty()) {
                RemoveBundleOneStack(stack).ifPresent(pStack => {
                    PlayBundleRemoveSound(player)
                    access.set(pStack)
                })
            } else if (oStack.isBlock()) {
                let added = AddItemIntoBundle(stack, oStack, 1, (pStack) => 1)
                if (added > 0) {
                    PlayerBundleInsertSound(player)
                    oStack.shrink(added)
                }
            }
            return true
        })
        .overrideStackedOnOther((stack, slot, action, player) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY) return false
            let oStack = slot.getItem()
            if (oStack.isEmpty()) {
                PlayBundleRemoveSound(player)
                RemoveBundleOneStack(stack).ifPresent((pStack) => slot.safeInsert(pStack))
            } else if (oStack.isBlock()) {
                let taken = slot.safeTake(oStack.getCount(), 65535, player)
                let added = AddItemIntoBundle(stack, taken, 1, (pStack) => 1)
                if (added > 0) PlayerBundleInsertSound(player)
                if (taken.getCount() > added) slot.safeInsert(taken.copyWithCount(taken.getCount() - added))
            }
            return true
        })
        .barWidth((stack) => {
            let stackList = GetBundleContents(stack)
            return Math.min(1 + 12 * stackList.length, 13)
        })
        .barColor(() => Color.DARK_BLUE)
        .tooltipImage((stack) => {
            let itemList = $NonNullList.create()
            GetBundleContents(stack).forEach((pStack) => itemList.add(pStack))
            return Optional.of(new $BundleTooltip(itemList, GetBundleCountentWeight(stack, (pStack) => 1)))
        })
        .canFitInsideContainerItems(false)
        .texture('kubejs:item/organs/nature/parrot_beak')
        .tag('kubejs:nature')

    event.create('kubejs:scry_stomach_pouch').food(food => food.hunger(1).saturation(1)).maxStackSize(1)
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY || !slot.allowModification(player)) return false
            if (oStack.isEmpty()) {
                RemoveBundleOneStack(stack).ifPresent(pStack => {
                    PlayBundleRemoveSound(player)
                    access.set(pStack)
                })
            } else if (oStack.isBlock()) {
                let added = AddItemIntoBundle(stack, oStack, 4, (pStack) => 1)
                if (added > 0) {
                    PlayerBundleInsertSound(player)
                    oStack.shrink(added)
                }
            }
            return true
        })
        .overrideStackedOnOther((stack, slot, action, player) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY) return false
            let oStack = slot.getItem()
            if (oStack.isEmpty()) {
                PlayBundleRemoveSound(player)
                RemoveBundleOneStack(stack).ifPresent((pStack) => slot.safeInsert(pStack))
            } else if (oStack.isBlock()) {
                let taken = slot.safeTake(oStack.getCount(), 65535, player)
                let added = AddItemIntoBundle(stack, taken, 4, (pStack) => 1)
                if (added > 0) PlayerBundleInsertSound(player)
                if (taken.getCount() > added) slot.safeInsert(taken.copyWithCount(taken.getCount() - added))
            }
            return true
        })
        .barWidth((stack) => {
            let stackList = GetBundleContents(stack)
            return Math.min(1 + 12 * stackList.length / 4, 13)
        })
        .barColor(() => Color.DARK_BLUE)
        .tooltipImage((stack) => {
            let itemList = $NonNullList.create()
            GetBundleContents(stack).forEach((pStack) => itemList.add(pStack))
            return Optional.of(new $BundleTooltip(itemList, GetBundleCountentWeight(stack, (pStack) => 1)))
        })
        .canFitInsideContainerItems(false)
        .texture('kubejs:item/organs/nature/scry_stomach_pouch')
        .tag('kubejs:nature')
        .tag('kubejs:stomach')
})