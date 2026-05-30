// priority: 501
function NewGulaChallengeGoal(entity) {
    return new $CustomGoal(
        'gula_challenge',
        entity,
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            const level = mob.level
            if (!level.isRaining() || !level.isNight()) return false
            if (!mob.persistentData.contains('gulaChallenge')) {
                mob.persistentData.put('gulaChallenge', new $CompoundTag())
            }
            let targetBlock = FindNearestBlockAround(level, mob.blockPosition(), 6, 2, (curBlock) => {
                if (curBlock.blockState.isAir()) return false
                if (!curBlock.hasTag('kubejs:table_block')) return false
                let pPos = curBlock.pos
                for (let posOffset of [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]]) {
                    let neighborPos = pPos.offset(posOffset[0], posOffset[1], posOffset[2])
                    let neighborBlock = level.getBlock(neighborPos)
                    if (neighborBlock.hasTag('kubejs:chair_block')) {
                        if (IsAnyOnChair(curBlock)) continue
                        return true
                    }
                }
                return false
            })
            if (!targetBlock) return false
            return true
        },
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            const level = mob.level
            if (!level.isRaining() || !level.isNight()) return false
            return mob.persistentData.contains('gulaChallenge')
        },
        true,
        /** @param {Internal.PathfinderMob} mob **/ mob => {
        },
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            const level = mob.level
            mob.unRide()
            RemoveCustomGoalByName(mob.goalSelector, 'gula_challenge')
            mob.discard()
            level.spawnParticles($ParticleTypes.SMOKE, false, mob.x, mob.y + 0.25, mob.z, 0, 0.2, 0, 30, 0.1)
        },
        false, // 是否每个tick都需要更新
        /** @param {Internal.PathfinderMob} mob **/ mob => {
            if (!mob.persistentData.contains('gulaChallenge')) {
                mob.persistentData.put('gulaChallenge', new $CompoundTag())
            }
            const level = mob.level
            const persistentData = mob.persistentData.getCompound('gulaChallenge')
            if (persistentData.contains('waitingTimer') && persistentData.getInt('waitingTimer') > level.time) return

            /**@type {Internal.BlockContainerJS} */
            let chairBlock
            let tableBlock = FindNearestBlockAround(level, mob.blockPosition(), 6, 2, (curBlock) => {
                if (curBlock.blockState.isAir()) return false
                if (!curBlock.hasTag('kubejs:table_block')) return false
                let pPos = curBlock.pos
                for (let posOffset of [[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]]) {
                    let neighborPos = pPos.offset(posOffset[0], posOffset[1], posOffset[2])
                    let neighborBlock = level.getBlock(neighborPos)
                    if (neighborBlock.hasTag('kubejs:chair_block')) {
                        if (IsAnyOnChair(curBlock)) continue
                        chairBlock = neighborBlock
                        return true
                    }
                }
                return false
            })
            if (!tableBlock || !chairBlock) return mob.isPassenger() ? mob.unRide() : null
            const chairPos = chairBlock.getPos()
            if (!mob.isPassenger()) {
                if (mob.position().distanceTo(chairPos) <= 2) {
                    let chairFacing = chairBlock.blockState.getValue($BlockStateProperties.HORIZONTAL_FACING)
                    if (chairBlock.id.startsWith('refurbished_furniture')) chairFacing = chairFacing.getOpposite()
                    SitOnChair(mob, chairPos, 0.5, chairFacing, false)
                    persistentData.putInt('waitingTimer', level.time + 20 * 5)
                } else {
                    NavigateWithDegrade(mob, chairPos, 1.0)
                }
            }

            if (!(mob.getVehicle() instanceof $Seat)) return

            const tablePos = tableBlock.getPos()
            const onTablePos = tablePos.above()
            const onTableBlock = level.getBlock(onTablePos)

            if (!persistentData.contains('targetDish')) {
                if (!onTableBlock || onTableBlock.blockState.isAir()) {
                    let round = persistentData.getInt('round')
                    level.setBlockAndUpdate(onTablePos, GetPlonkDefaultBlockState())
                    /**@type {Internal.TilePlacedItems} */
                    let plonkBlockEntity = level.getBlockEntity(onTablePos)
                    if (round >= 7) {
                        plonkBlockEntity.insertStack(Item.of('candlelight:note_paper_written',
                            `{author:"§kGula§r",text:["
                            ${Text.translatable(`tooltips.gula_challenge.text.7`).getString()}"],
                            title:"${Text.translatable(`tooltips.gula_challenge.title.7`).getString()}"}`), 0)
                        plonkBlockEntity.setChanged()
                        plonkBlockEntity.clean()
                        let nearestPlayer = GetNearestPlayer(level, mob.position(), 16)
                        MAAUtils.onKubeTaskFinish('gula_challenge_success', nearestPlayer, (task, pPlayer, teamData) => teamData.addProgress(task, 1))
                        return mob.persistentData.remove('gulaChallenge')
                    }
                    let targetDish = Item.of(GetGulaChallengeTargetDish(round))
                    plonkBlockEntity.insertStack(Item.of('candlelight:note_paper_written',
                        `{author:"§kGula§r",text:["${Text.translatable(`tooltips.gula_challenge.text.${round}`, targetDish.getHoverName().getString()).getString()}"],title:"${Text.translatable(`tooltips.gula_challenge.title.${round}`).getString()}"}`), 0)
                    plonkBlockEntity.setChanged()
                    plonkBlockEntity.clean()
                    level.playSound(null, tablePos.getX(), tablePos.getY(), tablePos.getZ(), 'item.book.page_turn', mob.getSoundSource(), 1, 1)
                    persistentData.putInt('round', round + 1)
                    persistentData.putString('targetDish', targetDish.getId())
                }
            } else if (persistentData.contains('isEating')) {
                if (level.time < persistentData.getInt('isEating')) {
                    mob.swing()
                    level.playSound(null, tablePos.getX(), tablePos.getY(), tablePos.getZ(), 'minecraft:entity.generic.eat', mob.getSoundSource(), 1, 1)
                    persistentData.putInt('waitingTimer', level.time + 20)
                } else {
                    level.playSound(null, tablePos.getX(), tablePos.getY(), tablePos.getZ(), 'minecraft:entity.player.burp', mob.getSoundSource(), 1, 1)
                    level.spawnParticles($ParticleTypes.HEART, true, tablePos.getX(), tablePos.getY(), tablePos.getZ(), 0.5, 0.5, 0.5, 20, 0.1)
                    persistentData.remove('isEating')
                    persistentData.remove('targetDish')
                    mob.setMainHandItem(Item.empty)
                    persistentData.putInt('waitingTimer', level.time + 20 * 2)
                }
            } else if (persistentData.contains('targetDish')) {
                let targetDish = Item.of(persistentData.getString('targetDish'))
                if (onTableBlock.id == targetDish.id || (onTableBlock.item && onTableBlock.item.id == targetDish.id)) {
                    if (persistentData.getBoolean('findDish')) {
                        persistentData.remove('findDish')
                        level.removeBlock(onTablePos, false)
                        persistentData.putInt('isEating', level.time + 20 * 10)
                        mob.setMainHandItem(targetDish)
                    } else {
                        persistentData.putBoolean('findDish', true)
                        persistentData.putInt('waitingTimer', level.time + 20 * 5)
                    }
                } else if (onTableBlock.entity && onTableBlock.entity instanceof $TilePlacedItems) {
                    let plonkItemTile = onTableBlock.entity
                    for (let i = 0; i < plonkItemTile.allItems.size(); i++) {
                        let curItem = plonkItemTile.getItem(i)
                        if (curItem.item.id == targetDish.id) {
                            if (persistentData.getBoolean('findDish')) {
                                persistentData.remove('findDish')
                                plonkItemTile.removeItem(i, 1)
                                persistentData.putInt('isEating', level.time + 20 * 10)
                                mob.setMainHandItem(targetDish)
                            } else {
                                persistentData.putBoolean('findDish', true)
                                persistentData.putInt('waitingTimer', level.time + 20 * 5)
                            }
                            break
                        }
                    }
                }
            }
        },
    )
}

