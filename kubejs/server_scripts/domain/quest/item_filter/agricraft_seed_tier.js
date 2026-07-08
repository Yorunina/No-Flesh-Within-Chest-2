// priority: 500
MAAEvents.ftbCustomItemFilter('agricraft_seed_tier', event => {
    const stack = event.testItem
    if (!stack.is('agricraft:seed')) return
    const type = event.args[0]
    const tier = event.args[1]
    const nbt = stack.getOrCreateTag()
    const genesNbt = nbt.getCompound('genes')
    if (!genesNbt) return
    if (!genesNbt.contains(type)) return
    let typeNbt = genesNbt.getCompound(type)
    if (typeNbt.getInt('dom') < tier && typeNbt.getInt('rec') < tier) return
    event.setResult(true)
})