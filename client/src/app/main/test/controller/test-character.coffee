describe 'ControllerCharacter Class', ->
    it 'Should be declared', -> expect(ControllerCharacter).exist;
    #
    describe 'An instance', ->
        data        = {
            images:     ["app/main/media/spritesheets/character.png"],
            frames:     {regX: 0, regY: 0, width: 32, height: 32, count: 12},
            framerate:  1,
            animations: {
                south:      [0, 2],
                west:       [3, 5],
                east:       [6, 8],
                north:      [9, 11]
            }
        }
        #
        character   = new ControllerCharacter(data);
        #
        it 'should return the initial data with getData()', -> character.getData().should.equal(data)
        it 'should have property "x"',                      -> character.should.have.property("x")
        it 'should have property "y"',                      -> character.should.have.property("y")
        it 'should have property "currentFrame"',           -> character.should.have.property("currentFrame")
        it 'should have property "currentAnimation"',       -> character.should.have.property("currentAnimation")
        it 'should respond to "gotoAndPlay"',               -> character.should.respondTo("gotoAndPlay")
        it 'should respond to "advance"',                   -> character.should.respondTo("advance")
        #
        describe 'When running animation "north" after 5.5 seconds', ->
            character.gotoAndPlay("north")
            character.advance(5.5 * 1000)
            #
            it 'should be using the "north" animation',     -> character.should.have.property("currentAnimation", "north")
            it 'should have "currentFrame" set to 11',      -> character.currentFrame.should.equal(11)


