// priority: 501
const GatewayDefaultBossEventSettings = new GatewayBossEventSettings(GatewayBossEventSettingsMode.BOSS_BAR, true)
const GatewayDefaultRule = new GatewayRules(8, 32, true, true, false, true, false, 0, 32, 0)
const GatewayAwakeStoneLevelMap = {
    'kubejs:gateways_awake_stone_1': 0,
    'kubejs:gateways_awake_stone_2': 1,
    'kubejs:gateways_awake_stone_3': 3,
    'kubejs:gateways_awake_stone_4': 5,
    'kubejs:gateways_awake_stone_5': -1,
    'kubejs:gateways_awake_stone_6': -3,
    'kubejs:gateways_awake_stone_7': -5,
    'kubejs:gateways_awake_stone_8': 20,
    'kubejs:gateways_awake_stone_9': -20,
}
const GatewayColorMapping = new PiecewiseMappingModel().addPiece(0, 10, Color.GREEN).addPiece(10, 20, Color.YELLOW).addPiece(20, 30, Color.RED).addPiece(30, 40, Color.LIGHT_PURPLE).addPiece(40, 50, Color.DARK_PURPLE).addPiece(50, 60, Color.AQUA)

const GatewaySizeMapping = new PiecewiseMappingModel().addPiece(0, 20, GatewaySize.SMALL).addPiece(20, 50, GatewaySize.MEDIUM).addPiece(50, 100, GatewaySize.LARGE)

const GatewayWaveCountMapping = new PiecewiseMappingModel().addPiece(0, 20, 3).addPiece(20, 40, 5).addPiece(40, 60, 10)
