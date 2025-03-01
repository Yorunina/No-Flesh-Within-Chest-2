// priority: 801

const OrganChestCavityUpdateStrategy = new OrganChestCavityUpdateStrategyModel()
    .setInit(
        /** 
         * @param {OrganChestCavityUpdateStrategyCustomData} customData
         * @param {Internal.EvaluateChestCavityJS} event
         */
        (customData, event) => {
            customData.mpmParts = []
            customData.attackDamage = new AttributeManagerModel(1)
            customData.maxHealth = new AttributeManagerModel(1)
            customData.armor = new AttributeManagerModel(1)
        }
    )
    .setDefer(
        /**
         * @param {OrganChestCavityUpdateStrategyCustomData} customData
         * @param {Internal.EvaluateChestCavityJS} event
         */
        (customData, event) => {
        }
    )


const OrganTakeOffStrategy = new OrganTakeOffStrategyModel()
    .setInit(
        /** 
         * @param {OrganChestCavityUpdateStrategyCustomData} customData
         * @param {Internal.EvaluateChestCavityJS} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {OrganChestCavityUpdateStrategyCustomData} customData
         * @param {Internal.EvaluateChestCavityJS} event
         */
        (customData, event) => {
        }
    )


const SlotChestCavityUpdateStrategy = new SlotStrategyModel()
    .setInit(
        /** 
         * @param {OrganChestCavityUpdateStrategyCustomData} customData
         * @param {Internal.EvaluateChestCavityJS} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {OrganChestCavityUpdateStrategyCustomData} customData
         * @param {Internal.EvaluateChestCavityJS} event
         */
        (customData, event) => {
            const entity = event.entity
            if (entity.isPlayer() && entity.inventory) {
                new $SpellSelectionManager(entity)
            }
            customData.attackDamage.applyOnEntityByAttributeKey(entity, 'minecraft:generic.attack_damage', 'OrganAttackDamage')
            customData.maxHealth.applyOnEntityByAttributeKey(entity,'minecraft:generic.max_health', 'OrganMaxHealth')
            customData.armor.applyOnEntityByAttributeKey(entity,'minecraft:generic.armor', 'OrganArmor')
        }
    )

ChestCavityEvents.evaluateChestCavity(event => {
    const { chestCavity, entity } = event
    let customData = {}
    if (!entity.isAlive()) return
    
    OrganTakeOffStrategy.run(chestCavity, [event], customData)
    
    OrganChestCavityUpdateStrategy.run(chestCavity, [event], customData)
    SlotChestCavityUpdateStrategy.run(chestCavity, [event], customData) 
})