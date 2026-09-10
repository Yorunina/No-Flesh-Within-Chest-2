// priority: 999
MAAEvents.registryLeaderboards(event => {
	event.registerByLeaderboard(
		new ResourceLocation('infinity:portals_opened_stat'),
		new LeaderboardFromStat(
			new ResourceLocation('infinity:portals_opened_stat'),
			Text.translatable('leaderboard.infinity.portals_opened_stat'),
			$InfinityStats.PORTALS_OPENED_STAT,
			false,
			StatFormatters.DEFAULT
		)
	)
	event.registerByLeaderboard(
		new ResourceLocation('infinity:dimensions_opened_stat'),
		new LeaderboardFromStat(
			new ResourceLocation('infinity:dimensions_opened_stat'),
			Text.translatable('leaderboard.infinity.dimensions_opened_stat'),
			$InfinityStats.DIMS_OPENED_STAT,
			false,
			StatFormatters.DEFAULT
		)
	)

	event.registerByLeaderboard(
		new ResourceLocation('maa:crops_planted'),
		new LeaderboardFromStat(
			new ResourceLocation('maa:crops_planted'),
			Text.translatable('leaderboard.maa.crops_planted'),
			MAAStats.CROPS_PLANTED_STAT,
			false,
			StatFormatters.DEFAULT
		)
	)

	event.registerByLeaderboard(
		new ResourceLocation('maa:exavate_times'),
		new LeaderboardFromStat(
			new ResourceLocation('maa:exavate_times'),
			Text.translatable('leaderboard.maa.exavate_times'),
			MAAStats.EXCAVATE_TIMES_STAT,
			false,
			StatFormatters.DEFAULT
		)
	)

	event.registerByLeaderboard(
		new ResourceLocation('infinity:worlds_destroyed_stat'),
		new LeaderboardFromStat(
			new ResourceLocation('infinity:worlds_destroyed_stat'),
			Text.translatable('leaderboard.infinity.worlds_destroyed_stat'),
			$InfinityStats.WORLDS_DESTROYED_STAT,
			false,
			StatFormatters.DEFAULT
		)
	)

	event.registerByLeaderboard(
		global.STAT_TETRA_CRAFT,
		new LeaderboardFromStat(
			global.STAT_TETRA_CRAFT,
			Text.translatable('leaderboard.kubejs.tetra_craft'),
			Stats.CUSTOM.get(global.STAT_TETRA_CRAFT),
			false,
			StatFormatters.DEFAULT
		)
	)

	event.registerByLeaderboard(
		global.STAT_GROWTH_VAT_RUNS,
		new LeaderboardFromStat(
			global.STAT_GROWTH_VAT_RUNS,
			Text.translatable('leaderboard.kubejs.growth_vat_runs'),
			Stats.CUSTOM.get(global.STAT_GROWTH_VAT_RUNS),
			false,
			StatFormatters.DEFAULT
		)
	)

	event.registerByLeaderboard(
		global.STAT_TETRA_CRAFT_GENESIS,
		new LeaderboardFromStat(
			global.STAT_TETRA_CRAFT_GENESIS,
			Text.translatable('leaderboard.kubejs.tetra_craft_genesis'),
			Stats.CUSTOM.get(global.STAT_TETRA_CRAFT_GENESIS),
			false,
			StatFormatters.DEFAULT
		)
	)

})
