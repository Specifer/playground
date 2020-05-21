// Copyright 2006-2017 Las Venturas Playground. All rights reserved.
// Use of this source code is governed by the GPLv2 license, a copy of which can
// be found in the LICENSE file.

// Provided by PlaygroundJS for updating JavaScript data.
native UpdatePlayerSyncedData(playerId, property, intValue, Float: floatValue, stringValue[]);

// Next ID: 3
enum PlayerSyncedDataProperty {
    ISOLATED = 1,
    MINIGAME_NAME = 2,
    PREFERRED_RADIO_CHANNEL = 0,
};

#define INVALID_INT 0
#define INVALID_FLOAT 0.0
#define INVALID_STRING ""

// Bridges between Pawn and JavaScript for a number of player-related settings. Changes to any of
// these values will be reflected in the JavaScript code, and vice versa.
class PlayerSyncedData <playerId (MAX_PLAYERS)> {
    new bool: m_isolated;
    new m_minigameName[32];
    new m_preferredRadioChannel[64];

    public reset() {
        m_isolated = false;
        m_minigameName[0] = 0;
        m_preferredRadioChannel[0] = 0;
    }

    // ---------------------------------------------------------------------------------------------

    public bool: isolated() {
        return m_isolated;
    }

    public setIsolated(bool: isolated) {
        m_isolated = isolated;
        this->sync(ISOLATED);
    }

    // ---------------------------------------------------------------------------------------------

    public inline minigameName() {
        return m_minigameName;
    }

    public inline hasMinigameName() {
        return (m_minigameName[0] != 0);
    }

    public setMinigameName(minigameName[]) {
        // Not meant to be set from Pawn, only from JavaScript.
    }

    // ---------------------------------------------------------------------------------------------

    public inline preferredRadioChannel() {
        return m_preferredRadioChannel;
    }

    public setPreferredRadioChannel(preferredRadioChannel[]) {
        format(m_preferredRadioChannel, sizeof(m_preferredRadioChannel), "%s", preferredRadioChannel);
        this->sync(PREFERRED_RADIO_CHANNEL);
    }

    // ---------------------------------------------------------------------------------------------

    public sync(PlayerSyncedDataProperty: property) {
        switch (property) {
            // Integral properties.
            case ISOLATED:
                UpdatePlayerSyncedData(playerId, _: property, m_isolated ? 1 : 0, INVALID_FLOAT, INVALID_STRING);

            // Textual properties.
            case MINIGAME_NAME:
                UpdatePlayerSyncedData(playerId, _: property, INVALID_INT, INVALID_FLOAT, m_minigameName);

            case PREFERRED_RADIO_CHANNEL:
                UpdatePlayerSyncedData(playerId, _: property, INVALID_INT, INVALID_FLOAT, m_preferredRadioChannel);
        }
    }

    public apply(PlayerSyncedDataProperty: property, intValue, Float: floatValue, stringValue[]) {
        switch (property) {
            case ISOLATED:
                m_isolated = !!intValue;

            case MINIGAME_NAME:
                format(m_minigameName, sizeof(m_minigameName), "%s", stringValue);

            case PREFERRED_RADIO_CHANNEL:
                format(m_preferredRadioChannel, sizeof(m_preferredRadioChannel), "%s", stringValue);
        }

        #pragma unused floatValue
    }
};

forward OnPlayerSyncedDataChange(playerId, property, intValue, Float: floatValue, stringValue[]);
public OnPlayerSyncedDataChange(playerId, property, intValue, Float: floatValue, stringValue[]) {
    if (!Player(playerId)->isConnected())
        return;

    PlayerSyncedData(playerId)->apply(PlayerSyncedDataProperty: property, intValue, floatValue, stringValue);
}

#undef INVALID_INT
#undef INVALID_FLOAT
#undef INVALID_STRING
