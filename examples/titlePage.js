var page = require('webpage').create();

page.open('http://www.lasdfasdinkedin.com', function(status) {
  console.log(status);
  console.log(page.title);
  phantom.exit();
});

page.open('http://www.linkedin.com', function(status) {
  console.log('second');
  console.log(status);
  console.log(page.title);
//  phantom.exit();
});
