describe('ds.utils.validation', function() {

    describe('.email(input:{string})', function() {
        it('should validate an email', function() {
            expect(ds.utils.validation.email('valid@email.com')).to.be.true;
            expect(ds.utils.validation.email('not.valid@email')).to.be.false;
            expect(ds.utils.validation.email('@email.com')).to.be.false;
            expect(ds.utils.validation.email('not-valid')).to.be.false;
        });
    });

    describe('.not(input:{string}, matcher:{string})', function() {
        it('should validate if to strings not are equal', function() {
            expect(ds.utils.validation.not('same', 'not same')).to.be.true;
            expect(ds.utils.validation.not('same', 'same')).to.be.false;
        });
    });

    describe('.required(input{string})', function() {
        it('should validate that input is not an empty string', function() {
            expect(ds.utils.validation.required('valid')).to.be.true;
            expect(ds.utils.validation.required('')).to.be.false;
        });
    });

    describe('.phone(input:{string})', function() {
        it('should validate that input is a valid phone number', function() {
            expect(ds.utils.validation.phone('12345678')).to.be.true;
            expect(ds.utils.validation.phone('12 34 56 78')).to.be.true;
            expect(ds.utils.validation.phone('+45 12 34 56 78')).to.be.true;
            expect(ds.utils.validation.phone('0045 12 34 56 78')).to.be.true;
            expect(ds.utils.validation.phone('not a phone number')).to.be.false;
            expect(ds.utils.validation.phone('')).to.be.false;
            expect(ds.utils.validation.phone('1234 + 56789')).to.be.false;
        });
    });

});
