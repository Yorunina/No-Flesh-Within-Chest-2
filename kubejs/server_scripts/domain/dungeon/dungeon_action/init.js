// priority: 1000
const DungeonSpawnerIdMap = {
    'test': testDungeonSpawner
}

/**
 * 
 * @param {string} id 
 * @param {DungeonEventActionModel} spawner 
 */
function RegistryDungeonSpawner(id, spawner) {
    DungeonSpawnerIdMap[id] = spawner
}