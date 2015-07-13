describe 'ControllerMain', ->
    describe 'create()', ->
        main    = new ControllerMain("STAGE", {});

        it 'should have id set to: "STAGE"', ->
            main.should.have.property 'id', "STAGE"
