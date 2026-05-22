// priority: 500
const SponsorGiftCodeMap = new Map()
MAAEvents.textInputTaskSubmit('sponsor_gift_code', (event) => {
    const inputText = String(event.inputText.trim())
    const teamData = event.teamData
    const task = event.task
    if (SponsorGiftCodeMap.has(inputText)) {
        let reward = SponsorGiftCodeMap.get(inputText)
        reward(event)
        // teamData.addProgress(task, 1)
    }
})

/**
 * @param {string} code 
 * @param {function(Internal.TextInputTaskSubmitJS)} reward 
 */
function RegisterSponsorGiftCode(code, reward) {
    SponsorGiftCodeMap.set(code, reward)
}

RegisterSponsorGiftCode('脆2最好玩', (event) => event.player.give(Item.of('minecraft:enchanted_book').enchant('minecraft:mending', 1)))
RegisterSponsorGiftCode('印度飞天牛子侠', (event) => {
    const player = event.player
    player.give(Item.of('ars_nouveau:ritual_scrying', 64, "{display:{Name:'{\"text\":\"！！让我康康！！\"}'}}"))
    player.give(GetPlayerHeadItem('dignz__'))
})
RegisterSponsorGiftCode('通识者', (event) => {
    const player = event.player
    player.give(Item.of('create:wrench', "{display:{Name:'{\"text\":\"启蒙\"}'}}"))
    player.give(Item.of('minecraft:writable_book', "{display:{Name:'{\"text\":\"罗塞尔日记\"}'}}"))
    player.give(GetPlayerHeadItem('_baize'))
})
RegisterSponsorGiftCode('神兵天降', (event) => {
    const player = event.player
    const level = player.level
    for (let i = 0; i < 10; i++) {
        /**@type {Internal.Warden} */
        let warden = level.createEntity('minecraft:warden')
        warden.setPos(player.position())
        warden.finalizeSpawn(level, level.getCurrentDifficultyAt(warden.getOnPos()), 'mob_summoned', null, null)
        level.addFreshEntity(warden)
    }
})
RegisterSponsorGiftCode('awa', (event) => {
    const player = event.player
    player.tell('一起来放烟花吧')
    player.give(Item.of('minecraft:firework_rocket', 64, '{Fireworks:{Flight:3b}}'))
    player.give(GetPlayerHeadItem('ting_ling'))
})
RegisterSponsorGiftCode('苹果乐', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:apple', 1224))
    player.give(GetPlayerHeadItem('Exusiai_i'))
})
RegisterSponsorGiftCode('千夜寒怎么做', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:wooden_sword', "{Damage:0,display:{Name:'{\"text\":\"九头蛇毒牙 千夜寒刃\"}'}}").enchant('minecraft:sweeping', 5))
    player.give(Item.of('minecraft:iron_ingot', 4, "{display:{Name:'{\"text\":\"龙霜钢\"}'}}").enchant('minecraft:vanishing_curse', 1))
    player.give(GetPlayerHeadItem('hoshiyukii'))
})
RegisterSponsorGiftCode('小黑子油饼食不食', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:pumpkin_pie', "{RepairCost:0,display:{Name:'{\"text\":\"油饼\"}'}}"))
    player.give(GetPlayerHeadItem('gugugugu114514'))
})
RegisterSponsorGiftCode('放手去做吧', (event) => {
    const player = event.player
    player.give(Item.of('ars_nouveau:archmage_spell_book', "{display:{Name:'{\"text\":\"以太相位引擎\"}'}}"))
    player.give(GetPlayerHeadItem('_Xingyan'))
})
RegisterSponsorGiftCode('按住"W"开始思索', (event) => {
    const player = event.player
    player.give(Item.of('create:goggles'))
    player.give(Item.of('create:wrench'))
    player.give(GetPlayerHeadItem('juelanni'))
})
RegisterSponsorGiftCode('！？猪猪？！', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:porkchop'))
    player.give(GetPlayerHeadItem('Hydroxice24'))
})
RegisterSponsorGiftCode('7999', (event) => {
    const player = event.player
    player.give(Item.of('vinery:kelp_cider', 5, '{EffectAmplifier:0,EffectDuration:1800,Year:0}'))
    player.give(GetPlayerHeadItem('2142131'))
})
RegisterSponsorGiftCode('村里最好的剑', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:wooden_sword', '{Unbreakable:1b}'))
})
RegisterSponsorGiftCode('饿啊', (event) => {
    const player = event.player
    player.give(Item.of('kaleidoscope_cookery:cooked_lamb_chops', 32))
    player.give(Item.of('minecraft:sticky_piston'))
    player.give(Item.of('minecraft:end_rod'))
    player.give(GetPlayerHeadItem('TheXiwangzhiyu'))
})
RegisterSponsorGiftCode('在启动了', (event) => {
    const player = event.player
    player.give(Item.of('create:rotation_speed_controller', 3))
    player.give(GetPlayerHeadItem('erji111'))
})
RegisterSponsorGiftCode('早上好！骑士', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:slime_ball', '{ArmourersWorkshop:{Identifier:"secret/sponsor/barrier",SkinType:"armourers:item"},AttributeModifiers:[{Amount:10,AttributeName:"generic.armor",Name:"1779377627684",Slot:"mainhand",UUID:[I;-126421,47228,233218,-94456]},{Amount:10,AttributeName:"generic.armor",Name:"1779377627684",Slot:"offhand",UUID:[I;-126421,47528,233218,-95056]},{Amount:1,AttributeName:"generic.knockback_resistance",Name:"1779377627684",Slot:"mainhand",UUID:[I;-126421,47828,233218,-95656]},{Amount:1,AttributeName:"generic.knockback_resistance",Name:"1779377627684",Slot:"offhand",UUID:[I;-126421,48128,233218,-96256]}],HideFlags:2,display:{Lore:[\'[{"text":"Good morning! Rider!","italic":false,"color":"#4bb77c"}]\'],Name:\'[{"text":"Barrier","italic":false,"color":"#4bb77c"}]\'}}'))
    player.give(GetPlayerHeadItem('sjsxh125'))
})
RegisterSponsorGiftCode('偷盗者', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:totem_of_undying'))
})
RegisterSponsorGiftCode('启程前的盘缠', (event) => {
    const player = event.player
    player.give(Item.of('sophisticatedbackpacks:gold_backpack'))
    player.give(Item.of('minecraft:iron_pickaxe', '{Damage:0}').enchant('minecraft:mending', 1).enchant('minecraft:fortune', 3))
    player.give(Item.of('kaleidoscope_cookery:pot'))
    player.give(GetPlayerHeadItem('X_Shadow_shark_X'))
})
RegisterSponsorGiftCode('是脆2啊', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:enchanted_book').enchant('minecraft:mending', 1))
})
RegisterSponsorGiftCode('勤劳又勇敢的xlpj', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:bow', "{Damage:0,Unbreakable:1b,display:{Name:'{\"text\":\"冰原秩序\"}'}}").enchant('minecraft:power', 7).enchant('minecraft:punch', 9).enchant('minecraft:flame', 9))
    player.give(GetPlayerHeadItem('Mort1sR'))
})
LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.FISHING)
        .apply(ctx => {
            let tool = ctx.getTool()
            if (!tool.hasNBT()) return
            if (tool.nbt.getBoolean('onlyPufferfish')) {
                ctx.loot.clear()
                ctx.loot.add(Item.of('minecraft:pufferfish'))
            }
            return
        })
})
RegisterSponsorGiftCode('喵凸条', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:fishing_rod', "{onlyPufferfish:1b,Damage:0,display:{Name:'{\"text\":\"喵的摸鱼杆\"}'}}"))
    player.give(GetPlayerHeadItem('Meow_Deal'))
})
RegisterSponsorGiftCode('知识的力量', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:book', '{AttributeModifiers:[{Amount:33,AttributeName:"generic.attack_damage",Name:"1778950941255",Slot:"mainhand",UUID:[I;-126417,35685,1017,-71370]},{Amount:3,AttributeName:"generic.attack_speed",Name:"1778950941255",Slot:"mainhand",UUID:[I;-126417,35985,1017,-71970]}]}'))
    player.give(GetPlayerHeadItem('Flyhuhuhu'))
})
RegisterSponsorGiftCode('猫冬', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:ender_pearl', 16))
    player.give(GetPlayerHeadItem('Acxving'))
})

