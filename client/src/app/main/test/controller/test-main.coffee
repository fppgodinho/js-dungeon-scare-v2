describe 'ControllerMain', ->
    it 'Should be declared', -> expect(ControllerMain).exist;
    #
    describe 'An instance', ->
        data    =
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

        main    = new ControllerMain "STAGE", data
        it 'should have the id set to: "STAGE"',                        -> main.id.should.equal "STAGE"
        #
        main.id = "NOT STAGE";
        it 'should have the id not set to: "NOT STAGE"',                -> main.id.should.not.equal "NOT STAGE"
        #
        it 'should return the initial data with getData()',             -> main.getData().should.equal(data)
        it 'should return a ControllerCharacter with getMainChar()',    -> main.getMainChar().should.be.instanceof(ControllerCharacter)
    #
#