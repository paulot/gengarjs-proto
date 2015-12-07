var page = require('webpage').create();

console.log(document);

page.open('http://www.linkedin.com', function(status) {
  console.log('got in linkedin');
  console.log(status);
  console.log(page.url);
  console.log(document);
  console.log(document.title);
  page.openDevTools();
});
