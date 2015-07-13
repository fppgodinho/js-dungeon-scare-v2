describe('ControllerMain', function () {

    describe('create()', function () {
        var main    = new ControllerMain("STAGE", {});

        it('should have id set to: "STAGE"', function () {
            main.should.have.property('id', "STAGE");
        });
    });
});