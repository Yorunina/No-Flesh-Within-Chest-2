// priority: 999
LeaderboardsEvents.registryLeaderboards(event => {
	event.register(
		new ResourceLocation('infinity:portals_opened_stat'),
		new LeaderboardFromStat(
			new ResourceLocation('infinity:portals_opened_stat'),
			Text.translatable('leaderboard.infinity.portals_opened_stat'),
			$InfinityStats.PORTALS_OPENED_STAT,
			false,
			LeaderboardFromStat.DEFAULT
		)
	)
	event.register(
		new ResourceLocation('infinity:dimensions_opened_stat'),
		new LeaderboardFromStat(
			new ResourceLocation('infinity:dimensions_opened_stat'),
			Text.translatable('leaderboard.infinity.dimensions_opened_stat'),
			$InfinityStats.DIMS_OPENED_STAT,
			false,
			LeaderboardFromStat.DEFAULT
		)
	)

	event.register(
		new ResourceLocation('infinity:worlds_destroyed_stat'),
		new LeaderboardFromStat(
			new ResourceLocation('infinity:worlds_destroyed_stat'),
			Text.translatable('leaderboard.infinity.worlds_destroyed_stat'),
			$InfinityStats.WORLDS_DESTROYED_STAT,
			false,
			LeaderboardFromStat.DEFAULT
		)
	)

	event.register(
		global.STAT_TETRA_CRAFT,
		new Leaderboard(
			global.STAT_TETRA_CRAFT,
			Text.translatable('leaderboard.kubejs.tetra_craft'),
			player => {
				return Text.of(player.getStats().getValue(global.STAT_TETRA_CRAFT).toFixed(0))
			},
			player => {
				return player.getStats().getValue(global.STAT_TETRA_CRAFT)
			},
			Comparator.comparingInt(player => player.getStats().getValue(global.STAT_TETRA_CRAFT)).reversed(),
			player => player.getStats().getValue(global.STAT_TETRA_CRAFT) > 0
		)
	)

	event.register(
		global.STAT_TETRA_CRAFT_GENESIS,
		new Leaderboard(
			global.STAT_TETRA_CRAFT_GENESIS,
			Text.translatable('leaderboard.kubejs.tetra_craft_genesis'),
			player => {
				return Text.of(player.getStats().getValue(global.STAT_TETRA_CRAFT_GENESIS).toFixed(0))
			},
			player => {
				return player.getStats().getValue(global.STAT_TETRA_CRAFT_GENESIS)
			},
			Comparator.comparingInt(player => player.getStats().getValue(global.STAT_TETRA_CRAFT_GENESIS)).reversed(),
			player => player.getStats().getValue(global.STAT_TETRA_CRAFT_GENESIS) > 0
		)
	)
})