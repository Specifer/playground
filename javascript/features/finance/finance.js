// Copyright 2020 Las Venturas Playground. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

import { FinancialCommands } from 'features/finance/financial_commands.js';
import { FinancialDispositionMonitor } from 'features/finance/financial_disposition_monitor.js';
import { FinancialNatives } from 'features/finance/financial_natives.js';
import { FinancialRegulator } from 'features/finance/financial_regulator.js';
import Feature from 'components/feature_manager/feature.js';

// Introduces everything related to the financial situation in San Andreas to the server. Maintains
// track of money, allows players to interact with it, and gives them a bank account.
export default class Finance extends Feature {
    commands_ = null;
    dispositionMonitor_ = null;
    natives_ = null;
    regulator_ = null;

    constructor() {
        super();

        // Responsible for doing the actual bookkeeping associated with in-game money.
        this.regulator_ = new FinancialRegulator();

        // The disposition monitor is responsible for keeping player state in sync with what the
        // regulator has in their books. It's not relevant when running tests.
        this.dispositionMonitor_ = new FinancialDispositionMonitor(this.regulator_);

        if (!server.isTest())
            this.dispositionMonitor_.monitor();

        // Pawn native functions to enable the other part of our gamemode to work with money.
        this.natives_ = new FinancialNatives(this.regulator_);

        // Commands that enable players to interact with their in-game money.
        this.commands_ = new FinancialCommands(this.regulator_);
    }

    dispose() {
        this.commands_.dispose();
        this.natives_.dispose();
        this.dispositionMonitor_.dispose();
        this.regulator_.dispose();
    }
}