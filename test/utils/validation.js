describe('ds.utils.validation', function() {

    var validate = window.ds.utils.validation;

    describe('.email([string])', function() {
        it('should validate an email', function() {
            expect(validate.email('valid@email.com')).to.be.true;
            expect(validate.email('not.valid@email')).to.be.false;
            expect(validate.email('@email.com')).to.be.false;
            expect(validate.email('not-valid')).to.be.false;
        });
    });

    describe('.not([string], [string])', function() {
        it('should validate if to strings not are equal', function() {
            expect(validate.not('same', 'not same')).to.be.true;
            expect(validate.not('same', 'same')).to.be.false;
        });
    });

    describe('.required([string])', function() {
        it('should validate that input is not an empty string', function() {
            expect(validate.required('valid')).to.be.true;
            expect(validate.required('')).to.be.false;
        });
    });

    describe('.phone([string])', function() {
        it('should validate that input is a valid phone number', function() {
            expect(validate.phone('12345678')).to.be.true;
            expect(validate.phone('12 34 56 78')).to.be.true;
            expect(validate.phone('+45 12 34 56 78')).to.be.true;
            expect(validate.phone('0045 12 34 56 78')).to.be.true;
            expect(validate.phone('not a phone number')).to.be.false;
            expect(validate.phone('')).to.be.false;
            expect(validate.phone('1234 + 56789')).to.be.false;
        });
    });

});
