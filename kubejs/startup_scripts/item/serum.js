// priority: 1000
const AnimalEntityTypes = ["minecraft:pig", "minecraft:cow", "minecraft:allay", "minecraft:armadillo", "minecraft:axolotl", "minecraft:bat", "minecraft:bee", "minecraft:camel", "minecraft:cat", "minecraft:chicken", "minecraft:cod", "minecraft:salmon", "minecraft:tropical_fish", "minecraft:mooshroom", "minecraft:dolphin", "minecraft:fox", "minecraft:frog", "minecraft:tadpole", "minecraft:glow_squid", "minecraft:goat", "minecraft:horse", "minecraft:donkey", "minecraft:mule", "minecraft:llama", "minecraft:trader_llama", "minecraft:ocelot", "minecraft:panda", "minecraft:parrot", "minecraft:polar_bear", "minecraft:pufferfish", "minecraft:rabbit", "minecraft:sheep", "minecraft:sniffer", "minecraft:squid", "minecraft:sulfur_cube", "minecraft:turtle", "minecraft:wolf", "wildernature:bison", "wildernature:boar", "wildernature:cassowary", "wildernature:deer", "wildernature:dog", "wildernature:flamingo", "wildernature:hedgehog", "wildernature:minisheep", "wildernature:owl", "wildernature:pelican", "wildernature:penguin", "wildernature:raccoon", "wildernature:red_wolf", "wildernature:squirrel", "wildernature:turkey", "crittersandcompanions:dragonfly", "crittersandcompanions:dumbo_octopus", "crittersandcompanions:ferret", "crittersandcompanions:jumping_spider", "crittersandcompanions:koi_fish", "crittersandcompanions:ladybug", "crittersandcompanions:leaf_insect", "crittersandcompanions:otter", "crittersandcompanions:red_panda", "crittersandcompanions:roly_poly", "crittersandcompanions:sea_bunny", "crittersandcompanions:shima_enaga", "crittersandcompanions:snail", "crittersandcompanions:stag_beetle", "crittersandcompanions:stick_bug", "crittersandcompanions:weevil",]

StartupEvents.registry('biomancy:serum', event => {
    event.create(`kubejs:animal_inducer`)
        .canAffectEntity((level, serumData, source, target) => target instanceof $FleshBlob)
        .affectEntity((level, serumData, source, target) => {
            if (target instanceof $FleshBlob) {
                let targetEntityType = AnimalEntityTypes[serumData.getInt('state')]
                target.persistentData.putString('inducerEntityType', targetEntityType)
                target.potionEffects.add('kubejs:differentiation_induction', 60, 0)
            }
        })
        .canAffectPlayerSelf((level, serumData, targetSelf) => true)
        .affectPlayerSelf((level, serumData, targetSelf) => {
            targetSelf.potionEffects.add('kubejs:differentiation_induction', 60, 0)
        })
})

StartupEvents.registry('item', event => {
    event.create(`kubejs:animal_inducer_serum`, 'biomancy:basic_serum')
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if ((!oStack || oStack.isEmpty()) && action == ClickAction.SECONDARY && slot.allowModification(player)) {
                if (!stack.hasNBT()) stack.setNbt(new $CompoundTag())
                const nbt = stack.getNbt()
                if (!nbt.contains('biomancy:serum_data')) nbt.put('biomancy:serum_data', new $CompoundTag())
                const bioNbt = nbt.getCompound('biomancy:serum_data')
                const state = bioNbt.getInt('state')
                bioNbt.putInt('state', (state + 1) % AnimalEntityTypes.length)
                return true
            }
            return false
        })
        .texture(`kubejs:item/serums/animal_inducer_serum`)
        .serum(`kubejs:animal_inducer`)
        .tag('kubejs:induction_serum')
        .tag('biomancy:custom_serum_item')
})

StartupEvents.registry('item', event => {
    event.create(`kubejs:empty_inducer_serum`)
        .texture(`kubejs:item/serums/empty_inducer_serum`)
})


StartupEvents.registry('item', event => {
    event.create(`kubejs:alpha_pheromone_serum`, 'biomancy:basic_serum')
        .texture(`kubejs:item/serums/alpha_pheromone_serum`)
        .serum(`kubejs:alpha_pheromone`)
        .tag('kubejs:pheromone_serum')
    event.create(`kubejs:beta_pheromone_serum`, 'biomancy:basic_serum')
        .texture(`kubejs:item/serums/beta_pheromone_serum`)
        .serum(`kubejs:beta_pheromone`)
        .tag('kubejs:pheromone_serum')
    event.create(`kubejs:gamma_pheromone_serum`, 'biomancy:basic_serum')
        .texture(`kubejs:item/serums/gamma_pheromone_serum`)
        .serum(`kubejs:gamma_pheromone`)
        .tag('kubejs:pheromone_serum')
    event.create(`kubejs:precursor_pheromone_serum`, 'biomancy:basic_serum')
        .texture(`kubejs:item/serums/precursor_pheromone_serum`)
        .serum(`kubejs:precursor_pheromone`)
})

StartupEvents.registry('biomancy:serum', event => {
    event.create(`kubejs:alpha_pheromone`)
    event.create(`kubejs:beta_pheromone`)
    event.create(`kubejs:gamma_pheromone`)
    event.create(`kubejs:precursor_pheromone`)
})