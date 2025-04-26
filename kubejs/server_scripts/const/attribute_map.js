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
RegistryAttributeIdentifier(
    new AttributeUUIDModel('forge:entity_reach')
        .setBaseAddUUID('BDC7EBCB-59E5-4E10-B23D-3B0A351B6575')
        .setBaseMultiUUID('86B4A1E2-3DEA-4DC5-A535-23D9E8E4E54E')
        .setAllMultiUUID('45B04EC4-C91D-4478-8E9B-525F43FD42A1')
)

RegistryAttributeIdentifier(
    new AttributeUUIDModel('forge:block_reach')
        .setBaseAddUUID('759A3C54-1254-41C9-8D09-0064A4E3E5AA')
        .setBaseMultiUUID('E7EC2C15-A021-492D-B494-6708421830A0')
        .setAllMultiUUID('76BD2CE3-51E9-47E6-B597-F12C9490D1C4')
)