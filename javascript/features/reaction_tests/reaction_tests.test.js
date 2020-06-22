// Copyright 2020 Las Venturas Playground. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

import ReactionTests from 'features/reaction_tests/reaction_tests.js';
import { RememberStrategy } from 'features/reaction_tests/strategies/remember_strategy.js';
import Settings from 'features/settings/settings.js';

import * as achievements from 'features/collectables/achievements.js';

describe('ReactionTests', (it, beforeEach) => {
    /**
     * @type ReactionTests
     */
    let driver = null;

    /**
     * @type Player
     */
    let gunther = null;

    /**
     * @type Player
     */
    let lucy = null;

    /**
     * @type Settings
     */
    let settings = null;

    beforeEach(() => {
        driver = server.featureManager.loadFeature('reaction_tests');
        gunther = server.playerManager.getById(/* Gunther= */ 0);
        lucy = server.playerManager.getById(/* Lucy= */ 2);
        settings = server.featureManager.loadFeature('settings');

        // Have a a level of determinism in these tests to avoid flaky failures.
        driver.strategies_ = driver.strategies_.filter(strategyConstructor => {
            return strategyConstructor !== RememberStrategy;
        });
    });

    it('should be able to calculate delays in range of delay & jitter settings', assert => {
        const delay = settings.getValue('playground/reaction_test_delay_sec');
        const jitter = settings.getValue('playground/reaction_test_jitter_sec');

        const minimum = delay - jitter;
        const maximum = delay + jitter;

        for (let i = 0; i < 100; ++i) {
            assert.isAboveOrEqual(driver.calculateDelayForNextTest(), minimum);
            assert.isBelowOrEqual(driver.calculateDelayForNextTest(), maximum);
        }
    });

    it('should be able to determine a condition test based on player counts', assert => {
        const strategies = new Map();
        
        // Create a mapping of |minimumPlayerCount| => |strategies[]|
        for (const strategyConstructor of driver.strategies_) {
            if (!strategies.has(strategyConstructor.kMinimumPlayerCount))
                strategies.set(strategyConstructor.kMinimumPlayerCount, new Set());
            
            strategies.get(strategyConstructor.kMinimumPlayerCount).add(strategyConstructor);
        }

        // Mark all currently online players as NPCs so that they get ignored. This means that,
        // unless there are strategies that run with no players, none should be created.
        for (let player of server.playerManager)
            player.setIsNonPlayerCharacterForTesting(true);

        if (!strategies.has(0))
            assert.isNull(driver.createReactionTestStrategy());
        
        // For each of the player counts, determine that the particular strategy can be picked.
        let candidates = new Set();
        let connectedPlayers = 0;

        for (const [playerCount, strategyCandidates] of strategies) {
            while (connectedPlayers < playerCount) {
                dispatchEvent('playerconnect', {
                    playerid: 10 + (connectedPlayers++),
                });
            }

            for (const candidate of strategyCandidates) {
                candidates.add(candidate);
                while (true) {
                    if (driver.createReactionTestStrategy() instanceof candidate)
                        break;
                }
            }
        }

        assert.equal(candidates.size, driver.strategies_.length);
    });

    it('should enable players to win reaction tests', async (assert) => {
        const finance = server.featureManager.loadFeature('finance');

        const delay = settings.getValue('playground/reaction_test_delay_sec');
        const jitter = settings.getValue('playground/reaction_test_jitter_sec');
        const prize = settings.getValue('playground/reaction_test_prize');

        assert.equal(gunther.messages.length, 0);

        // Wait until we're certain that the first reaction test has started.
        await server.clock.advance((delay + jitter) * 1000);

        assert.equal(gunther.messages.length, 1);
        assert.equal(gunther.account.reactionTests, 0);
        assert.equal(finance.getPlayerCash(gunther), 0);
        
        // (1) The first player to give the right answer will be awarded the money.
        await server.clock.advance(2560);

        await gunther.issueMessage(driver.activeTest_.answer.toLowerCase());

        assert.equal(gunther.messages.length, 4);
        assert.includes(gunther.messages[1], 'in 2.56 seconds');
        assert.equal(gunther.messages[2], Message.format(Message.REACTION_TEST_WON, prize));
        assert.includes(gunther.messages[3], driver.activeTest_.answer.toLowerCase());

        assert.equal(gunther.account.reactionTests, 1);
        assert.equal(finance.getPlayerCash(gunther), prize);

        // (2) Subsequent players will receive a generic "too late!" message.
        assert.equal(lucy.messages.length, 3);

        await server.clock.advance(1230);

        await lucy.issueMessage(driver.activeTest_.answer);

        assert.equal(lucy.account.reactionTests, 0);
        assert.equal(lucy.messages.length, 4);
        assert.equal(
            lucy.messages[3], Message.format(Message.REACTION_TEST_TOO_LATE, gunther.name, 1.23));
    });

    it('should automatically schedule a new test after someone won', async (assert) => {
        const delay = settings.getValue('playground/reaction_test_delay_sec');
        const jitter = settings.getValue('playground/reaction_test_jitter_sec');

        assert.equal(gunther.messages.length, 0);

        // Wait until we're certain that the first reaction test has started.
        await server.clock.advance((delay + jitter) * 1000);
        await server.clock.advance(3000);  // three extra seconds

        assert.equal(gunther.messages.length, 1);

        await gunther.issueMessage(driver.activeTest_.answer);
        assert.equal(gunther.messages.length, 4);

        // Wait until we're certain that the next reaction test has started.
        await server.clock.advance((delay + jitter) * 1000);

        assert.equal(gunther.messages.length, 5);
    });

    it('should automatically schedule a new test after one times out', async (assert) => {
        const delay = settings.getValue('playground/reaction_test_delay_sec');
        const jitter = settings.getValue('playground/reaction_test_jitter_sec');
        const timeout = settings.getValue('playground/reaction_test_expire_sec');

        assert.equal(gunther.messages.length, 0);

        // Wait until we're certain that the first reaction test has started.
        await server.clock.advance((delay + jitter) * 1000);

        assert.equal(gunther.messages.length, 1);

        const answer = driver.activeTest_.answer;

        // Wait for the timeout. Giving the right answer thereafter will be ignored.
        await server.clock.advance(timeout * 1000);

        await gunther.issueMessage(answer);  // goes to main chat
        assert.equal(gunther.messages.length, 2);

        // Wait until we're certain that the next reaction test has started.
        await server.clock.advance((delay + jitter) * 1000);

        assert.equal(gunther.messages.length, 3);
    });

    it('should award achievements at certain milestones', async (assert) => {
        const collectables = server.featureManager.loadFeature('collectables');

        const delay = settings.getValue('playground/reaction_test_delay_sec');
        const jitter = settings.getValue('playground/reaction_test_jitter_sec');

        // (1) Achievement based on speed of answering.
        assert.isFalse(
            collectables.hasAchievement(gunther, achievements.kAchievementReactionTestSpeed));

        {
            await server.clock.advance((delay + jitter) * 1000);
            await gunther.issueMessage(driver.activeTest_.answer);  // instant answer
        }

        assert.isTrue(
            collectables.hasAchievement(gunther, achievements.kAchievementReactionTestSpeed));

        // (2) Achievements based on number of answered reaction tests.
        const kMilestones = new Map([
            [   10, achievements.kAchievementReactionTestBronze ],
            [  100, achievements.kAchievementReactionTestSilver ],
            [ 1000, achievements.kAchievementReactionTestGold ],
        ]);

        for (const [ milestone, achievement ] of kMilestones) {
            assert.isFalse(collectables.hasAchievement(gunther, achievement));

            gunther.account.reactionTests = milestone - 1;

            {
                await server.clock.advance((delay + jitter) * 1000);
                await gunther.issueMessage(driver.activeTest_.answer);  // instant answer
            }

            assert.equal(gunther.account.reactionTests, milestone);
            assert.isTrue(collectables.hasAchievement(gunther, achievement));
        }

        // (3) Achievement based on sequence of wins in a row.
        assert.isFalse(
            collectables.hasAchievement(gunther, achievements.kAchievementReactionTestSequence));

        for (let iteration = kMilestones.size; iteration <= 10; ++iteration) {
            await server.clock.advance((delay + jitter) * 1000);
            await gunther.issueMessage(driver.activeTest_.answer);  // instant answer
        }
        
        assert.isTrue(
            collectables.hasAchievement(gunther, achievements.kAchievementReactionTestSequence));
    });
});
