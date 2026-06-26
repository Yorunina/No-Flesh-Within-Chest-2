// priority: 1000
MAAEvents.cauldronCraft(event => {
    const fluidStack = event.getFluidStack()
    const items = event.getItems()
    const boiling = event.isBoiling()
    let fluidCount = fluidStack.getCount()
    let resOrgan = null
    if (!boiling) return
    if (!fluidStack.hasTag()) return
    let fluidNbt = fluidStack.getTag()
    if (!fluidNbt.contains('Potion') || (fluidNbt.getString('Potion') != 'biomancy:primordial_infestation' && fluidNbt.getString('Potion') != 'biomancy:long_primordial_infestation')) return
    if (fluidCount < 1) return
    for (let i = 0; i < items.length; i++) {
        let item = items.get(i)
        if (!item.hasTag('kubejs:organ') || !item.hasNBT()) return
        let nbt = item.getNbt()
        if (!nbt.contains('chestcavity:organ_compatibility')) return
        nbt.remove('chestcavity:organ_compatibility')
        resOrgan = item.copyAndClear()
        break
    }
    fluidStack.setCount(fluidCount - 1)
    event.setCraftResult(FluidAndItemCraftResult.of(resOrgan, fluidStack))
})