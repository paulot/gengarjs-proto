var page = require('webpage').create();

console.log(document);

page.open('http://www.linkedin.com', function(status) {
  console.log('got in linkedin');
  console.log(status);
  console.log(page.url);

  console.log(page.evaluateJavaScript("function(){return 1}"));
  page.openDevTools();
  // phantom.exit();
});
