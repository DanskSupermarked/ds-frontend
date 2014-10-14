/**
 * Require all modules to test, that they can be required by browserify
 */

require('../');

require('../scripts/components/store-locator/controller');
require('../scripts/components/store-locator/store');
require('../scripts/components/store-locator/stores');

require('../scripts/utils/allow-console');
require('../scripts/utils/data');
require('../scripts/utils/geo');
require('../scripts/utils/lazy-images');
require('../scripts/utils/load-assets');
require('../scripts/utils/load-google-maps-api');
require('../scripts/utils/responsive-classes');
require('../scripts/utils/string');
require('../scripts/utils/url');
require('../scripts/utils/validation');
