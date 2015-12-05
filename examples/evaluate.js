var page = require('webpage').create();

page.open('http://www.linkedin.com', function(status) {
  console.log('got in linkedin');
  console.log(status);
  console.log(page.url);
  page.openDevTools();
});
