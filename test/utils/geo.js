describe('ds.utils.geo', function() {

    describe('.clientLocation()', function() {
        var mockCoordinates = {
            speed: null,
            heading: null,
            altitudeAccuracy: null,
            accuracy: 30,
            altitude: null,
            longitude: 10.1672645,
            latitude: 56.1092605
        };
        window.navigator = navigator || {};
        var nativeGeoLocation = navigator.geolocation = navigator.geolocation || {};
        beforeEach(function() {
            navigator.geolocation.getCurrentPosition = function(done) {
                done({
                    coords: mockCoordinates
                });
            };
        });
        afterEach(function() {
            navigator.geolocation = nativeGeoLocation;
        });

        it('should defer a coordinate result', function(done) {
            ds.utils.geo.clientLocation().done(function(coords) {
                expect(coords).to.equal(mockCoordinates);
                done();
            });
        });

        it('should use freegeoip.net if geolocation is not natively supported', function(done) {
            ds.utils.geo.clientLocation(true).done(function(coords) {
                expect(coords).to.include.keys('longitude', 'latitude');
                done();
            });
        });

    });

    describe('.distance([object], [object])', function() {
        var geo1 = {
            latitude: 10.0,
            longitude: 10.0
        };
        var geo2 = {
            latitude: 20.0,
            longitude: 20.0
        };

        it('should return the distance between two coordinates as a number', function() {
            expect(ds.utils.geo.distance(geo1, geo2)).to.be.a('number');
            expect(ds.utils.geo.distance(geo1, geo1)).to.equal(0);
        });

    });

    describe('.kmToMiles({number|string]}', function() {
        it('should return a convertion of km to miles as a number', function() {
            expect(ds.utils.geo.kmToMiles(10)).to.be.a('string');
            expect(isNaN(ds.utils.geo.kmToMiles(10))).to.be.false;
            expect(isNaN(ds.utils.geo.kmToMiles('10'))).to.be.false;
        });
    });

    describe('.kmToMiles({string|number], {number|string}}', function() {
        it('should return miles with decimals', function() {
            expect(ds.utils.geo.kmToMiles(10, 0)).to.equal('6');
            expect(ds.utils.geo.kmToMiles(10, 4)).to.equal('6.2137');
            expect(ds.utils.geo.kmToMiles('10', '4')).to.equal('6.2137');
        });
    });

});