function GetGulaChallengeTargetDish(round) {
    switch (round) {
        case 0:
            return RandomGet(['minecraft:cake', 'bakery:strawberry_cake', 'bakery:sweetberry_cake', 'bakery:chocolate_cake', 'bakery:chocolate_gateau', 'bakery:bundt_cake', 'bakery:linzer_tart', 'bakery:apple_pie', 'bakery:glowberry_tart', 'bakery:chocolate_tart', 'bakery:pudding', 'create:blaze_cake', 'bakery:pudding_slice', 'bakery:chocolate_tart_slice', 'bakery:glowberry_pie_slice', 'bakery:cornet', 'bakery:jam_roll', 'bakery:apple_cupcake', 'bakery:misslilitu_biscuit', 'bakery:waffle', 'bakery:chocolate_truffle', 'bakery:sweetberry_cupcake', 'bakery:apple_pie_slice', 'minecraft:cookie', 'bakery:strawberry_cake_slice', 'minecraft:honey_bottle', 'supplementaries:candy', 'bakery:chocolate_cake_slice', 'bakery:sweetberry_cake_slice', 'bakery:chocolate_gateau_slice', 'bakery:bundt_cake_slice', 'bakery:linzer_tart_slice', 'bakery:strawberry_cupcake', 'bakery:chocolate_glazed_cookie', 'bakery:sweetberry_glazed_cookie', 'bakery:strawberry_glazed_cookie'])
        case 1:
            return RandomGet(['brewery:beer_wheat', 'brewery:beer_hops', 'brewery:beer_nettle', 'brewery:beer_oat', 'brewery:beer_haley', 'brewery:whiskey_jojannik', 'brewery:whiskey_lilitusinglemalt', 'brewery:whiskey_cristelwalker', 'brewery:beer_barley', 'brewery:whiskey_maggoallan', 'brewery:whiskey_ak', 'brewery:whiskey_carrasconlabel', 'brewery:whiskey_smokey_reverie', 'brewery:whiskey_highland_hearth', 'brewery:whiskey_jamesons_malt', 'vinery:jo_special_mixture', 'vinery:eiswein', 'vinery:glowing_wine', 'vinery:apple_wine', 'vinery:red_wine', 'vinery:apple_cider', 'vinery:solaris_wine', 'vinery:mellohi_wine', 'vinery:mead', 'vinery:chorus_wine', 'vinery:villagers_fright', 'vinery:cherry_wine', 'vinery:chenet_wine', 'vinery:clark_wine', 'vinery:magnetic_wine', 'vinery:stal_wine', 'vinery:jellie_wine', 'vinery:bottle_mojang_noir', 'vinery:noir_wine', 'vinery:strad_wine', 'vinery:bolvar_wine', 'vinery:aegis_wine', 'vinery:cristel_wine', 'vinery:creepers_crush', 'vinery:kelp_cider', 'vinery:lilitu_wine', 'farm_and_charm:strawberry_tea_cup', 'farm_and_charm:ribwort_tea', 'create:builders_tea', 'farm_and_charm:nettle_tea_cup', 'farm_and_charm:ribwort_tea_cup', 'farm_and_charm:nettle_tea', 'farm_and_charm:strawberry_tea', 'kaleidoscope_cookery:barley_tea', 'kaleidoscope_cookery:tieguanyin', 'kaleidoscope_cookery:biluochun', 'kaleidoscope_cookery:oolong', 'kaleidoscope_cookery:sakura_fubuki', 'kaleidoscope_cookery:flower_tea'])
        case 2:
            return RandomGet(['kaleidoscope_cookery:yakitori', 'candlelight:roastbeef_with_glazed_carrots', 'kaleidoscope_cookery:fried_caterpillar', 'kaleidoscope_cookery:cold_roasted_meat', 'kaleidoscope_cookery:spicy_chicken', 'kaleidoscope_cookery:blaze_lamb_chop', 'kaleidoscope_cookery:desert_style_sashimi', 'brewery:half_chicken', 'kaleidoscope_cookery:fish_flavored_shredded_pork', 'candlelight:roasted_lamb_with_lettuce', 'kaleidoscope_cookery:spicy_rabbit_head', 'kaleidoscope_cookery:spicy_blood_stew', 'brewery:fried_chicken', 'kaleidoscope_cookery:stir_fried_pork_with_peppers', 'kaleidoscope_cookery:dongpo_pork', 'kaleidoscope_cookery:numbing_spicy_chicken', 'kaleidoscope_cookery:braised_beef', 'kaleidoscope_cookery:frost_lamb_chop', 'candlelight:fillet_steak', 'candlelight:salmon_on_white_wine', 'kaleidoscope_cookery:nether_style_sashimi', 'kaleidoscope_cookery:tundra_style_sashimi', 'kaleidoscope_cookery:oil_splashed_fish', 'kaleidoscope_cookery:crystal_lamb_chop', 'kaleidoscope_cookery:pan_seared_knight_steak', 'kaleidoscope_cookery:cold_style_sashimi', 'kaleidoscope_cookery:end_style_sashimi', 'kaleidoscope_cookery:sweet_and_sour_ender_pearls', 'kaleidoscope_cookery:braised_fish', 'kaleidoscope_cookery:fondant_spider_eye', 'kaleidoscope_cookery:stir_fried_beef_offal', 'candlelight:tropical_fish_supreme', 'candlelight:pork_ribs', 'kaleidoscope_cookery:braised_beef_with_potatoes', 'kaleidoscope_cookery:sweet_and_sour_pork', 'candlelight:beef_with_mushroom_in_wine_and_potatoes', 'brewery:pork_knuckle', 'candlelight:chicken_teriyaki', 'candlelight:beef_wellington', 'candlelight:bolognese', 'kaleidoscope_cookery:stargazy_pie', 'candlelight:beef_tartare', 'brewery:sausage', 'candlelight:chicken_with_vegetables', 'kaleidoscope_cookery:braised_pork_ribs'])
        case 3:
            return RandomGet(['brewery:mashed_potatoes', 'brewery:potato_salad', 'candlelight:tomato_mozzarella_salad', 'candlelight:harvest_plate', 'candlelight:fresh_garden_salad', 'kaleidoscope_cookery:country_style_mixed_vegetables', 'kaleidoscope_cookery:slime_ball_meal', 'kaleidoscope_cookery:scramble_egg_with_tomatoes', 'brewery:dumplings', 'kaleidoscope_cookery:chicken_and_mushroom_stew', 'kaleidoscope_cookery:fruit_platter'])
        case 4:
            return RandomGet(['kaleidoscope_cookery:seafood_miso_soup', 'farm_and_charm:onion_soup', 'farm_and_charm:goulash', 'candlelight:mushroom_soup', 'kaleidoscope_cookery:donkey_soup', 'kaleidoscope_cookery:dough_drop_soup', 'kaleidoscope_cookery:four_joy_meatball_soup', 'kaleidoscope_cookery:tomato_beef_brisket_soup', 'kaleidoscope_cookery:beef_meatball_soup', 'kaleidoscope_cookery:red_mushroom_pot_soup', 'kaleidoscope_cookery:crimson_fungus_pot_soup', 'minecraft:beetroot_soup', 'farm_and_charm:barley_soup', 'candlelight:tomato_soup', 'kaleidoscope_cookery:pork_bone_soup', 'kaleidoscope_cookery:wild_mushroom_rabbit_soup', 'kaleidoscope_cookery:pufferfish_soup', 'kaleidoscope_cookery:brown_mushroom_pot_soup', 'kaleidoscope_cookery:warped_fungus_pot_soup', 'farm_and_charm:simple_tomato_soup', 'kaleidoscope_cookery:borscht', 'kaleidoscope_cookery:buddha_jumps_over_the_wall', 'kaleidoscope_cookery:fearsome_thick_soup', 'kaleidoscope_cookery:lamb_and_radish_soup'])
        case 5:
            return RandomGet(['candlelight:chicken_alfredo', 'candlelight:lasagne', 'bakery:sandwich', 'bakery:vegetable_sandwich', 'bakery:grilled_bacon_sandwich', 'bakery:grilled_salmon_sandwich', 'kaleidoscope_cookery:delicious_egg_fried_rice', 'kaleidoscope_cookery:egg_fried_rice', 'kaleidoscope_cookery:dumpling', 'kaleidoscope_cookery:baozi', 'candlelight:pasta_with_bolognese', 'candlelight:khinkali', 'kaleidoscope_cookery:shengjian_mantou', 'kaleidoscope_cookery:fried_spring_roll', 'kaleidoscope_cookery:samsa', 'kaleidoscope_cookery:stir_fried_beef_offal_rice_bowl', 'candlelight:pasta_with_lettuce', 'kaleidoscope_cookery:scramble_egg_with_tomatoes_rice_bowl', 'kaleidoscope_cookery:cooked_rice', 'kaleidoscope_cookery:sweet_and_sour_pork_rice_bowl', 'kaleidoscope_cookery:braised_beef_rice_bowl', 'kaleidoscope_cookery:braised_fish_rice_bowl', 'candlelight:omelet', 'kaleidoscope_cookery:suspicious_stir_fry_rice_bowl', 'kaleidoscope_cookery:spicy_chicken_rice_bowl', 'kaleidoscope_cookery:stir_fried_pork_with_peppers_rice_bowl', 'kaleidoscope_cookery:meat_pie', 'kaleidoscope_cookery:donkey_burger', 'kaleidoscope_cookery:fish_flavored_shredded_pork_rice_bowl'])
        case 6:
            return RandomGet(['kubejs:human_meat_sausage', 'kubejs:crispy_bone_human_meat_sausage'])
        default:
            return Item.of('minecraft:cooked_beef')
    }
}