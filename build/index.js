/**
 * Require all js files in tasks folder
 */

var fs = require('fs');
var path = require('path');

// Filters out non .js files. Prevents
// accidental inclusion of possible hidden files
var onlyScripts = function(name) {
    return /(\.(js)$)/i.test(path.extname(name));
};

var tasksPath = path.join(__dirname, 'tasks');
var tasks = fs.readdirSync(tasksPath).filter(onlyScripts);

tasks.forEach(function(task) {
    require('./tasks/' + task);
});
