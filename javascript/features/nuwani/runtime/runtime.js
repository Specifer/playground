// Copyright 2020 Las Venturas Playground. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

import { Bot } from 'features/nuwani/runtime/bot.js';

// Observer for the |Runtime| class. Objects that wish to observe connection state for the bots
// must extend the following class, which gives it default behaviour.
export class RuntimeObserver {
    onBotConnected(bot) {}
    onBotMessage(bot, message) {}
    onBotDisconnected(bot) {}
}

// Provides the core runtime of the IRC system: maintains the individual Bot instances and routes
// incoming messages and commands to the appropriate place.
export class Runtime {
    configuration_ = null;

    activeBots_ = null;
    availableBots_ = null;

    observers_ = null;

    // Gives access to the master bot. It's always active, even when it might not be connected
    // right now due to connectivity issues.
    get masterBot() {
        for (const bot of this.activeBots_.values()) {
            if (bot.config.master)
                return bot;
        }

        return null;
    }

    // Gives access to the bots that are part of this runtime.
    get activeBots() { return this.activeBots_; }
    get availableBots() { return this.availableBots_; }

    constructor(configuration, BotConstructor = Bot) {
        this.configuration_ = configuration;
        this.observers_ = new Set();

        this.activeBots_ = new Set();
        this.availableBots_ = new Set();

        const { servers, channels } = configuration;

        for (const config of this.configuration_.bots) {
            const bot = new BotConstructor(this, config, servers, channels);

            if (config.master || !config.optional)
                this.activeBots_.add(bot);
            else
                this.availableBots_.add(bot);
        }
    }

    // Initialize each of the bots listed in the configuration as non-optional, as well as the
    // master bot. The other, available bots can be spun up as required.
    connect() {
        for (const bot of this.activeBots_.values())
            bot.connect();
    }

    // Called by the message distributor when messages are being dropped because the command rate is
    // too high. An extra slave would be able to help out. Adding a slave is at our discretion.
    requestSlaveIncrease() {
        for (const bot of this.availableBots_.values()) {
            this.availableBots_.delete(bot);
            this.activeBots_.add(bot);

            bot.connect();
            return;
        }
    }

    // Called by the message distributor when the bot command rate is sufficiently low to be able to
    // get by with a slave less. The runtime can decide whether to honour this request.
    requestSlaveDecrease() {
        for (const bot of this.activeBots_.values()) {
            if (bot.config.master || !bot.config.optional)
                continue;
            
            this.activeBots_.delete(bot);
            this.availableBots_.add(bot);

            bot.disconnect();
            return;
        }
    }

    // Disconnect all the bots from the network. All optional bots will also be placed in the set of
    // available bots again, as this is considered a sizeable reset of the system.
    diconnect() {
        for (const bot of this.activeBots_.values()) {
            if (!bot.config.master && bot.config.optional) {
                this.activeBots_.delete(bot);
                this.availableBots_.add(bot);
            }

            bot.disconnect();
        }
    }

    // Adds the given |observer| to the list of observers for bot connectivity. Must extend the
    // RuntimeObserver interface.
    addObserver(observer) {
        if (!(observer instanceof RuntimeObserver))
            throw new Error('The given |observer| does not extend RuntimeObserver.');

        this.observers_.add(observer);
    }

    removeObserver(observer) {
        this.observers_.delete(observer);
    }

    // ---------------------------------------------------------------------------------------------
    // BotDelegate implementation:

    // Called when the |bot| has connected, finished registration and is ready for use.
    onBotConnected(bot) {
        if (!this.observers_)
            throw new Error('Invalid call to onBotConnected: instance has been disposed of.');

        for (const observer of this.observers_)
            observer.onBotConnected(bot);
    }

    // Called when the |bot| has received a message. All response is optional.
    onBotMessage(bot, message) {
        if (!this.observers_)
            throw new Error('Invalid call to onBotMessage: instance has been disposed of.');

        for (const observer of this.observers_)
            observer.onBotMessage(bot, message);
    }

    // Called when the |bot| has disconnected from the network.
    onBotDisconnected(bot) {
        if (!this.observers_)
            throw new Error('Invalid call to onBotDisconnected: instance has been disposed of.');

        for (const observer of this.observers_)
            observer.onBotDisconnected(bot);
    }

    // ---------------------------------------------------------------------------------------------

    dispose() {
        for (const bot of this.activeBots_.values())
            bot.dispose();
        
        for (const bot of this.availableBots_.values())
            bot.dispose();

        this.observers_.clear();
        this.observers_ = null;

        this.activeBots_.clear();
        this.availableBots_.clear();
    }
}
