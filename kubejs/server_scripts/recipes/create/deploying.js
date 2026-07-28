// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.deploying(['kubejs:pressurized_arm'], ['kubejs:telescopic_attack_arm', 'minecraft:blaze_powder'])
    event.recipes.create.deploying(['kubejs:telescopic_attack_arm'], ['kubejs:telescopic_arm', 'minecraft:gunpowder'])
    event.recipes.create.deploying(['kubejs:telescopic_arm'], ['create:brass_hand', 'create:iron_sheet'])
    event.recipes.create.deploying(['kubejs:machine_witch_fibroma'], ['kubejs:witch_fibroma', 'supplementaries:jar'])
})
