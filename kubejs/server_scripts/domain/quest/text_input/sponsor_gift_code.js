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
    player.give(Item.of('minecraft:slime_ball', "{display:{Name:'{\"text\":\"屏障梦胶囊\"}'}}").enchant('minecraft:protection', 5))
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
    player.give(Item.of('create:creative_blaze_cake', 3))
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
RegisterSponsorGiftCode('SAIKAI', (event) => {
    const player = event.player
    player.give(Item.of('minecraft:netherite_shovel', `{display:{Name:'{\"text\":\"神谕终端[双蛇杖]\"}',Lore:['{"text":"女儿啊...看来你忘记给我解冻了","color":"gray"}']}}`))
    player.give(GetPlayerHeadItem('Tsuki_Kira'))
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
    player.give(Item.of('minecraft:glass', "{display:{Name:'{\"text\":\"§l§7玻璃充能球\"}'}}").enchant('minecraft:sharpness', 4))
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