// priority: 999
/**
 * @type {Object<string, AttributeUUIDModel>}
 */
const AttributeIdentifierMap = {}

/**
 * @param {AttributeUUIDModel} attributeUUID 
 */
function RegistryAttributeIdentifier(attributeUUID) {
    AttributeIdentifierMap[attributeUUID.attributeKey] = attributeUUID
}


RegistryAttributeIdentifier(
    new AttributeUUIDModel('minecraft:generic.attack_damage')
        .setBaseAddUUID('509D0952-B490-4F55-B830-30432295B684')
        .setBaseMultiUUID('24166EEE-AB69-4E7F-98DF-824C5CF42893')
        .setAllMultiUUID('0D08BBF5-1E23-4534-9D54-17C6C37BB956')
)

RegistryAttributeIdentifier(
    new AttributeUUIDModel('minecraft:generic.max_health')
        .setBaseAddUUID('D87ED9AB-154D-402E-98C7-C556869FF36B')
        .setBaseMultiUUID('37C6324D-7034-430F-AA43-5CB3B1DB2EAF')
        .setAllMultiUUID('33F001E2-9C07-4FFB-8894-3340E5497DEE')
)

RegistryAttributeIdentifier(
    new AttributeUUIDModel('minecraft:generic.armor')
        .setBaseAddUUID('E358E610-DF23-4DD8-9431-30DB6E94319A')
        .setBaseMultiUUID('23E366D5-5EC3-44AA-8E83-231E809F7257')
        .setAllMultiUUID('CFEF9CB9-1A85-45E6-B195-5F0ADD2D1616')
)