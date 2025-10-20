// priority: 500
ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    //无流体物品
    tconstruct.material('kubejs:living_flesh', 'biomancy:living_flesh')
    tconstruct.material('kubejs:creator_mix', 'biomancy:creator_mix')  
    tconstruct.material('kubejs:koboleton_bone', 'cataclysm:koboleton_bone') 
    tconstruct.material('kubejs:mob_marrow', 'biomancy:mob_marrow') 
    tconstruct.material('kubejs:bone_fragments', 'biomancy:bone_fragments')
    tconstruct.material('kubejs:tough_fibers', 'biomancy:tough_fibers') 
    tconstruct.material('kubejs:elastic_fibers', 'biomancy:elastic_fibers')  
    tconstruct.material('kubejs:withered_mob_marrow', 'biomancy:withered_mob_marrow') 
    tconstruct.material('kubejs:magebloom_fiber', 'ars_nouveau:magebloom_fiber') 
    tconstruct.material('kubejs:mob_sinew', 'biomancy:mob_sinew') 
    tconstruct.material('kubejs:nutrients', 'biomancy:nutrients') 
    tconstruct.material('kubejs:organic_matter', 'biomancy:organic_matter') 
    tconstruct.material('kubejs:regenerative_fluid', 'biomancy:regenerative_fluid') 
    tconstruct.material('kubejs:blight_sorrow_planks','cryofloric_arts:blight_sorrow_planks')
    tconstruct.material('kubejs:essence_of_the_storm','cataclysm:essence_of_the_storm')
    tconstruct.material('kubejs:flesh_bits','biomancy:flesh_bits')
    tconstruct.material('kubejs:lacrima','cataclysm:lacrima')
})