RegisterSponsorGiftCode('X X XXX', (event) => {
    const player = event.player
    player.give(Item.of('tetra:pristine_amethyst', `{display:{Lore:['{"text":"神曲，我懂得欣赏","color":"gold","bold":true}','{"text":"点击欣赏神曲","color":"yellow","italic":true,"underlined":true,"clickEvent":{"action":"open_url","value":"https://www.bilibili.com/video/BV1fEy8BoEbj"}}'],Name:'[{"text":"O O OOO","color":"red"}]'}}`))
    player.give(GetPlayerHeadItem('mrqx0195'))
})
RegisterSponsorGiftCode('我老想吃蛋糕了', (event) => {
    const player = event.player
    player.give(Item.of('create:blaze_cake', 6, `{display:{Lore:['{"text":"饼子好劲道足，吃完直接冒火","color":"gray"}']}}`))
    player.give(GetPlayerHeadItem('ayuoooo'))
})
RegisterSponsorGiftCode('CANDY CANDY COOKIE！', (event) => {
    const player = event.player
    player.give(Item.of('supplementaries:candy', 16, `{display:{Name:'{\"text\":\"随机糖果\"}',Lore:['{"text":"俺不知道脆2有什么糖果QAQ","color":"gray"}']}}`))
    player.give(GetPlayerHeadItem('Tallorann'))
})
RegisterSponsorGiftCode('mL', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:poppy', 8))
    player.give(Item.of('minecraft:water_bucket', 2))
    player.give(Item.of('minecraft:diamond'))
    player.give(GetPlayerHeadItem('mLdongzy'))
})
RegisterSponsorGiftCode('这是什么机霸', (event) => {
    const player = event.player
    player.give(Item.of('create:andesite_alloy', 64))
    player.give(GetPlayerHeadItem('zymmyl'))
})
RegisterSponsorGiftCode('万物寂灭', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:warden_spawn_egg'))
    player.give(Item.of('kubejs:warden_core'))
    player.give(GetPlayerHeadItem('JiuYuXuan'))
})
RegisterSponsorGiftCode('爱上雷神', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:purple_wool'))
    player.give(Item.of('minecraft:yellow_wool'))
    player.tell('baby我就去爱上雷神')
    player.give(GetPlayerHeadItem('qiyue12'))
})
RegisterSponsorGiftCode('loafcraft', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:bread', 1024))
    player.give(GetPlayerHeadItem('xiaodu121'))
})
RegisterSponsorGiftCode('河意味', (event) => {
    const player = event.player
    player.give(Item.of('create:water_wheel', 64))
    player.give(GetPlayerHeadItem('Kn1feHeart'))
})
RegisterSponsorGiftCode('奴役蜜蜂', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:bee_spawn_egg', `{display:{Name:'{\"text\":\"歌莉娅幼年体\"}',Lore:['{"text":"一只可怜的蜂后被迫成为了瘟疫的载体这简直是对...后面忘了","color":"gray"}']}}`))
    player.give(GetPlayerHeadItem('ThePangbai'))
})
RegisterSponsorGiftCode('洗洗更健康', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:poisonous_potato'))
    player.give(GetPlayerHeadItem('Mnibr'))
})
RegisterSponsorGiftCode('来玩arcriders喵', (event) => {
    const player = event.player
    player.give(Item.of('biomancy:flesh_blob_spawn_egg'))
    player.give(GetPlayerHeadItem('jj21cm'))
})
RegisterSponsorGiftCode('合成天下', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:enchanted_golden_apple', "{display:{Name:'{\"text\":\"精品大果\"}'}}"))
    player.give(GetPlayerHeadItem('FengQi_Qi'))
})
RegisterSponsorGiftCode('我是婴儿', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:end_rod', 91))
    player.give(Item.of('minecraft:gold_ingot', 91))
    player.give(Item.of('minecraft:oak_leaves', 91))
    player.give(GetPlayerHeadItem('Yingxiaolu_Lian'))
})
RegisterSponsorGiftCode('召唤一台锅炉？', (event) => {
    const player = event.player
    player.give(Item.of('create:blaze_burner', 9))
    player.give(Item.of('create:steam_engine', 9))
    player.give(Item.of('create:fluid_tank', 36))
    player.give(Item.of('supplementaries:faucet', 4))
    player.give(Item.of('create:fluid_pipe', 9))
    player.give(GetPlayerHeadItem('situ174823'))
})
RegisterSponsorGiftCode('oiiaioiiiiai', (event) => {
    const player = event.player
    player.give(Item.of('create:cardboard_sword', "{display:{Lore:['[{\"text\":\"oiiaioiiiiai\",\"italic\":false,\"color\":\"aqua\"}]'],Name:'[{\"text\":\"逗\",\"italic\":false,\"color\":\"dark_red\"},{\"text\":\"猫\",\"italic\":false,\"color\":\"gold\"},{\"text\":\"棒\",\"italic\":false,\"color\":\"yellow\"},{\"text\":\"—\",\"italic\":false,\"color\":\"green\"},{\"text\":\"—\",\"italic\":false,\"color\":\"dark_blue\"},{\"text\":\"—\",\"italic\":false,\"color\":\"dark_purple\"}]'}}").enchant('knockback', 10))
    player.give(Item.of('minecraft:cat_spawn_egg'))
    player.give(GetPlayerHeadItem('nuoleihe'))
})
RegisterSponsorGiftCode('2778', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:diamond', "{display:{Name:'{\"text\":\"非洲之星\"}'}}"))
    player.give(Item.of('minecraft:heart_of_the_sea', "{display:{Name:'{\"text\":\"海洋之泪\"}'}}"))
    player.give(Item.of('minecraft:egg', 6, "{display:{Name:'{\"text\":\"六级弹\"}'}}"))
})
RegisterSponsorGiftCode('挖掘工的梦想', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:golden_pickaxe', '{Unbreakable:1b}'))
    player.give(GetPlayerHeadItem('Sumdre'))
})
RegisterSponsorGiftCode('大胃王世界第一强', (event) => {
    const player = event.player
    player.give(Item.of('kaleidoscope_cookery:warped_fungus_pot_soup'))
    player.give(Item.of('kaleidoscope_cookery:crimson_fungus_pot_soup'))
    player.give(Item.of('kaleidoscope_cookery:red_mushroom_pot_soup'))
    player.give(GetPlayerHeadItem('loghoc'))
})
RegisterSponsorGiftCode('我去，还有大肘子', (event) => {
    const player = event.player
    player.give(Item.of('create:brass_block', 9))
    player.give(GetPlayerHeadItem('ich_sage_es'))
})
RegisterSponsorGiftCode('锻造锤puls！', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:nether_star'))
    player.give(GetPlayerHeadItem('ainigejiba'))
})
RegisterSponsorGiftCode('我去，不早说！', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:diamond', 3))
    player.give(Item.of('minecraft:iron_ingot', 3))
    player.give(Item.of('minecraft:gold_ingot', 3))
    player.give(Item.of('minecraft:netherite_ingot', 3))
    player.give(GetPlayerHeadItem('MengXlng'))
})
RegisterSponsorGiftCode('脆骨症启动', (event) => {
    const player = event.player
    player.give(Item.of('create:creative_blaze_cake', 9))
    player.give(GetPlayerHeadItem('wang9358'))
})
RegisterSponsorGiftCode('325799', (event) => {
    const player = event.player
    player.give(Item.of('dummmmmmy:target_dummy', "{display:{Name:'{\"text\":\"测测你是啥杯\"}'}}"))
    player.give(Item.of('minecraft:end_rod', "{display:{Name:'{\"text\":\"小头\"}'}}").enchant('minecraft:sharpness', 5).enchant('minecraft:unbreaking', 3).enchant('minecraft:knockback', 2))
    player.give(GetPlayerHeadItem('inflatiao'))
})
RegisterSponsorGiftCode('非洲之心！', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:diamond_block'))
    player.give(GetPlayerHeadItem('Talandar111'))
})
RegisterSponsorGiftCode('原神启动', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:apple', 10))
    player.give(GetPlayerHeadItem('A y l wa r k'))
})
RegisterSponsorGiftCode('你想成为魔法少女吗？！', (event) => {
    const player = event.player
    player.give(Item.of('ars_nouveau:archmage_spell_book', "{display:{Name:'{\"text\":\"魔女日记\"}'}}"))
    player.give(Item.of('vinery:noir_wine', "{EffectAmplifier:0,EffectDuration:1800,Year:-100,display:{Name:'{\"text\":\"伊蕾娜特制\"}'}}"))
    player.give(GetPlayerHeadItem('Irenasama1017'))
})
RegisterSponsorGiftCode('我是奶龙', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:frog_spawn_egg', "{display:{Name:'{\"text\":\"奶龙\"}'}}"))
    player.give(GetPlayerHeadItem('ju_zi_2006'))
})
RegisterSponsorGiftCode('心脏要逃走啦！', (event) => {
    const player = event.player
    player.give(Item.of('chestcavity:surgical_box', '{Inventory:[],InventoryType:"kubejs:cc_inventory_types/player_17",Size:17}'))
    player.give(Item.of('kubejs:sweet_heart', "{display:{Name:'{\"text\":\"泷奈の心\"}'}}"))
    player.give(GetPlayerHeadItem('rainstorm_s'))
})
RegisterSponsorGiftCode('菜板裁定者', (event) => {
    const player = event.player
    player.give(Item.of('kaleidoscope_cookery:netherite_kitchen_knife', "{Damage:0,display:{Name:'{\"text\":\"菜板裁定者\"}'}}"))
    player.give(GetPlayerHeadItem('dadadadaaa'))
})
RegisterSponsorGiftCode('波奇酱', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:shulker_box'))
    player.give(GetPlayerHeadItem('ygy123456789'))
})
RegisterSponsorGiftCode('想你了牢普', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:emerald', "{display:{Name:'{\"text\":\"Ama-10\"}'}}"))
    player.tell('Priestess：先把猫养好吧癫公，别迷那个b小动物了')
})
RegisterSponsorGiftCode('光头', (event) => {
    const player = event.player
    player.give(GetPlayerHeadItem('Kar_aung'))
    player.give(GetPlayerHeadItem('xiao_jian'))
})
RegisterSponsorGiftCode('都是同龄人我原本没想降维打击！', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:cooked_chicken', 64, "{display:{Name:'{\"text\":\"酱味大鸡\"}'}}"))
    player.give(Item.of('minecraft:diamond_sword', "{Damage:0,display:{Name:'{\"text\":\"戍卫\"}'}}").enchant('minecraft:looting', 1))
    player.give(GetPlayerHeadItem('EDG_zmjjkk'))
})
RegisterSponsorGiftCode('我fox最爱玫瑰石英', (event) => {
    const player = event.player
    player.give(Item.of('create:sand_paper', 4, '{Damage:0}'))
    player.give(Item.of('create:precision_mechanism', 4, "{RepairCost:0,display:{Name:'{\"text\":\"coin\"}'}}"))
    player.give(GetPlayerHeadItem('XC__XiaoC'))
})
RegisterSponsorGiftCode('bread', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:bread', 2304))
    player.give(GetPlayerHeadItem('ssma0131'))
})
RegisterSponsorGiftCode('像玉的玻璃', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:glass', 64))
    player.give(GetPlayerHeadItem('shiciyanshang'))
})
RegisterSponsorGiftCode('！？糖糖？！', (event) => {
    const player = event.player
    player.give(Item.of('kubejs:sweets_gland'))
    player.give(GetPlayerHeadItem('TangSongLuoBo'))
})
RegisterSponsorGiftCode('去码头对面搞点薯条', (event) => {
    const player = event.player
    player.give(Item.of('kubejs:koi_fish_scale'))
    player.give(Item.of('minecraft:axolotl_bucket'))
    player.give(Item.of('minecraft:potato', 64))
    player.give(GetPlayerHeadItem('Mist_wood'))
})
RegisterSponsorGiftCode('三军听令', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:iron_sword', "{Unbreakable:1b,display:{Name:'{\"text\":\"仁之剑\"}'}}"))
    player.give(Item.of('minecraft:diamond_sword', "{Unbreakable:1b,display:{Name:'{\"text\":\"义之剑\"}'}}"))
    player.give(GetPlayerHeadItem('Kokomi_ceko'))
})
RegisterSponsorGiftCode('诶，云朵！？', (event) => {
    const player = event.player
    player.teleportRelative(0, 256, 0)
    player.give(GetPlayerHeadItem('Kernel__Pult'))
})
RegisterSponsorGiftCode('终极奉献', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:netherite_hoe', "{Unbreakable:1b,Damage:0,display:{Name:'{\"text\":\"§6麦田守望者\"}'}}").enchant('minecraft:sharpness', 14).enchant('minecraft:unbreaking', 13).enchant('minecraft:efficiency', 12).enchant('minecraft:silk_touch', 11).enchant('minecraft:protection', 10))
    player.give(Item.of('minecraft:wheat_seeds', "{display:{Name:'{\"text\":\"老閣主的饭\"}'}}"))
    player.tell('球球不要丢掉老閣主的饭QAQ')
    player.give(GetPlayerHeadItem('Pigeon_GeZhu'))
})
RegisterSponsorGiftCode('白描的馈赠', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:diamond_pickaxe', '{Damage:0}').enchant('minecraft:mending', 1).enchant('minecraft:fortune', 3))
    player.give(GetPlayerHeadItem('BaiMiao1'))
})
RegisterSponsorGiftCode('sayo-nara', (event) => {
    const player = event.player
    player.give('minecraft:lead')
    let skullItem = GetPlayerHeadItem('G_Mu')
    player.give(skullItem)
    player.give(skullItem.copy().setHoverName('纱世里'))
})
RegisterSponsorGiftCode('橘子大人救救我', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:cooked_porkchop', 64, `{display:{Name:'{\"text\":\"xxsm的肉\"}',Lore:['{"text":"我有超级可爱的女朋友橘子","color":"gray"}']}}`))
    player.give(GetPlayerHeadItem('xxsm199'))
})
RegisterSponsorGiftCode('vivo50', (event) => {
    const player = event.player
    player.give(Item.of('create:rotation_speed_controller', "{display:{Name:'{\"text\":\"麦香鸡块堡\"}'}}"))
    player.give(GetPlayerHeadItem('THE_CHENGTU'))
})
RegisterSponsorGiftCode('Join the helldiver', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:tnt', 64, "{display:{Name:'{\"text\":\"飞鹰500kg炸药\"}'}}"))
    player.give(GetPlayerHeadItem('GodPathfinder'))
})
RegisterSponsorGiftCode('来点龙', (event) => {
    const player = event.player
    player.give(Item.of('kubejs:dragon_blood_heart'))
    player.give(Item.of('minecraft:stick', "{display:{Name:'{\"text\":\"冰火传说\"}'}}").enchant('minecraft:fire_aspect', 5))
    player.give(GetPlayerHeadItem('Tagibana'))
})
RegisterSponsorGiftCode('认知偏差认知偏认知认', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:potion', "{Potion:'potioncore:lightning',display:{Name:'{\"text\":\"§l§e闪电充能球\"}'}}").enchant('minecraft:sharpness', 3))
    player.give(Item.of('minecraft:blue_ice', "{display:{Name:'{\"text\":\"§l§3冰霜充能球\"}'}}").enchant('minecraft:protection', 2))
    player.give(Item.of('minecraft:ender_pearl', "{display:{Name:'{\"text\":\"§l§5黑暗充能球\"}'}}").enchant('minecraft:sharpness', 6))
    player.give(Item.of('minecraft:glass', "{display:{Name:'{\"text\":\"§l§7玻璃充能球\"}'}}").enchant('minecraft:sweeping', 4))
    player.give(GetPlayerHeadItem('YeYu_YanMu'))
})
RegisterSponsorGiftCode('a helping hand', (event) => {
    const player = event.player
    player.give(Item.of('create:extendo_grip', "{display:{Name:'{\"text\":\"好羡慕你能玩脆2\"}'}}"))
})
RegisterSponsorGiftCode('兔子怀表然后是枪火击溃', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:crossbow', '{Charged:0b,ChargedProjectiles:[],Damage:0}').enchant('minecraft:multishot', 1).enchant('minecraft:quick_charge', 5))
    player.give(Item.of('minecraft:clock', "{RepairCost:0,display:{Name:'{\"text\":\"兔子的怀表\"}'}}"))
    player.give(GetPlayerHeadItem('MUFFINHEAD33_1'))
})
RegisterSponsorGiftCode('旅途愉快', (event) => {
    const player = event.player
    player.give(Item.of('cataclysm:altar_of_fire'))
    player.give(GetPlayerHeadItem('Bon_v0yage'))
})
RegisterSponsorGiftCode('2816174', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:crossbow', "{Unbreakable:1b,display:{Name:'{\"text\":\"R99\"}'}}").enchant('minecraft:quick_charge', 5))
    player.give(GetPlayerHeadItem('LC_hc'))
})
RegisterSponsorGiftCode('114514', (event) => {
    const player = event.player
    player.give(Item.of('brewery:whiskey_lilitusinglemalt', `{display:{Name:'{\"text\":\"迎宾酒\"}',Lore:['{"text":"事一顿美味大餐啊（喜），其实事赤石鹤袅罢（悲）。吃完了有奖励，吃不完有惩罚","color":"gray"}']}}`))
    player.give(Item.of('candlelight:pasta_with_bolognese', `{display:{Name:'{\"text\":\"新鲜意面\"}',Lore:['{"text":"事一顿美味大餐啊（喜），其实事赤石鹤袅罢（悲）。吃完了有奖励，吃不完有惩罚","color":"gray"}']}}`))
    player.give(Item.of('bakery:pudding', `{display:{Name:'{\"text\":\"脱出噗叮\"}',Lore:['{"text":"事一顿美味大餐啊（喜），其实事赤石鹤袅罢（悲）。吃完了有奖励，吃不完有惩罚","color":"gray"}']}}`))
    player.give(GetPlayerHeadItem('NeroFes'))
})
RegisterSponsorGiftCode('灾厄殁王', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:totem_of_undying', "{display:{Name:'{\"text\":\"灵魂图腾\"}'}}"))
    player.give(GetPlayerHeadItem('SatoYEMING'))
})
RegisterSponsorGiftCode('维什戴尔', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:baked_potato', 64))
    player.give(Item.of('create:potato_cannon', `{Unbreakable:1b,display:{Name:'{\"text\":\"祖宗发射器\"}',Lore:['{"text":"爆裂黎明","color":"gray"}']}}`).enchant('minecraft:power', 15))
    player.tell('宇～宙～大～扫～除～，开始喽～')
    player.give(GetPlayerHeadItem('Night_zxy'))
})
RegisterSponsorGiftCode('帅，太刀，帅', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:wooden_sword', `{Unbreakable:1b,display:{Name:'{\"text\":\"§c§o黑龙歼灭刀\"}',Lore:['{"text":"尊贵的黑龙歼灭刀大人已解放至至尊红刃","color":"red"}']}}`))
    player.give(GetPlayerHeadItem('chouzi666'))
})
RegisterSponsorGiftCode('link start', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:netherite_sword', "{Damage:0,display:{Name:'{\"text\":\"阐释者\"}'}}").enchant('minecraft:vanishing_curse', 1).enchant('minecraft:unbreaking', 3))
    player.give(Item.of('minecraft:diamond_sword', "{Damage:0,display:{Name:'{\"text\":\"逐暗者\"}'}}").enchant('minecraft:vanishing_curse', 1)).enchant('minecraft:sharpness', 5)
    player.give(GetPlayerHeadItem('xioaye1145'))
})
RegisterSponsorGiftCode('这真的是个激活码，不骗你', (event) => {
    const player = event.player
    player.give(Item.of('biomancy:thorn_shield', `{display:{Name:'{\"text\":\"§c§o般若\"}',Lore:['{"text":"缪尔赛思：哎呀，现在反悔已经来不及了，呼呼~","color":"gray"}']},AttributeModifiers:[{Amount:5,AttributeName:"generic.max_health",Name:"1779044450516",Slot:"mainhand",UUID:[I;-126418,56042,2579,-112084]},{Amount:8,AttributeName:"generic.armor",Name:"1779044450516",Slot:"mainhand",UUID:[I;-126418,56342,2579,-112684]},{Amount:-0.35d,AttributeName:"generic.movement_speed",Name:"1779044450516",Operation:1,Slot:"mainhand",UUID:[I;-126418,56642,2579,-113284]},{Amount:5,AttributeName:"generic.max_health",Name:"1779044450516",Slot:"offhand",UUID:[I;-126418,56942,2579,-113884]},{Amount:8,AttributeName:"generic.armor",Name:"1779044450516",Slot:"offhand",UUID:[I;-126418,57242,2579,-114484]},{Amount:-0.35d,AttributeName:"generic.movement_speed",Name:"1779044450516",Slot:"offhand",Operation:1,UUID:[I;-126418,57542,2579,-115084]}],GeckoLibID:1L,"biomancy:nutrients":250}`).enchant('thorns', 9))
    player.give(GetPlayerHeadItem('W_Dynamite'))
})
RegisterSponsorGiftCode('我在这里记录一位亲爱之人', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:diamond', "{display:{Name:'{\"text\":\"阿谢姆水晶\"}'}}"))
    player.server.getPlayerList().players.forEach(pPlayer => {
        if (pPlayer.equals(player)) return
        pPlayer.teleportTo(player.level.dimension, player.x, 64, player.z, player.yaw, player.pitch)
    })
    player.give(GetPlayerHeadItem('KyaruNya'))
})
RegisterSponsorGiftCode('全村最好的开胸器', (event) => {
    const player = event.player
    player.give(Item.of('chestcavity:chest_opener', "{display:{Name:'{\"text\":\"全村最好的开胸器\"}'}}").enchant('chestcavity:safe_surgery', 1).enchant('chestcavity:painless_surgery', 1).enchant('chestcavity:advance_surgery', 5))
    player.give(GetPlayerHeadItem('Darling000000'))
})
RegisterSponsorGiftCode('神临', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:diamond_sword', `{Unbreakable:1b,display:{Name:'{\"text\":\"§c§o寰宇支配之剑\"}',Lore:['{"text":"在必要时，该武器的攻击力会提升至敌人最大血量的100%","color":"gray"}']}}`))
    player.give(Item.of('minecraft:enchanted_golden_apple', 2))
    player.give(GetPlayerHeadItem('jiuli_123'))
})
RegisterSponsorGiftCode('脆骨症2明天出', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:written_book', '{author:"MC_jiaJ1A",pages:[\'{"text":"关注YoruNina谢谢喵，谢谢你喵，真的谢谢你喵，喵♥️。"}\'],title:"YoruNina单推人"}'))
    player.give(GetPlayerHeadItem('MC_jiaJ1A'))
})
RegisterSponsorGiftCode('是啊吃什么', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:golden_carrot'))
    player.give(Item.of('minecraft:dragon_breath'))
    player.give(GetPlayerHeadItem('Huli_NotFound'))
})
RegisterSponsorGiftCode('1024', (event) => {
    const player = event.player
    player.give(Item.of('create:rose_quartz', 32))
    player.give(GetPlayerHeadItem('YuZH1024'))
})
RegisterSponsorGiftCode('我不是带师', (event) => {
    const player = event.player
    player.give(Item.of('create:wrench', '{AttributeModifiers:[{Amount:0.726f,AttributeName:"generic.luck",Name:"1779127623066",Slot:"mainhand",UUID:[I;-126419,101992,13849,-203984]}],Unbreakable:1,display:{Lore:[\'[{"text":"左旋，破坏齿轮排列逐渐崩坏的老旧律法。","italic":false,"color":"red"}]\',\'[{"text":"右旋，将崩坏的齿轮重新钉入秩序的轴心。","italic":false,"color":"aqua"}]\'],Name:\'[{"text":"带","italic":false,"color":"#ff808a"},{"text":"师","italic":false,"color":"#f28a96"},{"text":"的","italic":false,"color":"#e693a1"},{"text":"超","italic":false,"color":"#d99dad"},{"text":"极","italic":false,"color":"#cca6b9"},{"text":"无","italic":false,"color":"#c0b0c5"},{"text":"敌","italic":false,"color":"#b3b9d0"},{"text":"炫","italic":false,"color":"#a6c3dc"},{"text":"酷","italic":false,"color":"#99cce8"},{"text":"扳","italic":false,"color":"#8dd6f3"},{"text":"手","italic":false,"color":"#80dfff"}]\'}}'))
    player.give(GetPlayerHeadItem('MiKu22333'))
})
RegisterSponsorGiftCode('咕咕嘎嘎', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:polar_bear_spawn_egg'))
    player.give(Item.of('minecraft:totem_of_undying', 3))
    player.give(GetPlayerHeadItem('yindun'))
})
RegisterSponsorGiftCode('年年有余岁岁平安', (event) => {
    const player = event.player
    player.give(Item.of('lightmanscurrency:coin_emerald', 2))
})
RegisterSponsorGiftCode('084company启动！', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:wooden_sword', `{Unbreakable:1b,display:{Name:'{\"text\":\"§c§o天杀星刀\"}',Lore:['{"text":"将天也斩杀。天、地、人，然后是我。此星，是为那个将所有的存在与时间视为一个整体，并将其斩断之人升起之星。","color":"gray"}']}}`))
    player.give(Item.of('minecraft:potion', `{Potion:"minecraft:long_weakness",display:{Name:'{\"text\":\"李箱の力量\"}'}`))
    player.give(GetPlayerHeadItem('kelaien234'))
})
RegisterSponsorGiftCode('Ezfic', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:skeleton_skull'))
    player.give(Item.of('minecraft:bone', 2))
    player.give(Item.of('minecraft:saddle', `{display:{Name:'{\"text\":\"黏鞍\"}',Lore:['{"text":"亡了，亡了，我没有史莱姆昂","color":"gray"}']}}`).enchant('minecraft:knockback', 2))
    player.give(GetPlayerHeadItem('yeka114514'))
})
RegisterSponsorGiftCode('传奇厨师长', (event) => {
    const player = event.player
    player.give(Item.of('bakery:small_cooking_pot', '{Damage:0}'))
    player.give(Item.of('bakery:bread_knife', '{Damage:0}'))
    player.give(Item.of('bakery:rolling_pin', '{Damage:0}'))
    player.give(Item.of('kaleidoscope_cookery:kitchen_shovel', '{Damage:0}'))
    player.give(Item.of('kaleidoscope_cookery:netherite_kitchen_knife', '{Damage:0}'))
    player.give(GetPlayerHeadItem('Wnagcai'))
})
RegisterSponsorGiftCode('sz嘿嘿', (event) => {
    const player = event.player
    player.give(Item.of('create:mechanical_saw', 17, "{display:{Name:'{\"text\":\"我会玩动力锯了\"}'}}"))
    player.tell('我会玩动力锯了!!!!!!')
    player.give(GetPlayerHeadItem('Steve_zhang'))
})
RegisterSponsorGiftCode('icebee152', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:trident', `{Damage:0,display:{Name:'{\"text\":\"随手抛弃的三叉戟其实是稀有度超高的绝世神器\"}',Lore:['{"text":"42062唯一指定icebee，致敬瓶子君在直播mc中为了孝敬圆石爹扔掉三叉戟","color":"gray"}']}}`).enchant('minecraft:loyalty', 3).enchant('minecraft:channeling', 1).enchant('minecraft:impaling', 5).enchant('minecraft:mending', 1).enchant('minecraft:unbreaking', 3))
    player.give(GetPlayerHeadItem('celaier1'))
})
RegisterSponsorGiftCode('你懂机加工吗', (event) => {
    const player = event.player
    player.give(Item.of('create:wrench', "{display:{Name:'{\"text\":\"扳手之吻\"}'}}").enchant('minecraft:sharpness', 8).enchant('minecraft:knockback', 5))
    player.tell('我身为一名机械师，随身带着一把扳手很合理吧')
})
RegisterSponsorGiftCode('大机器在哪里？大机器又离我们而去。', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:golden_sword', `{Unbreakable:1b,display:{Name:'{\"text\":\"§c§o不再炽热的黎明之剑\"}'}}`))
    player.give(GetPlayerHeadItem('THXHRS'))
})
RegisterSponsorGiftCode('AMa-10', (event) => {
    const player = event.player
    player.give(Item.of('create:goggles', `{hideEnchant:1b,display:{Name:'{\"text\":\"§c灰质销钉\"}',Lore:['{"text":"我又该如何原谅你的背叛？ ——普瑞赛斯","color":"gray"}']}}`).enchant('minecraft:binding_curse', 1))
    player.tell(Text.of('我有多么失望。'))
    player.tell(Text.red('我又该如何原谅你的背叛？'))
    player.give(GetPlayerHeadItem('BenzenPenxil'))
})
RegisterSponsorGiftCode('胖宝宝哈基米', (event) => {
    const player = event.player
    const level = player.level
    /**@type {Internal.Cat} */
    let cat = level.createEntity('minecraft:cat')
    cat.setVariant('minecraft:red')
    cat.mergeNbt(`{CustomName:'["小白手套"]',CustomNameVisible:1b,Health:114514,Attributes:[{Base:114514f},{Name:"generic.max_health",Base:114514f}],HandItems:[{id:crossbow,tag:{Charged:0b,Damage:0,Enchantments:[{id:"minecraft:quick_charge",lvl:5s},{id:"minecraft:multishot",lvl:1s},{id:"minecraft:piercing",lvl:5s}],Unbreakable:1b,display:{Name:'{"text":"略猫区我和你们拼了"}'}},Count:1},{}],HandDropChances:[1f,0f]}`)
    cat.setPos(player.position())
    cat.finalizeSpawn(level, level.getCurrentDifficultyAt(cat.getOnPos()), 'mob_summoned', null, null)
    level.addFreshEntity(cat)
    player.give(GetPlayerHeadItem('OHCM233'))
})
RegisterSponsorGiftCode('mfrz', (event) => {
    const player = event.player
    const level = player.level
    /**@type {Internal.Cat} */
    let villager = level.createEntity('minecraft:villager')
    villager.mergeNbt(`{CustomName:'["美服忍者"]',CustomNameVisible:1b}`)
    villager.setPos(player.position())
    villager.finalizeSpawn(level, level.getCurrentDifficultyAt(villager.getOnPos()), 'mob_summoned', null, null)
    level.addFreshEntity(villager)
    player.give(GetPlayerHeadItem('Sendai_'))
})
RegisterSponsorGiftCode('可是萝莉鸟妈真的很棒哎', (event) => {
    const player = event.player
    const level = player.level
    /**@type {Internal.LightningBolt} */
    let lightningBolt = level.createEntity('minecraft:lightning_bolt')
    lightningBolt.setDamage(player.getMaxHealth())
    lightningBolt.setPos(player.position())
    player.thunderHit(level, lightningBolt)
    lightningBolt.spawn()
    level.addFreshEntity(lightningBolt)
    level.server.tell(Text.of(player.getName()).append('是个炼铜批！！！！！！！！！！'))
    player.give(GetPlayerHeadItem('37arknight'))
})
RegisterSponsorGiftCode('冲击大王', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:magma_cream', '{ArmourersWorkshop:{Identifier:"secret\\\\sponsor\\\\impact",SkinType:"armourers:item"},AttributeModifiers:[{Amount:1,AttributeName:"generic.knockback_resistance",Name:"1779222884828",Slot:"mainhand",UUID:[I;-126420,54370,32940,-108740]},{Amount:20,AttributeName:"generic.max_health",Name:"1779222884828",Slot:"mainhand",UUID:[I;-126420,54670,32940,-109340]},{Amount:5,AttributeName:"generic.attack_knockback",Name:"1779222884828",Slot:"mainhand",UUID:[I;-126420,54970,32940,-109940]},{Amount:29,AttributeName:"generic.attack_damage",Name:"1779222884828",Slot:"mainhand",UUID:[I;-126420,55270,32940,-110540]},{Amount:1,AttributeName:"generic.knockback_resistance",Name:"1779222884828",Slot:"offhand",UUID:[I;-126420,55570,32940,-111140]}],HideFlags:7,Unbreakable:1,display:{Lore:[\'[{"text":"Good morning! Rider! ","italic":false,"color":"#ff0000"}]\'],Name:\'[{"text":"Impact","italic":false,"color":"#ff0000"}]\'}}'))
    player.give(GetPlayerHeadItem('KALTIST_Esperant'))
})
RegisterSponsorGiftCode('SAIKAI', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:netherite_shovel', "{Damage:0,Unbreakable:1,display:{Lore:['[{\"text\":\"应该用叉勺···在下水道吃拼好饭时···\",\"italic\":false,\"color\":\"#B4684D\",\"underlined\":true}]','[{\"text\":\"女儿啊......看来你忘记帮我解冻了\",\"italic\":false,\"color\":\"dark_gray\",\"italic\":true}]'],Name:'[{\"text\":\"神谕终端[双蛇杖]\",\"italic\":false,\"color\":\"gold\"}]'}}").enchant('sharpness', 9))
    player.give(Item.of('minecraft:paper', '{AttributeModifiers:[{Amount:2d,AttributeName:"generic.luck",Name:"1779224367042",Slot:"offhand",UUID:[I;-126420,15153,45311,-30306]}],display:{Lore:[\'[{"text":"致 Player，打开哔哩哔哩 YoruNina 的主页点击关注","italic":false,"color":"white"}]\',\'[{"text":"并在最近三个视频中三连并留下一句赞美","italic":false,"color":"white"}]\',\'[{"text":"后单曲循环 SAIKAI 325次。","italic":false,"color":"white"}]\'],Name:\'[{"text":"✿指令[纸条]","italic":false,"color":"blue"}]\'}}'))
    player.give(Item.of('minecraft:carved_pumpkin', '{AttributeModifiers:[{Amount:3,AttributeName:"generic.attack_damage",Name:"1779221247370",Slot:"head",UUID:[I;-126420,54558,4318,-109116]},{Amount:-3,AttributeName:"generic.armor",Name:"1779221247370",Slot:"head",UUID:[I;-126420,54858,4318,-109716]},{Amount:0.15d,AttributeName:"generic.attack_damage",Name:"1779221247370",Operation:1,Slot:"head",UUID:[I;-126420,55158,4318,-110316]}],Unbreakable:1,display:{Lore:[\'[{"text":"- 攻击等级+3，防御等级-3","italic":false,"color":"white"}]\',\'[{"text":"- 受到的单方面攻击伤害-25%","italic":false,"color":"white"}]\',\'[{"text":"- 基础攻击造成的伤害+15%","italic":false,"color":"white"}]\',\'[{"text":"...如果就这样放你离开，你大概永远也不会再回家吧。","italic":false,"color":"dark_gray","strikethrough":true}]\',\'[{"text":"就算拦下你，让你留在这里，我也已经一无所剩了。","italic":false,"color":"dark_gray","strikethrough":true}]\',\'[{"text":"不过......总比被空虚的悔意绞痛心脏要好，不是吗?","italic":false,"color":"dark_gray","strikethrough":true}]\'],Name:\'[{"text":"灼烧着的伤口","italic":false,"color":"red"}]\'}}').enchant('protection', 6))
    player.give(GetPlayerHeadItem('Tsuki_Kira'))
})
RegisterSponsorGiftCode('组一辈子乐队吧', (event) => {
    const player = event.player
    GivePlayerItemList(player, [GetPlayerHeadItem('XS_T'), 'immersive_melodies:handpan', 'immersive_melodies:piano', 'immersive_melodies:bagpipe', 'immersive_melodies:didgeridoo', 'immersive_melodies:ender_bass', 'immersive_melodies:lute', 'immersive_melodies:flute', 'immersive_melodies:triangle', 'immersive_melodies:tiny_drum', 'immersive_melodies:trumpet', 'immersive_melodies:vielle', Item.of('minecraft:wooden_sword', "{Unbreakable:1}").enchant('knockback', 10)])
})
RegisterSponsorGiftCode('一个人要坚强', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:cake', `{display:{Lore:['{"text":"在重要的人走后，要学会自己去面对生活","color":"gray"}']}}`))
    player.tell(Text.of('少吃点奶油对身体不健康 - 最后的嘱托'))
    player.give(GetPlayerHeadItem('SilverWolfGG'))
})
RegisterSponsorGiftCode('谢谢品尝喵', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:golden_apple', 64))
    player.give(Item.of('biomancy:primordial_cradle'))
    player.tell(Text.of('感谢游玩喵'))
    player.give(GetPlayerHeadItem('Xi_lan_Hua_'))
})
RegisterSponsorGiftCode('给你一只酱板鸭希望你能熬过这个冬天', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:iron_axe'))
    player.give(Item.of('minecraft:oak_log'))
    player.give(Item.of('minecraft:fox_spawn_egg'))
    player.give(GetPlayerHeadItem('feastiful'))
})
RegisterSponsorGiftCode('中指永不遗忘', (event) => {
    const player = event.player
    player.give(Item.of('ars_nouveau:archmage_spell_book', `{display:{Name:'{\"text\":\"§c复仇账簿\"}',Lore:['{"text":"中指时刻铭记，永不遗忘。","color":"gray"}']}}`))
    player.give(Item.of('minecraft:iron_sword', `{display:{Name:'{\"text\":\"§c莱万汀\"}',Lore:['{"text":"心不心的都用不上。只要咬紧牙关把至今刻下的所有纹身的力量都激发出来，就算没有心那样的技巧我也足够强大。","color":"gray"}']}}`).enchant('minecraft:fire_aspect', 10))
    player.give(Item.of('minecraft:paper', `{display:{Name:'{\"text\":\"发廊的发型设计优惠券(五小时)\"}',Lore:['{"text":"我的理发啊啊啊券！！！","color":"gray"}']}}`))
    player.give(GetPlayerHeadItem('Elaina_XuXs'))
})
RegisterSponsorGiftCode('边缘世界特产', (event) => {
    const player = event.player
    GivePlayerItemList(player, [GetPlayerHeadItem('NowMoyu33'), 'kubejs:dragon_blood_heart', 'kubejs:dragon_blood_kidney', 'kubejs:dragon_blood_liver', 'kubejs:dragon_blood_lung'])
})
RegisterSponsorGiftCode('如果你是龙，也好', (event) => {
    const player = event.player
    GivePlayerItemList(player, [GetPlayerHeadItem('Wax5508'), 'minecraft:dragon_egg'])
})
RegisterSponsorGiftCode('情况真是急转直下啊', (event) => {
    const player = event.player
    GivePlayerItemList(player, [GetPlayerHeadItem('cai_yi_'), 'minecraft:totem_of_undying', 'minecraft:gold_block', Item.of('minecraft:bread', 13), Item.of('minecraft:stone_sword', '{Damage:0}').enchant('minecraft:smite', 5)])
})
RegisterSponsorGiftCode('这种事情也是会发生的', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:totem_of_undying', `{display:{Name:'{\"text\":\"我能硬抗空间斩！\"}',Lore:['{"text":"如果有这个的话...","color":"gray"}']}}`))
    player.give(GetPlayerHeadItem('Roze_CrossX'))
})
RegisterSponsorGiftCode('咱们再去砍棵树吧！', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:golden_axe', `{Unbreakable:1b,display:{Name:'{\"text\":\"露西斧\"}',Lore:['{"text":"嘿！砍些树吧！","color":"gray"}']}}`).enchant('minecraft:efficiency', 5))
    player.give(GetPlayerHeadItem('RedBird0920'))
})
RegisterSponsorGiftCode('ciallo', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:enchanted_golden_apple', `{Unbreakable:1b,display:{Name:'{\"text\":\"柚子\"}'}}`))
    player.give(Item.of('refurbished_furniture:television_remote', `{Unbreakable:1b,display:{Name:'{\"text\":\"宁宁起爆器\"}'}}`).enchant('minecraft:blast_protection', 4))
    player.give(Item.of('supplementaries:faucet', `{Unbreakable:1b,display:{Name:'{\"text\":\"色情死神女的花洒\"}'}}`))
    player.give(Item.of('minecraft:iron_sword', `{Unbreakable:1b,display:{Name:'{\"text\":\"丛雨丸\"}'}}`).enchant('minecraft:binding_curse', 1))
    player.tell(Text.of('Ciallo~ (∠・ω< )⌒☆'))
    player.give(GetPlayerHeadItem('yange258'))
})
RegisterSponsorGiftCode('Rezero', (event) => {
    const player = event.player
    player.runCommandSilent('title @a title [{"text":"死","color":"#87CEEB"},{"text":"亡","color":"#00BFFF"},{"text":"并","color":"#1E90FF"},{"text":"非","color":"#6495ED"},{"text":"结","color":"#4169E1"},{"text":"束","color":"#0000CD"}]')
    player.give(Item.of('minecraft:totem_of_undying', "{HideFlags:1,display:{Lore:['[{\"text\":\"「\",\"color\":\"red\"},{\"text\":\" \",\"color\":\"gold\"},{\"text\":\"こ\",\"color\":\"yellow\"},{\"text\":\"こ\",\"color\":\"green\"},{\"text\":\"か\",\"color\":\"aqua\"},{\"text\":\"ら\",\"color\":\"blue\"},{\"text\":\"始\",\"color\":\"light_purple\"},{\"text\":\"め\",\"color\":\"red\"},{\"text\":\"よ\",\"color\":\"gold\"},{\"text\":\"う\",\"color\":\"yellow\"},{\"text\":\"…\",\"color\":\"green\"},{\"text\":\"…\",\"color\":\"aqua\"},{\"text\":\"い\",\"color\":\"blue\"},{\"text\":\"や\",\"color\":\"light_purple\"},{\"text\":\" \",\"color\":\"red\"},{\"text\":\"ゼ\",\"color\":\"gold\"},{\"text\":\"ロ\",\"color\":\"yellow\"},{\"text\":\"か\",\"color\":\"green\"},{\"text\":\"ら\",\"color\":\"aqua\"},{\"text\":\" \",\"color\":\"blue\"},{\"text\":\"」\",\"color\":\"light_purple\"}]'],Name:'[{\"text\":\"至\",\"color\":\"#FFD700\"},{\"text\":\"此\",\"color\":\"#FFC125\"},{\"text\":\"迎\",\"color\":\"#FFB347\"},{\"text\":\"临\",\"color\":\"#FFA500\"},{\"text\":\"新\",\"color\":\"#FF8C00\"},{\"text\":\"生\",\"color\":\"#FF6A00\"}]'}}").enchant('minecraft:mending', 1).enchant('minecraft:vanishing_curse', 1))
    player.give(GetPlayerHeadItem('clks2719'))
})
RegisterSponsorGiftCode('下午茶时间', (event) => {
    const player = event.player
    GivePlayerItemList(player, [Item.of('create:bar_of_chocolate', 64), Item.of('create:sweet_roll', 64), Item.of('create:honeyed_apple', 64), 'create:builders_tea'])
    player.tell(Text.of('下午茶时间到！甜到发齁！'))
})
RegisterSponsorGiftCode('哼唧哼唧', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:pig_spawn_egg', 17))
    player.give(GetPlayerHeadItem('maoyukedama'))
})
RegisterSponsorGiftCode('钟鸣三次，赞美欧姆弥赛亚', (event) => {
    const player = event.player
    GivePlayerItemList(player, [GetPlayerHeadItem('Jeanne1314'), Item.of('create:potato_cannon', '{Damage:0}'), Item.of('create:copper_backtank', '{Air:900}'), Item.of('minecraft:sweet_berries', 16)])
})
RegisterSponsorGiftCode('一年里总有那么几天想玩MC', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:bread', 64))
    player.give(Item.of('minecraft:golden_apple', 64))
    player.give(GetPlayerHeadItem('lzxlzxlzx'))
})
RegisterSponsorGiftCode('镰刀真是太棒啦', (event) => {
    const player = event.player
    player.give(Item.of('biomancy:despoil_sickle', `{display:{Name:'{\"text\":\"应该用镰刀…像某人一般沿着空间斩裂\"}',Lore:['{"text":"镰刀……虽然难以理解，但见过苍蓝残响战斗的身姿之后，我就有感觉了。","color":"gray"}']}}`).enchant('minecraft:binding_curse', 1).enchant('minecraft:sharpness', 9).enchant('minecraft:unbreaking', 9))
    player.give(Item.of('minecraft:potion', '{Potion:"minecraft:swiftness",display:{Name:\'{"text":"水蓝色黎明"}\'}}'))
    player.give(GetPlayerHeadItem('konoXiluoda'))
})
RegisterSponsorGiftCode('fumofumo', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:name_tag', "{display:{Name:'{\"text\":\"fumo\"}'}}"))
    player.give(Item.of('minecraft:anvil'))
    player.tell(Text.of('你是什么fumo呢'))
    player.give(GetPlayerHeadItem('fldlfumo'))
})
RegisterSponsorGiftCode('元素之力都由我掌控', (event) => {
    const player = event.player
    player.tell(Text.of('开始自我编织'))
    GivePlayerItemList(player, [GetPlayerHeadItem('Youhane__ritsu'), Item.of('ars_nouveau:fire_essence'), Item.of('ars_nouveau:water_essence', 2), Item.of('ars_nouveau:air_essence', 3), Item.of('ars_nouveau:earth_essence', 4)])
})
RegisterSponsorGiftCode('超级地球是投注', (event) => {
    const player = event.player
    player.give(Item.of('kaleidoscope_cookery:cold_cut_ham_slices', "{display:{Name:'{\"text\":\"超级地球\"}'}}"))
    player.tell(Text.of('我解放你大业的!!!'))
    player.give(GetPlayerHeadItem('MinGuanTAOM'))
})
RegisterSponsorGiftCode('Space', (event) => {
    const player = event.player
    player.give(Item.of('kaleidoscope_cookery:slime_ball_meal', 64))
    player.give(Item.of('create:encased_fan', 32))
    player.teleportRelative(0, 3000, 0)
    player.give(GetPlayerHeadItem('Mu_Hhang'))
})
RegisterSponsorGiftCode('原神启动', (event) => {
    const player = event.player
    player.give('minecraft:cobblestone')
    player.give(GetPlayerHeadItem('suiyoubi54'))
})
RegisterSponsorGiftCode('我得重新集结部队', (event) => {
    const player = event.player
    player.give(Item.of('tetra:modular_double', `{Damage:0,EnchantmentMapping:{"minecraft:sharpness":"double/head_left"},HideFlags:3,RepairCost:0,Unbreakable:1b,display:{Name:\'{"text":"太阳能战斧"}\',Lore:['{"text":"拥抱战斗的荣耀","color":"gray"}']},"double/basic_axe_left_material":"basic_axe/diamond","double/basic_axe_right_material":"basic_axe/diamond","double/basic_handle_material":"basic_handle/oak","double/handle":"double/basic_handle","double/head_left":"double/basic_axe_left","double/head_left:arrested":0,"double/head_right":"double/basic_axe_right","double/head_right:arrested":0,honing_progress:440,id:"aa2e1cdf-0e6b-4fa5-bcf8-4e47fcba4595"}`).enchant('minecraft:sharpness', 5))
    player.tell(Text.of('乳主份子！拿起太阳能战斧，去引导太阳轰炸！'))
    player.give(GetPlayerHeadItem('F2AorGG'))
})
RegisterSponsorGiftCode('是这个乱世害了你', (event) => {
    const player = event.player
    player.give(Item.of('kaleidoscope_cookery:netherite_kitchen_knife', '{Unbreakable:1b,Damage:0,display:{Name:\'{"text":"仁之刀"}\'}}').enchant('minecraft:mending', 1).enchant('minecraft:looting', 3).enchant('minecraft:fortune', 3).enchant('minecraft:fire_aspect', 2))
    player.give(Item.of('kaleidoscope_cookery:gold_kitchen_knife', '{Unbreakable:1b,Damage:0,display:{Name:\'{"text":"义之刀"}\'}}').enchant('minecraft:mending', 1).enchant('minecraft:looting', 3).enchant('minecraft:fortune', 3).enchant('minecraft:fire_aspect', 2))
    player.tell(Text.of('孩儿不孝啊！呱！'))
    player.give(GetPlayerHeadItem('Adrian_NHT'))
})
RegisterSponsorGiftCode('史尔特尔', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:totem_of_undying', '{Damage:0,display:{Name:\'{"text":"余烬"}\'}}'))
    player.give(Item.of('minecraft:netherite_sword', '{Unbreakable:1b,Damage:0,display:{Name:\'{"text":"烈焰魔剑 莱万汀"}\'}}').enchant('minecraft:sharpness', 10))
    player.give(GetPlayerHeadItem('An_bao'))
})
RegisterSponsorGiftCode('成为宝可梦大师', (event) => {
    const player = event.player
    GivePlayerItemList(player, [GetPlayerHeadItem('LiA0A'), 'ars_nouveau:ritual_brazier', 'ars_nouveau:ritual_containment', 'ars_nouveau:mob_jar'])
})
RegisterSponsorGiftCode('机械动力轻而易举呀', (event) => {
    const player = event.player
    GivePlayerItemList(player, [GetPlayerHeadItem('MuYang_24'), Item.of('create:large_water_wheel', 64), Item.of('create:cogwheel', 64), Item.of('create:large_cogwheel', 64)])
    player.tell(Text.of('这玩意怎么不动？那玩意又是怎么动起来的？！'))
})
RegisterSponsorGiftCode('如同飞鸟', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:feather'))
    player.give(Item.of('minecraft:diamond', 20, '{display:{Name:\'{"text":"填海的小石子"}\'}}'))
    player.give(GetPlayerHeadItem('jing0wei1'))
})
RegisterSponsorGiftCode('剑心犹在', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:wooden_sword', '{Unbreakable:1b,display:{Name:\'{"text":"剑心犹在"}\'},AttributeModifiers:[{Amount:0.5d,AttributeName:"generic.movement_speed",Name:"1779386548393",Operation:1,Slot:"mainhand",UUID:[I;-126422,36482,225,-72964]},{Amount:0.5d,AttributeName:"generic.movement_speed",Name:"1779386548393",Operation:1,Slot:"offhand",UUID:[I;-126422,36782,225,-73564]}],Damage:0}'))
    player.give(GetPlayerHeadItem('Huaji_XG'))
})
RegisterSponsorGiftCode('光头恶霸', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:golden_helmet', '{display:{Name:\'{"text":"-99%恶魔概率"}\'},Unbreakable:1b,AttributeModifiers:[{Amount:20,AttributeName:"generic.max_health",Name:"1779387676814",Slot:"head",UUID:[I;-126422,80582,225,-161164]},{Amount:-0.15d,AttributeName:"generic.movement_speed",Name:"1779387676814",Operation:1,Slot:"head",UUID:[I;-126422,80882,225,-161764]},{Amount:-5,AttributeName:"generic.knockback_resistance",Name:"1779387676814",Operation:1,Slot:"head",UUID:[I;-126422,81182,225,-162364]},{Amount:-5,AttributeName:"generic.armor",Name:"1779387676814",Slot:"head",UUID:[I;-126422,81482,225,-162964]},{Amount:-5,AttributeName:"generic.armor_toughness",Name:"1779387676814",Slot:"head",UUID:[I;-126422,81782,225,-163564]},{Amount:-1,AttributeName:"forge:entity_reach",Name:"1779387676814",Slot:"head",UUID:[I;-126422,82082,225,-164164]}],Damage:0,RepairCost:1,hideEnchant:1b}').enchant('minecraft:binding_curse', 1))
    player.give(GetPlayerHeadItem('AcidArtifact833'))
})
RegisterSponsorGiftCode('回忆中的世界', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:command_block', 1))
    player.give(Item.of('minecraft:wither_skeleton_skull', 2))
    player.give(Item.of('minecraft:soul_sand', 3))
    player.tell(Text.of('冥冥中自有感应——你终将归返记忆深处的故界，去弑那命定之祂。'))
    player.give(GetPlayerHeadItem('medalert'))
})
RegisterSponsorGiftCode('再见了大小姐', (event) => {
    const player = event.player
    player.give(Item.of('waystones:waystone', 1))
    const server = player.server
    let structureHolderSet = MAAUtils.getStructureHolderSet(server, new ResourceLocation('minecraft:end_city'))
    const endLevel = server.getLevel('minecraft:the_end')
    let task = $AsyncLocator.locate(endLevel, structureHolderSet, BlockPos.ZERO, 1000, false)
    task.then((ctx) => {
        const pos = ctx.getFirst()
        server.scheduleInTicks(1, () => {
            player.teleportTo('minecraft:the_end', pos.x, 64, pos.z, player.yaw, player.pitch)
        })
    })
    player.tell(Text.of('还回来吃饭吗？'))
    player.give(GetPlayerHeadItem('Don_Rhine'))
})
RegisterSponsorGiftCode('我不会再等了', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:diamond'))
    player.give(Item.of('minecraft:diamond_sword', '{Damage:0,display:{Name:\'{"text":"血盟誓约"}\'}}').enchant('minecraft:smite', 5))
    player.give(GetPlayerHeadItem('iNostY'))
})
RegisterSponsorGiftCode('让邺城燃烧', (event) => {
    const player = event.player
    player.give(Item.of('createdieselgenerators:lighter', '{Fluid:{Amount:200,FluidName:"createdieselgenerators:gasoline"},Type:0}').enchant('minecraft:fire_aspect', 5).enchant('minecraft:sharpness', 5))
    player.give(GetPlayerHeadItem('KGYsh'))
})
RegisterSponsorGiftCode('是关东煮来了', (event) => {
    const player = event.player
    GivePlayerItemList(player, [GetPlayerHeadItem('Yitheizi'), Item.of('kaleidoscope_cookery:brown_mushroom_pot_soup', '{display:{Name:\'{"text":"棕色关东煮"}\'}}'), Item.of('kaleidoscope_cookery:crimson_fungus_pot_soup', '{display:{Name:\'{"text":"异画关东煮"}\'}}'), Item.of('kaleidoscope_cookery:buddha_jumps_over_the_wall', '{display:{Name:\'{"text":"豪华版关东煮"}\'}}'), Item.of('kaleidoscope_cookery:warped_fungus_pot_soup', '{display:{Name:\'{"text":"绿色关东煮"}\'}}'), Item.of('kaleidoscope_cookery:red_mushroom_pot_soup', '{display:{Name:\'{"text":"红色关东煮"}\'}}')])
})