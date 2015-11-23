var page = require('webpage').create();

page.open('http://www.lasdfasdinkedin.com', function(status) {
  console.log(status);
  phantom.exit(99);
});

