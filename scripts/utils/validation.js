module.exports.email = function(input) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(input);
};

module.exports.not = function(input, needle) {
    return (input !== needle);
};

module.exports.required = function(input) {
    return (input !== '');
};

module.exports.phone = function(input) {
    var re = /^[\+]?[\d() -]+$/;
    return re.test(input);
};
