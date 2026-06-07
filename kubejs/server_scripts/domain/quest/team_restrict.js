// priority: 500
// #组队 #联机 #队伍 #FTBQuest #FTBTeam
// 最新设计中，已采用gamerule控制，该方案废弃
// 阻止玩家创建Party和加入Patry，但这人会允许创建ServerTeam
// MAAEvents.ftbPlayerJoinParty(event => {
//     event.cancel()
// })
// // 阻止玩家邀请
// MAAEvents.ftbPlayerInviteParty(event => {
//     event.cancel()
// })

// 允许声明盟友

// MAAEvents.ftbCreateParty(event => {
//     event.cancel()
// })
// 现在不允许创建ServerTeam了
// MAAEvents.ftbCreateServerTeam(event => {
//     event.cancel()
// })