describe('new ds.components.storeLocator.Store(data:{object})', function() {
    var data;

    before(function(done) {
        $.getJSON('test/assets/ds.components.store-locator.store.json').done(function(resp) {
            data = resp;
            done();
        });
    });

    it('should return a Store object', function() {
        var store = new ds.components.storeLocator.Store(data);
        expect(store).to.be.an('object');
        expect(store).to.include.keys('data', 'distance', 'marker');
        expect(store.data).to.include.keys('address', 'brand', 'hours', 'name');
        expect(store.data.hours).to.be.an('array');
    });

    describe('.getCoords()', function() {
        it('should return the lat and long values for the store', function() {
            var store = new ds.components.storeLocator.Store(data);
            expect(store.getCoords()).to.include.keys('latitude', 'longitude');
            expect(store.getCoords().latitude).to.be.a('number');
            expect(store.getCoords().longitude).to.be.a('number');
        });
    });

    describe('.setDistanceTo(coords:{object})', function() {
        it('should return the lat and long values for the store', function() {
            var store = new ds.components.storeLocator.Store(data);
            expect(store.distance).to.equal(null);
            store.setDistanceTo({
                latitude: 10,
                longitude: 10
            });
            expect(store.distance).to.be.a('number');
        });
    });

});
