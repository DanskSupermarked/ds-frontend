describe('ds.components.storeLocator.controller', function() {

    before(function(done) {
        $.getJSON('test/assets/ds.components.store-locator.stores.json').done(function(data) {
            ds.components.storeLocator.controller.init({
                data: data
            });
            done();
        });
    });

    afterEach(function() {
        ds.components.storeLocator.controller.removeAllListeners();
    });

    describe('.zoomTo(address:{string}', function() {
        it('should emit an "map:bounds" event when zoom result is retrieved', function(done) {
            ds.components.storeLocator.controller.on('map:bounds', function(bounds) {
                expect(bounds).to.be.an('object');
                done();
            });
            ds.components.storeLocator.controller.on('search:failed', function() {
                done('"search:failed" should not have been called on a valid query');
            });
            ds.components.storeLocator.controller.zoomTo('DK');
        });
    });

    describe('.search(coords:{object})', function() {
        it('should emit an "seach:succeeded" event with the coords for search coordinates', function(done) {
            var searchCoords = {
                latitude: 10,
                longitude: 10
            };
            ds.components.storeLocator.controller.on('search:succeeded', function(resultCoords) {
                expect(resultCoords).to.eql(searchCoords);
                done();
            });
            ds.components.storeLocator.controller.search(searchCoords);
        });
    });

    describe('.search(query:{string})', function() {
        it('should emit an "seach:succeeded" event with the coords for search query', function(done) {
            ds.components.storeLocator.controller.on('search:succeeded', function(resultCoords) {
                expect(resultCoords.latitude).to.be.closeTo(56.11, 0.2);
                expect(resultCoords.longitude).to.be.closeTo(10.17, 0.2);
                done();
            });
            ds.components.storeLocator.controller.on('search:failed', function() {
                done('"search:failed" should not have been called on a valid query');
            });
            ds.components.storeLocator.controller.search('bjødstrupvej 18, holme, denmark');
        });

        it('should emit an "seach:failed" event with the search query when to coordinates can be found', function(done) {
            var invalidQuery = 'this is not a valid query';
            ds.components.storeLocator.controller.on('search:failed', function(response) {
                expect(response).to.equal(invalidQuery);
                done();
            });
            ds.components.storeLocator.controller.on('search:succeeded', function() {
                done('"search:succeeded" should not have been called on an invalid query');
            });
            ds.components.storeLocator.controller.search(invalidQuery);
        });
    });

    describe('.injectSettings(settings:{object})', function() {
        describe('countryCode', function() {
            it('should restrict search result to a specific country', function(done) {
                var restricted = false;
                ds.components.storeLocator.controller.on('search:failed', function() {
                    done('"search:failed" should not have been called on a valid query');
                });
                ds.components.storeLocator.controller.on('search:succeeded', function(resultCoords) {
                    if (restricted) {
                        // Paris in Denmark
                        expect(resultCoords.latitude).to.be.closeTo(56.51, 1);
                        expect(resultCoords.longitude).to.be.closeTo(8.49, 1);

                        // Clean up
                        ds.components.storeLocator.controller.injectSettings({
                            countryCode: null
                        });
                        done();
                    } else {
                        // Paris in France
                        expect(resultCoords.latitude).to.be.closeTo(48.86, 1);
                        expect(resultCoords.longitude).to.be.closeTo(2.35, 1);
                        ds.components.storeLocator.controller.injectSettings({
                            countryCode: 'DK'
                        });
                        restricted = true;
                        ds.components.storeLocator.controller.search('paris');
                    }
                });
                ds.components.storeLocator.controller.search('paris');
            });
        });
    });
});
