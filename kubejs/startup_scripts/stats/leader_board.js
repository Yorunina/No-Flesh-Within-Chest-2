// priority: 999
LeaderboardsEvents.registryLeaderboards(event => {
	event.registerByLeaderboard(
		new ResourceLocation('infinity:portals_opened_stat'),
		new LeaderboardFromStat(
			new ResourceLocation('infinity:portals_opened_stat'),
			Text.translatable('leaderboard.infinity.portals_opened_stat'),
			$InfinityStats.PORTALS_OPENED_STAT,
			false,
			LeaderboardFromStat.DEFAULT
		)
	)
	event.registerByLeaderboard(
		new ResourceLocation('infinity:dimensions_opened_stat'),
		new LeaderboardFromStat(
			new ResourceLocation('infinity:dimensions_opened_stat'),
			Text.translatable('leaderboard.infinity.dimensions_opened_stat'),
			$InfinityStats.DIMS_OPENED_STAT,
			false,
			LeaderboardFromStat.DEFAULT
		)
	)

	event.registerByLeaderboard(
		new ResourceLocation('maa:exavate_times'),
		new LeaderboardFromStat(
			new ResourceLocation('maa:exavate_times'),
			Text.translatable('leaderboard.maa.exavate_times'),
			MAAStats.EXCAVATE_TIMES_STAT,
			false,
			LeaderboardFromStat.DEFAULT
		)
	)

	event.registerByLeaderboard(
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

	event.register(
		global.STAT_GROWTH_VAT_RUNS,
		Text.translatable('leaderboard.kubejs.growth_vat_runs'),
		player => {
			return Text.of(player.getStats().getValue(global.STAT_GROWTH_VAT_RUNS).toFixed(0))
		},
		player => {
			return player.getStats().getValue(global.STAT_GROWTH_VAT_RUNS)
		},
		Comparator.comparingInt(player => player.getStats().getValue(global.STAT_GROWTH_VAT_RUNS)).reversed(),
		player => player.getStats().getValue(global.STAT_GROWTH_VAT_RUNS) > 0
	)

	event.register(
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

	event.register(
		global.STAT_FINAL_TIMER,
		Text.translatable('leaderboard.kubejs.final_timer'),
		player => {
			return Text.of(player.getStats().getValue(global.STAT_FINAL_TIMER).toFixed(0))
		},
		player => {
			return player.getStats().getValue(global.STAT_FINAL_TIMER)
		},
		Comparator.comparingInt(player => player.getStats().getValue(global.STAT_FINAL_TIMER)).reversed(),
		player => player.getStats().getValue(global.STAT_FINAL_TIMER) > 0
	)
})