// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.mechanical_crafting('kubejs:amethyst_resonator',
        [
            'GGG',
            'OAO',
            'PCP',
        ],
        {
            G: '#forge:glass',
            A: 'minecraft:amethyst_shard',
            P: '#minecraft:planks',
            C: '#forge:ingots/copper',
            O: '#forge:ingots/gold'
        }
    )

    event.recipes.create.mechanical_crafting('kubejs:counterweight_gear',
        [
            'RBBBB',
            'B I O',
            'BI IO',
            'B IGO',
            'BOOOO',
        ],
        {
            R: 'kubejs:refined_brass_ingot',
            O: '#forge:obsidian',
            B: 'create:brass_sheet',
            G: '#forge:dusts/glowstone',
            I: '#forge:ingots/iron'
        }
    )

})

