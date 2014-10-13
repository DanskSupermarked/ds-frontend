describe('ds.components.storeLocator.stores', function() {
    var storesData;
    var storeData;

    before(function(done) {
        $.getJSON('test/assets/ds.components.store-locator.stores.json').done(function(resp) {
            storesData = resp;
            $.getJSON('test/assets/ds.components.store-locator.store.json').done(function(resp) {
                storeData = resp;
                done();
            });
        });
    });

    describe('.add(data:{object})', function() {

        afterEach(function() {
            ds.components.storeLocator.stores.clear();
            ds.components.storeLocator.stores.removeAllListeners();
        });

        it('should add stores to the store collection and emit a "store:added" event', function() {

            var added = 0;
            var count = 0;

            ds.components.storeLocator.stores.on('store:added', function() {
                added++;
            });

            $.each(storesData, function(index, storeData) {
                count++;
                expect(added).to.equal(count - 1);
                ds.components.storeLocator.stores.add(storeData);
                expect(added).to.equal(count);
            });
        });

        it('should ignore stores with invalid coords', function() {
            var invalidStoreData = $.extend(true, {}, storeData);
            invalidStoreData.coordinates = [0, 0];
            ds.components.storeLocator.stores.add(invalidStoreData);
            expect(ds.components.storeLocator.stores.get().length).to.equal(0);
        });

        it('should be able to add an array of stores', function() {
            ds.components.storeLocator.stores.add(storesData);
            expect(ds.components.storeLocator.stores.get().length).to.equal(storesData.length);
        });

    });

    describe('.get()', function() {

        after(function() {
            ds.components.storeLocator.stores.clear();
        });

        it('should return the complete collection of added stores', function() {
            ds.components.storeLocator.stores.add(storesData);
            expect(ds.components.storeLocator.stores.get().length).to.equal(storesData.length);
        });
    });

    describe('.clear()', function() {

        it('should remove all addes stores from collection', function() {
            ds.components.storeLocator.stores.add(storesData);
            expect(ds.components.storeLocator.stores.get().length).to.equal(storesData.length);
            ds.components.storeLocator.stores.clear();
            expect(ds.components.storeLocator.stores.get().length).to.equal(0);
        });
    });

    describe('.sortByGeo(coords:{object})', function() {

        var nearestStoreId;
        var searchCoords = {
            latitude: 5,
            longitude: 5
        };

        beforeEach(function() {
            var sortStoresData = storesData.slice();
            $.each(sortStoresData, function(index, storeData) {
                $.extend(true, {}, storeData);
            });
            var nearestStoreData = sortStoresData[4];
            nearestStoreData.coordinates = [searchCoords.longitude, searchCoords.latitude];
            nearestStoreId = nearestStoreData.id;
            ds.components.storeLocator.stores.add(sortStoresData);
        });

        afterEach(function() {
            ds.components.storeLocator.stores.clear();
            ds.components.storeLocator.stores.removeAllListeners();
        });

        it('should emit an "stores:sorted" event when sorting is finished', function(done) {
            ds.components.storeLocator.stores.on('stores:sorted', done);
            ds.components.storeLocator.stores.sortByGeo(searchCoords);
        });

        it('should sort stores by distance to coordinate', function() {
            ds.components.storeLocator.stores.sortByGeo(searchCoords);
            var stores = ds.components.storeLocator.stores.get();
            expect(stores[0].distance).to.be.most(stores[1].distance);
            expect(stores[1].distance).to.be.most(stores[stores.length - 1].distance);
            expect(stores[0].data.id).to.equal(nearestStoreId);
        });
    });

});
