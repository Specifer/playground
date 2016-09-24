// Copyright 2016 Las Venturas Playground. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

const Feature = require('components/feature_manager/feature.js');
const VehicleCommands = require('features/vehicles/vehicle_commands.js');
const VehicleManager = require('features/vehicles/vehicle_manager.js');

// The Vehicles feature is responsible for the features one might find around San Andreas. It allows
// all players to create vehicles on demand, administrators to store and modify them persistently.
// The vehicles will be created through the streamer, so there is no strict limit to them.
class Vehicles extends Feature {
    constructor() {
        super();

        // Used to add commands and vehicle access to the `/lvp access` console.
        const playground = this.defineDependency('playground', true /* isFunctional */);

        // Used to create and destroy the vehicles available on Las Venturas Playground.
        const streamer = this.defineDependency('streamer', true /* isFunctional */);

        this.manager_ = new VehicleManager(streamer);
        this.manager_.loadVehicles();

        this.commands_ = new VehicleCommands(this.manager_, playground);
    }

    // ---------------------------------------------------------------------------------------------
    // Public API of the vehicles feature.
    // ---------------------------------------------------------------------------------------------

    // TODO(Russell): Define the public API of the vehicles class.

    // ---------------------------------------------------------------------------------------------

    dispose() {
        this.commands_.dispose();
        this.commands_ = null;

        this.manager_.dispose();
        this.manager_ = null;
    }
}

exports = Vehicles;
