// priority: 500
RegistryOrgan('kubejs:blood_crystal_factory')
    .addScore('chestcavity:health', 1.0)
    .addScore('chestcavity:luck', -1.0)

const BloodCrystalFactoryTempAttackUpUUID = UUID.fromString('5EADE963-94E3-4660-9A26-EF48B5B1753D')
const BloodCrystalFactoryTempAttackUpIdentifier = 'BloodCrystalFactoryAttackUp'
const BloodCrystalFactoryTempHealthUpUUID = UUID.fromString('11675F6D-0749-4D44-89D9-29B89678E0CA')
const BloodCrystalFactoryTempHealthUpIdentifier = 'BloodCrystalFactoryHealthUp'
const BloodCrystalFactoryTempArmorUpUUID = UUID.fromString('F79AD7B5-BC35-4A2C-9FD0-0DCE7968AFA6')
const BloodCrystalFactoryTempArmorUpIdentifier = 'BloodCrystalFactoryArmorUp'

/**
* 
* @param {OrganEventCustomData} customData
* @param {Internal.OpenedEntityTickJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function BloodCrystalFactoryEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const server = event.server
    if (entity.age % 1200 != 0) return
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()

    let convertableHealth = entity.getHealth() - entity.getMaxHealth() * 0.1
    if (convertableHealth <= 0) return
    if (slotType != TransdimensionalMechanized) {
        let bloodCrystalCount = Math.min(Math.max(Math.floor(convertableHealth / 2), 0), 64)
        entity.setHealth(entity.getHealth() - bloodCrystalCount * 2)
        if (bloodCrystalCount <= 0) return
        let canSetSlotList = []
        for (let i = 0; i < chestCavity.inventory.getContainerSize(); i++) if (chestCavity.inventory.getItem(i).isEmpty()) canSetSlotList.push(i)
        if (canSetSlotList.length == 0) return
        let targetIndex = RandomGet(canSetSlotList)
        let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
        entity.setHealth(entity.getHealth() - bloodCrystalCount * 2)
        SetChestCavityOrgan(customData, chestCavity, Item.of('kubejs:blood_crystal', bloodCrystalCount), targetIndex, targetSlotType, true)
        return
    }

    let curRelativePos = invTypeData.getSlotDefinition(organIndex).getRelativePosition()
    let targetRelativePos = invTypeData.getRelativeSlotDefinition(curRelativePos.getX(), curRelativePos.getY() - TransdimensionalMechanizedRelativeYSlot)
    if (!targetRelativePos) return
    let compressBlockItem = ccInv.getStackInSlot(targetRelativePos.getId())
    let roomOpt = CompactMachineUtil.getRoomFromItem(compressBlockItem)
    if (!roomOpt || roomOpt.isEmpty()) return
    const room = roomOpt.get()

    entity.setHealth(entity.getHealth() - convertableHealth)
    CompactMachineUtil.fillFluid(server, room, 'up', Fluid.of('kubejs:blood_fluid', convertableHealth * 250), 'execute')

    let itemHandlerLazyOpt = CompactMachineUtil.getItemHandler(server, room, 'down')
    let attack = 0, armor = 0, health = 0
    if (!itemHandlerLazyOpt.isPresent()) return
    let itemHandler = itemHandlerLazyOpt.resolve().get()
    for (let i = 0; i < itemHandler.getSlots(); i++) {
        let pItem = itemHandler.getStackInSlot(i)
        if (pItem.is('kubejs:alpha_pheromone_serum')) {
            attack += 1
            continue
        }
        if (pItem.is('kubejs:beta_pheromone_serum')) {
            armor += 1
            continue
        }
        if (pItem.is('kubejs:gamma_pheromone_serum')) {
            health += 1
            continue
        }
    }

    let attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
    if (attackAttr) {
        attackAttr.removePermanentModifier(BloodCrystalFactoryTempAttackUpUUID)
        attackAttr.addPermanentModifier(new $AttributeModifier(BloodCrystalFactoryTempAttackUpUUID, BloodCrystalFactoryTempAttackUpIdentifier, attack, 'addition'))
    }

    let armorAttr = entity.getAttribute('minecraft:generic.armor')
    if (armorAttr) {
        armorAttr.removePermanentModifier(BloodCrystalFactoryTempArmorUpUUID)
        armorAttr.addPermanentModifier(new $AttributeModifier(BloodCrystalFactoryTempArmorUpUUID, BloodCrystalFactoryTempArmorUpIdentifier, armor, 'addition'))
    }

    let healthAttr = entity.getAttribute('minecraft:generic.max_health')
    if (healthAttr) {
        healthAttr.removePermanentModifier(BloodCrystalFactoryTempHealthUpUUID)
        healthAttr.addPermanentModifier(new $AttributeModifier(BloodCrystalFactoryTempHealthUpUUID, BloodCrystalFactoryTempHealthUpIdentifier, health, 'addition'))
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:blood_crystal_factory')
        .addOnlyStrategy('entity_tick', BloodCrystalFactoryEntityTick)
)