describe('README.md', function() {
    it('should have the correct stable version', function(done) {
        window.$.getJSON('package.json', function(pkg) {
            window.$.get('README.md', function(readme) {
                var stableText = 'Stable version: `' + pkg.version + '`';
                var packageJsonText = 'In package.json: `"ds-frontend": "git://github.com/DanskSupermarked/ds-frontend#v' + pkg.version + '"`';
                expect(readme).to.contain(stableText);
                expect(readme).to.contain(packageJsonText);
                done();
            });
        });
    });
});
