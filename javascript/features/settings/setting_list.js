// Copyright 2016 Las Venturas Playground. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

import { Setting } from 'entities/setting.js';

export const kSettingList = [
    /** Abuse related settings */
    new Setting('abuse', 'announce_admin_animation', Setting.TYPE_BOOLEAN, true, 'Announce when admins force animations on other players.'),
    new Setting('abuse', 'blocker_damage_issued_time', Setting.TYPE_NUMBER, 10, 'Number of seconds to block actions after issuing damage.'),
    new Setting('abuse', 'blocker_damage_taken_time', Setting.TYPE_NUMBER, 10, 'Number of seconds to block actions after having taken damage.'),
    new Setting('abuse', 'blocker_weapon_fire_time', Setting.TYPE_NUMBER, 10, 'Number of seconds to block actions after firing your weapon.'),
    new Setting('abuse', 'detector_cleo_dmage', Setting.TYPE_BOOLEAN, false, 'Should the CLEO Dmage detector be enabled?'),
    new Setting('abuse', 'detector_cleo_dmage_sample_rate', Setting.TYPE_NUMBER, 5, 'Sample rate for the CLEO Dmage detector'),
    new Setting('abuse', 'detector_cleo_proaim', Setting.TYPE_BOOLEAN, false, 'Should the CLEO Pro-Aim detector be enabled?'),
    new Setting('abuse', 'detector_illegal_vehicle_entry', Setting.TYPE_BOOLEAN, true, 'Should the illegal vehicle entry detector be enabled?'),
    new Setting('abuse', 'ignore_sole_passenger_damage', Setting.TYPE_BOOLEAN, true, 'Ignore damage done by sole vehicle passengers?'),
    new Setting('abuse', 'kick_reason_public', Setting.TYPE_BOOLEAN, true, 'Whether kick reasons should be shared publicly.'),
    new Setting('abuse', 'kill_attribution_time_sec', Setting.TYPE_NUMBER, 10, 'Time after last hit when deaths should be attributed for.'),
    new Setting('abuse', 'pawn_based_detectors', Setting.TYPE_BOOLEAN, true, 'Enable the Pawn-based abuse detectors?'),
    new Setting('abuse', 'spawn_vehicle_admin_override', Setting.TYPE_BOOLEAN, true, 'Should administrators override vehicle spawning restrictions?'),
    new Setting('abuse', 'spawn_vehicle_throttle_time', Setting.TYPE_NUMBER, 180, 'Minimum number of seconds between spawning two vehicles.'),
    new Setting('abuse', 'teleportation_admin_override', Setting.TYPE_BOOLEAN, true, 'Should administrators override teleportation restrictions?'),
    new Setting('abuse', 'teleportation_throttle_time', Setting.TYPE_NUMBER, 180, 'Minimum number of seconds between teleporting twice.'),
    new Setting('abuse', 'warning_report_limit', Setting.TYPE_NUMBER, 3, 'Number of types to report a specific abuse type for a player.'),

    /** Account related settings */
    new Setting('account', 'info_visibility', Setting.TYPE_BOOLEAN, true, 'Should players be able to see information about their account?'),
    new Setting('account', 'nickname_control', Setting.TYPE_BOOLEAN, true, 'Should players be able to change their nickname?'),
    new Setting('account', 'nickname_limit_days', Setting.TYPE_NUMBER, 14, 'Minimum number of days between nickname changes.'),
    new Setting('account', 'password_control', Setting.TYPE_BOOLEAN, true, 'Should players be able to change their password?'),
    new Setting('account', 'password_admin_joke', Setting.TYPE_BOOLEAN, true, 'Should we display fake password changes to admins?'),
    new Setting('account', 'record_visibility', Setting.TYPE_BOOLEAN, true, 'Should players be able to access their record?'),
    new Setting('account', 'record_page_count', Setting.TYPE_NUMBER, 30, 'Maximum number of record entries to display per page.'),
    new Setting('account', 'session_count', Setting.TYPE_NUMBER, 30, 'Maximum number of recent sessions to display.'),
    new Setting('account', 'session_page_count', Setting.TYPE_NUMBER, 50, 'Maximum number of sessions to display per page.'),
    new Setting('account', 'session_visibility', Setting.TYPE_BOOLEAN, true, 'Should players be able to see their recent sessions?'),
    new Setting('account', 'vip_alias_control', Setting.TYPE_BOOLEAN, true, 'Should VIPs be able to manage their aliases?'),
    new Setting('account', 'vip_alias_limit_admin', Setting.TYPE_NUMBER, 5, 'Maximum number of aliases admins are able to create.'),
    new Setting('account', 'vip_alias_limit_player', Setting.TYPE_NUMBER, 2, 'Maximum number of aliases VIPs are able to create.'),
    new Setting('account', 'vip_alias_limit_days', Setting.TYPE_NUMBER, 7, 'Minimum number of days between alias additions.'),

    /** Decoration related settings */
    new Setting('decorations', 'christmas_decorations', Setting.TYPE_BOOLEAN, false, 'Should The Strip be in a Christmas-y mood?'),
    new Setting('decorations', 'fantasy_island', Setting.TYPE_BOOLEAN, false, 'Is this the time for some fantasy?'),
    new Setting('decorations', 'gunther', Setting.TYPE_BOOLEAN, true, 'Should Gunther be guarding over the Pirate Ship?'),
    new Setting('decorations', 'holidays_free_vip', Setting.TYPE_BOOLEAN, false, 'Should players receive VIP rights upon logging in?'),
    new Setting('decorations', 'los_santos_winter', Setting.TYPE_BOOLEAN, false, 'Should Los Santos be covered in snow?'),
    new Setting('decorations', 'objects_pirate_party', Setting.TYPE_BOOLEAN, false, 'Should the Pirate Ship Party decorations be enabled?'),
    new Setting('decorations', 'pilots', Setting.TYPE_BOOLEAN, false, 'Should the pilots by flying around San Andreas?'),
    new Setting('decorations', 'san_ferro_road_works', Setting.TYPE_BOOLEAN, false, 'Enable road works near the San Fierro bridge?'),
    new Setting('decorations', 'vip_room', Setting.TYPE_BOOLEAN, true, 'Should the VIP room be stocked with objects?'),
    new Setting('decorations', 'dft_400', Setting.TYPE_BOOLEAN, true, 'Should the DFT be a party car?'),
    new Setting('decorations', 'horny_infernus', Setting.TYPE_BOOLEAN, true, 'The infernus will become horny!'),
    new Setting('decorations', 'dildo_sultan', Setting.TYPE_BOOLEAN, true, 'Sultans will be weaponized with a dildo.'),

    /** Financial related settings */
    new Setting('financial', 'community_contribution_cycle_sec', Setting.TYPE_NUMBER, 300, 'How often should contributions be collected (seconds)?'),
    new Setting('financial', 'community_contribution_guest_base', Setting.TYPE_NUMBER, 300000, 'Starting at what wealth level should guests contribute?'),
    new Setting('financial', 'community_contribution_guest_pct', Setting.TYPE_NUMBER, 5, 'What percentage of cash should guests contribute?'),
    new Setting('financial', 'community_contribution_player_base', Setting.TYPE_NUMBER, 1000000, 'Starting at what wealth level should players contribute?'),
    new Setting('financial', 'community_contribution_player_pct', Setting.TYPE_NUMBER, 4, 'What percentage of cash should registered players contribute?'),
    new Setting('financial', 'community_contribution_vip_base', Setting.TYPE_NUMBER, 2500000, 'Starting at what wealth level should VIPs contribute?'),
    new Setting('financial', 'community_contribution_vip_pct', Setting.TYPE_NUMBER, 3, 'What percentage of cash should VIPs contribute?'),
    new Setting('financial', 'spawn_money', Setting.TYPE_NUMBER, 10000, 'How much money should a player get when they spawn?'),

    /** Game-related settings */
    new Setting('games', 'registration_expiration_sec', Setting.TYPE_NUMBER, 20, 'After how many seconds does a game registration expire?'),

    /** Gang-related settings */
    new Setting('gangs', 'account_transaction_count', Setting.TYPE_NUMBER, 50, 'Maximum number of transactions to fetch from the database.'),
    new Setting('gangs', 'account_transaction_page_count', Setting.TYPE_NUMBER, 25, 'Maximum number of transactions to display on a single page.'),
    new Setting('gangs', 'member_page_count', Setting.TYPE_NUMBER, 25, 'Maximum number of members to display on a single page.'),
    new Setting('gangs', 'zones_area_bonus_medium_count', Setting.TYPE_NUMBER, 8, 'Number of active members in an area to get the medium-gang bonus.'),
    new Setting('gangs', 'zones_area_bonus_medium_units', Setting.TYPE_NUMBER, 20, 'Area bonus, in map units, applied to medium-sized gang areas.'),
    new Setting('gangs', 'zones_area_bonus_large_count', Setting.TYPE_NUMBER, 15, 'Number of active members in an area to get the large-gang bonus.'),
    new Setting('gangs', 'zones_area_bonus_large_units', Setting.TYPE_NUMBER, 20, 'Area bonus, in map units, applied to large-sized gang areas.'),
    new Setting('gangs', 'zones_area_bonus_vip_units', Setting.TYPE_NUMBER, 1, 'Area bonus, in map units, awarded for each VIP that owns a house.'),
    new Setting('gangs', 'zones_area_limit', Setting.TYPE_NUMBER, 4, 'Maximum number of areas owned by a gang.'),
    new Setting('gangs', 'zones_area_mean_shift_bandwidth', Setting.TYPE_NUMBER, 40, 'Bandwidth used for the mean shift algorithm\'s kernel.'),
    new Setting('gangs', 'zones_area_min_members', Setting.TYPE_NUMBER, 5, 'How many members need to be in a particular area for it to be a zone?'),
    new Setting('gangs', 'zones_area_padded_percentage', Setting.TYPE_NUMBER, 20, 'Percentage of padding applied over the strictly enclosing area.'),
    new Setting('gangs', 'zones_area_viable_edge_length', Setting.TYPE_NUMBER, 50, 'Target edge length of each side of a viable area.'),
    new Setting('gangs', 'zones_area_viable_shape_threshold', Setting.TYPE_NUMBER, 50, 'Ratio threshold (*100) for maintaining an area shape.'),
    new Setting('gangs', 'zones_area_viable_shape_adjust', Setting.TYPE_NUMBER, 22, 'Percentage of area to shift w/h to maintain area shape.'),

    /** Limits-related settings */
    new Setting('limits', 'deathmatch_damage_issued_cooldown', Setting.TYPE_NUMBER, 10, 'Number of seconds to block actions after issuing damage.'),
    new Setting('limits', 'deathmatch_damage_taken_cooldown', Setting.TYPE_NUMBER, 10, 'Number of seconds to block actions after having taken damage.'),
    new Setting('limits', 'deathmatch_weapon_fired_cooldown', Setting.TYPE_NUMBER, 10, 'Number of seconds to block actions after firing your weapon.'),

    /** Playground related settings */
    new Setting('playground', 'enable_beta_features', Setting.TYPE_BOOLEAN, false, 'Enables beta server functionality.'),
    new Setting('playground', 'collectable_hint_price_min', Setting.TYPE_NUMBER, 25000, 'Minimum price for a hint towards the closest collectable'),
    new Setting('playground', 'collectable_hint_price_max', Setting.TYPE_NUMBER, 5000000, 'Maximum price for a hint towards the closest collectable'),
    new Setting('playground', 'collectable_map_icons_display', Setting.TYPE_BOOLEAN, false, 'Should collectables be displayed on the map?'),
    new Setting('playground', 'collectable_map_icons_distance', Setting.TYPE_NUMBER, 500, 'Distance from which collectable map icons will be visible.'),
    new Setting('playground', 'collectable_reset_require_complete', Setting.TYPE_BOOLEAN, true, 'Only allow resetting collectables when you collected all?'),
    new Setting('playground', 'gunther_help_interval_sec', Setting.TYPE_NUMBER, 300, 'At which interval should Gunther issue helpful /show commands?'),
    new Setting('playground', 'leaderboard_default_view', Setting.TYPE_STRING, 'none', 'Default view to show when someone uses the /top command.'),
    new Setting('playground', 'leaderboard_limit_days', Setting.TYPE_NUMBER, 4, 'Number of days of history the leaderboards should consider.'),
    new Setting('playground', 'leaderboard_limit_entries', Setting.TYPE_NUMBER, 25, 'Number of entries that should be shown on the leaderboard.'),
    new Setting('playground', 'leaderboard_page_count', Setting.TYPE_NUMBER, 25, 'Number of entries to show per page on the leaderboard.'),
    new Setting('playground', 'notification_display_time_sec', Setting.TYPE_NUMBER, 5, 'Number of seconds for which a notification should be displayed.'),
    new Setting('playground', 'reaction_test_multiplication_pct', Setting.TYPE_NUMBER, 25, 'What percentage of calculation tests should be multiplication?'),
    new Setting('playground', 'reaction_test_delay_sec', Setting.TYPE_NUMBER, 270, 'Average time between reaction tests.'),
    new Setting('playground', 'reaction_test_expire_sec', Setting.TYPE_NUMBER, 300, 'After how many seconds does a reaction test expire?'),
    new Setting('playground', 'reaction_test_jitter_sec', Setting.TYPE_NUMBER, 150, 'Jitter to apply to the delay to reduce predictability.'),
    new Setting('playground', 'reaction_test_prize', Setting.TYPE_NUMBER, 5000, 'How much money will a player get for winning a reaction test?'),
    new Setting('playground', 'reaction_test_random_length_max', Setting.TYPE_NUMBER, 11, 'Maximum length of random-string reaction tests.'),
    new Setting('playground', 'reaction_test_random_length_min', Setting.TYPE_NUMBER, 7, 'Minimum length of random-string reaction tests.'),
    new Setting('playground', 'reaction_test_remember_delay_sec', Setting.TYPE_NUMBER, 150, 'How much delay should the remember tests wait for?'),
    new Setting('playground', 'reaction_test_remember_jitter_sec', Setting.TYPE_NUMBER, 90, 'How much jitter should be applied to the remember tests?'),
    new Setting('playground', 'reaction_test_unscramble_fixed', Setting.TYPE_NUMBER, 20, 'Percentage of letters that will not be moved [0-100].'),

    /** Radio related settings */
    new Setting('radio', 'default_channel', Setting.TYPE_STRING, 'LVP Radio', 'Name of the default radio channel.'),
    new Setting('radio', 'enabled', Setting.TYPE_BOOLEAN, true, 'Should the radio feature be enabled?'),
    new Setting('radio', 'restricted_to_vehicles', Setting.TYPE_BOOLEAN, true, 'Should the radio feature be restricted to players in vehicles?'),

    /** Vehicle related settings */
    new Setting('vehicles', 'drifting_enabled', Setting.TYPE_BOOLEAN, false, 'Enables experimental drifting features on the server.'),
    new Setting('vehicles', 'drifting_max_angle', Setting.TYPE_NUMBER, 82.5, 'Maximum drifting angle to award points for, to ignore spins.'),
    new Setting('vehicles', 'drifting_min_angle', Setting.TYPE_NUMBER, 14, 'Minimum drifting angle to award points for.'),
    new Setting('vehicles', 'drifting_min_speed', Setting.TYPE_NUMBER, 50, 'Minimum speed in km/h before awarding points for a drift.'),
    new Setting('vehicles', 'respawn_death_delay_sec', Setting.TYPE_NUMBER, 60, 'Number of seconds a vehicle should respawn after its death.'),
    new Setting('vehicles', 'respawn_ephemeral_delay_sec', Setting.TYPE_NUMBER, 60, 'Number of seconds after which ephemeral vehicles should respawn.'),
    new Setting('vehicles', 'respawn_persistent_delay_sec', Setting.TYPE_NUMBER, 180, 'Number of seconds after last usage for vehicles to respawn.'),
    new Setting('vehicles', 'streamer_interval_ms', Setting.TYPE_NUMBER, 1000, 'Interval at which the vehicle streamer runs, in milliseconds.'),
    new Setting('vehicles', 'streamer_max_distance', Setting.TYPE_NUMBER, 300, 'Maximum streaming distance before creating vehicles for a player.'),
    new Setting('vehicles', 'streamer_max_visible', Setting.TYPE_NUMBER, 1000, 'How many vehicles should at most be visible on the server?'),
    new Setting('vehicles', 'vehicle_limit_administrator', Setting.TYPE_NUMBER, 5, 'Maximum number of vehicles administrators are allowed to create.'),
    new Setting('vehicles', 'vehicle_limit_player', Setting.TYPE_NUMBER, 1, 'Maximum number of vehicles players are allowed to create.'),
];
