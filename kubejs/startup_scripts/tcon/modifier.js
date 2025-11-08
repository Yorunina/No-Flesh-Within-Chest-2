// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('boold_repair', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isSelected) return
            if (entity.age % 20 != 0) return
            if (itemStack.getDamageValue() <= 0) return
            let repairedValue = lvl * 3
            if (entity.getHealth() <= 1) return
            entity.attack(level.damageSources().magic(), 1)
            itemStack.setDamageValue(Math.max(itemStack.getDamageValue() - repairedValue, 0))
        })
    })

    event.createNew('hunger_repair', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isSelected) return
            if (!entity instanceof $ServerPlayer) return
            if (entity.age % 20 != 0) return
            if (itemStack.getDamageValue() <= 0) return
            let repairedValue = lvl * 3
            if (entity.foodData.getFoodLevel() <= 1) return
            entity.foodData.addExhaustion(2)
            itemStack.setDamageValue(Math.max(itemStack.getDamageValue() - repairedValue, 0))
        })
    })

    // 盾牌猛击 在身着此类护甲时，如果使用了盾牌进行防御，那么敌人将会受到等同于护甲的伤害，但你的护甲会受到等同于原本伤害的耐久损伤
    // 对于格挡事件，只要有一个return true，后续方法就不会接着执行，因此这个效果仅会对第一个生效的护甲生效
    event.createNew('shield_slam', builder => {
        builder.canBlockAttacked((toolView, lvl, context, slotType, source, amount) => {
            if (!source.actual || !source.actual.isAlive()) return false
            const entity = context.entity
            if (!entity.isBlocking()) return false
            const level = context.level
            let damageAmount = entity.getArmorValue() * lvl * 0.5
            source.actual.attack(level.damageSources().mobAttack(entity), damageAmount)
            TinkerDamageHelper.damageAnimated(toolView, amount, entity, slotType)
            return true
        })
    })

    // // 心室震颤；在造成伤害时，对对方的健康造成轻微损伤，允许突破到0以下
    // event.createNew('ventricular_fibrillation', builder => {
    //     builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
    //         const target = context.target
    //         const chestCavity = target.chestCavityInstance
    //         if (!target.isAlive() || !chestCavity) return
    //         chestCavity.setOrganScore('chestcavity:health', chestCavity.getOrganScore('chestcavity:health') - 0.01 * lvl)
    //     })
    // })

    // 标记目标；在造成暴击伤害时，对目标施加标记效果，持续 5 * 等级 秒   
    event.createNew('marking_target', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            /**@type {Internal.LivingEntity} */
            const target = context.target
            if (context.isCritical() && target && target.isAlive()) {
                target.potionEffects.add('kubejs:marked', 20 * 5 * lvl, 0, false, false)
            }
        })
    })

    // 薄葬
    // event.createNew('shallow_grave', builder => {
    //     builder.projectileHitBlock((toolView, data, lvl, projectile, hitResult, entity) => {
    //         entity.potionEffects.add('potioncore:revival', 20 * 3 * lvl)
    //     })
    // })


    // 胸腔活化
    event.createNew('active_chestcavity', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            /**@type {Internal.LivingEntity} */
            const target = context.target
            const chestCavity = target.chestCavityInstance
            if (!chestCavity.opened) {
                ChestCavityUtils.openChestCavity(chestCavity)
            }
        })
    })

    event.createNew('freezing', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            /**@type {Internal.PathfinderMob} */
            const target = context.target
            let forzenTicks = target.getTicksFrozen()
            target.setTicksFrozen(forzenTicks + 20 * lvl)
        })
    })

    event.createNew('burning', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            /**@type {Internal.PathfinderMob} */
            const target = context.target
            let fireTicks = target.getRemainingFireTicks()
            target.setRemainingFireTicks(fireTicks + 20 * lvl)
        })
    })

    event.createNew('frostbite', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const source = context.getAttacker()
            /**@type {Internal.PathfinderMob} */
            const target = context.target
            let forzenTicks = target.getTicksFrozen()
            if (forzenTicks > 0) {
                let attackDamage = source.getAttributeValue('minecraft:generic.attack_damage')
                amount = amount + forzenTicks / 100 * lvl * attackDamage
            }
        })
    })

    event.createNew('burning_burst', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            /**@type {Internal.PathfinderMob} */
            const target = context.target
            if (target.isOnFire()) {
                let fireTicks = target.getRemainingFireTicks()
                target.setRemainingFireTicks(0)
                amount = amount + fireTicks / 10 * lvl
            }
        })
    })

    // 盾牌防护：当盾牌受到攻击时，概率会恢复耐久
    event.createNew('shield_protection', builder => {
        builder.canBlockAttacked((toolView, lvl, context, slotType, source, amount) => {
            const entity = context.entity
            if (!entity.isBlocking()) return false
            TinkerDamageHelper.repair(toolView, lvl)
            return true
        })
    })

    event.createNew('flame_defense', builder => {
        builder.armorTakeAttacked((toolView, lvl, context, slotType, source, amount) => {
            const sourceEntity = source.actual
            if (!sourceEntity && sourceEntity.isAlive()) return
            sourceEntity.setRemainingFireTicks(sourceEntity.getRemainingFireTicks() + 20 * lvl)
            return true
        })
    })

    event.createNew('breath_of_wthering', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const target = context.target
            if (target && target.isAlive()) {
                target.potionEffects.add('minecraft:wither', 20 * 5 * lvl, lvl, false, false)
            }
        })
    })
    event.createNew('blazing_brand', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const target = context.target
            if (target && target.isAlive()) {
                target.potionEffects.add('cataclysm:blazing_brand', 20 * 5 * lvl, lvl, false, false)
            }
        })
    })
    //bone_fragments
    // event.createNew('bone_spurs', builder => {
    //     builder.armorTakeAttacked((toolView, lvl, context, slotType, source, amount) => {
    //         if (!source.actual || !source.actual.isAlive()) return false
    //         const entity = context.entity
    //         const level = context.level
    //         let damageAmount = entity.getArmorValue() * lvl * 0.5
    //         entity.attack(level.damageSources().magic(), 1)
    //         source.actual.attack(level.damageSources().mobAttack(entity), damageAmount)
    //         TinkerDamageHelper.damageAnimated(toolView, amount, entity, slotType)
    //         return true
    //     })
    // })
    event.createNew('abyssal_burn', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const target = context.target
            if (target && target.isAlive()) {
                target.potionEffects.add('cataclysm:abyssal_burn', 20 * 5 * lvl, lvl, false, false)
            }
        })
    })

    event.createNew('curse_of_desert', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const target = context.target
            if (target && target.isAlive()) {
                target.potionEffects.add('cataclysm:curse_of_desert', 20 * 5 * lvl, lvl, false, false)
            }
        })
    })


    event.createNew('nausea_cure', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isSelected) return
            entity.potionEffects.add('minecraft:regeneration', 20 * lvl, lvl, false, false)
            if (Math.random() < 0.1) {
                entity.potionEffects.add('minecraft:nausea', 20 * lvl, lvl, false, false)
            }
        })
    })
    event.createNew('wetness', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const target = context.target
            if (target && target.isAlive()) {
                target.potionEffects.add('cataclysm:wetness', 20 * 5 * lvl, lvl, false, false)
            }
        })
    })
    event.createNew('stun', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const target = context.target
            if (target && target.isAlive()) {
                target.potionEffects.add('cataclysm:stun', 20 * lvl, lvl, false, false)
            }
        })
    })

    event.createNew('thunder_caller', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isSelected) return
            if (entity.age % 200 != 0) return
            if (Math.random() > 0.02 * lvl) return
            let entityPos = entity.blockPosition()
            if (level.isOverworld() && level.canSeeSky(entityPos)) {
                entity.block.spawnLightning()
            }
        })
    })
    event.createNew('bio_lumens', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isSelected) return
            entity.potionEffects.add('cataclysm:blessing_of_amethyst', 20 * lvl, lvl, false, false)
        })
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const target = context.target
            if (target && target.isAlive()) {
                target.potionEffects.add('minecraft:glowing', 20 * lvl, lvl, false, false)
            }
        })
    })
    event.createNew('disorganization', builder => {
        builder.onAfterMeleeHit((toolView, lvl, context, amount) => {
            const target = context.target
            if (target && target.isAlive()) {
                target.potionEffects.add('potioncore:disorganization', 20 * lvl, lvl, false, false)
            }
        })
    })
    event.createNew('purity', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isCorrectSlot) return
            let hasArmor = false
            try {
                hasArmor = entity.getChestArmorItem() && !entity.getChestArmorItem().isEmpty() ||
                    entity.getLegsArmorItem() && !entity.getLegsArmorItem().isEmpty() ||
                    entity.getFeetArmorItem() && !entity.getFeetArmorItem().isEmpty() ||
                    entity.getHeadArmorItem() && !entity.getHeadArmorItem().isEmpty()
            } catch (e) {
                // 如果获取盔甲失败，跳过检查
                hasArmor = true
            }
            if (!hasArmor) return
            if (entity.age % 20 !== 0) return
            entity.potionEffects.add('potioncore:purity', 20 * 5 * lvl, lvl, false, false)

        })
    })
    event.createNew('antidote', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isCorrectSlot) return
            let hasArmor = false
            try {
                hasArmor = entity.getChestArmorItem() && !entity.getChestArmorItem().isEmpty() ||
                    entity.getLegsArmorItem() && !entity.getLegsArmorItem().isEmpty() ||
                    entity.getFeetArmorItem() && !entity.getFeetArmorItem().isEmpty() ||
                    entity.getHeadArmorItem() && !entity.getHeadArmorItem().isEmpty()
            } catch (e) {
                hasArmor = true
            }
            if (!hasArmor) return
            if (entity.age % 20 !== 0) return
            entity.potionEffects.add('potioncore:antidote', 20 * 5 * lvl, lvl, false, false)

        })
    })
    event.createNew('mana_regen', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isSelected) return
            entity.potionEffects.add('ars_nouveau:mana_regen', 20 * lvl, lvl, false, false)
        })
    })
    event.createNew('spell_damage', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelecte, isCorrectSlot, itemStack) => {
            if (!isSelecte) return
            entity.potionEffects.add('ars_nouveau:spell_damage', 20 * lvl, lvl, false, false)
        })
    })
    event.createNew('pintcharisma', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelecte, isCorrectSlot, itemStack) => {
            if (!isSelecte) return
            entity.potionEffects.add('brewery:pintcharisma', 20 * lvl, lvl, false, false)
        })
    })
    event.createNew('zombie_spawner', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isSelected) return
            if (entity.age % 200 != 0) return
            if (Math.random() > 0.02 * lvl) return
            let entityPos = entity.blockPosition()
            if (level.isOverworld()) {
                let zombie = level.createEntity('minecraft:zombie')
                zombie.setPos(entityPos.x, entityPos.y, entityPos.z)
                level.addFreshEntity(zombie)
            }
        })
    })
    event.createNew('hormone_secretion', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!(entity instanceof $ServerPlayer)) return;
            if (entity.age % 20 !== 0) return; // 每秒检查一次

            // 统计穿戴的装备数量（必须带有 kubejs:armor_buff_set）
            let armorCount = 0;
            const armorSlots = ['head', 'chest', 'legs', 'feet'];
            armorSlots.forEach(slot => {
                const item = entity.getItemBySlot(slot);
                if (item.getId() !== 'minecraft:air' && item.nbt && item.nbt.tic_modifiers) {
                    if (item.nbt.tic_modifiers.some(mod => mod.name === 'kubejs:armor_buff_set')) {
                        armorCount++;
                    }
                }
            });

            // 根据装备数量给予不同的增益效果
            if (armorCount >= 1) {
                entity.potionEffects.add('brewery:snowwhite', 40, 0, false, false);
            }
            if (armorCount >= 2) {
                entity.potionEffects.add('potioncore:love', 40, 0, false, false);
            }
            if (armorCount >= 3) {
                entity.potionEffects.add('brewery:renewingtouch', 40, 0, false, false);
            }
            if (armorCount >= 4) {
                entity.potionEffects.add('brewery:healingtouch', 40, 0, false, false);
            }
        });
    });
    event.createNew('mob_marrow', builder => {
        builder.onInventoryTick((toolView, lvl, level, entity, index, isSelected, isCorrectSlot, itemStack) => {
            if (!isSelected) return
            entity.potionEffects.add('tconstruct:calcified', 20 * lvl, lvl, false, false)
        })
    })
})