"use strict"
gameData    =
    mainCharacter:
        images:     ["app/main/media/spritesheets/character.png"]
        frames:
            regX: 0
            regY: 0
            width: 32
            height: 32
            count: 12
        animations:
            south:      [0, 2]
            west:       [3, 5]
            east:       [6, 8]
            north:      [9, 11]
#
controller  = new ControllerMain "STAGE", gameData
