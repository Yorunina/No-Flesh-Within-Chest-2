// priority: 500
MAAEvents.ftbCustomItemFilter('agricraft_seed_species', event => {
    const stack = event.testItem
    if (!stack.is('agricraft:seed')) return
    const species = event.args[0]
    const nbt = stack.getOrCreateTag()
    const genesNbt = nbt.getCompound('genes')
    if (!genesNbt) return
    if (!genesNbt.contains('species')) return
    let speciesNbt = genesNbt.getCompound('species')
    if (speciesNbt.getString('dom') != species && speciesNbt.getString('rec') != species) return
    event.setResult(true)
})