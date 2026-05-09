// priority: 500
// 阻止玩家创建Party和加入Patry，但这人会允许创建ServerTeam
MAAEvents.ftbPlayerJoinParty(event => {
    event.cancel()
})

MAAEvents.ftbCreateParty(event => {
    event.cancel()
})
// 现在不允许创建ServerTeam了
MAAEvents.ftbCreateServerTeam(event => {
    event.cancel()
})