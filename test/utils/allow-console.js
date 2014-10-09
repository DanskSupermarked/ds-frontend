describe('ds.utils.allowConsole', function() {

    describe('.mock()', function() {
        var consoleFunctions = 'log error info debug warn trace dir dirxml group groupEnd time timeEnd assert profile'.split(' ');

        it('should mock all console statements with a noop function', function() {
            ds.utils.allowConsole.unmock();
            var nativeConsole = console;
            ds.utils.allowConsole.mock();
            expect(console).to.not.equal(nativeConsole);
            expect(console).to.contain.keys(consoleFunctions);
            expect(console.log).to.be.a('Function');
            if (typeof nativeConsole !== 'undefined') {
                ds.utils.allowConsole.unmock();
            }
        });

        it('should auto-mock if console is not present in enviromnet', function() {
            var actualConsole = console;
            ds.utils.allowConsole.unmock();
            var nativeConsole = console;
            if (typeof nativeConsole === 'undefined') {
                expect(actualConsole).to.contain.keys(actualConsole);
                ds.utils.allowConsole.mock();
            } else {
                expect(actualConsole).to.equal(nativeConsole);
            }
        });

    });
});
