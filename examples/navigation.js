var page = require('webpage').create();
/*
page.open('http://www.linkedin.com', function(status) {
  console.log('got in linkedin');
  console.log(status);
  console.log(page.url);

  console.log(page.canGoBack);
  console.log(page.canGoForward);
  page.goBack();
  console.log(page.url);
  page.goForward();
  console.log(page.url);

  phantom.exit();
});
*/
page.open('http://www.lasdfasdinkedin.com', function(status) {
  console.log(status);
  page.open('http://www.linkedin.com', function(status) {
    console.log('got in linkedin');
    console.log(status);
    console.log(page.url);

  console.log(page.canGoBack);
  console.log(page.canGoForward);
  page.goBack();
  console.log(page.url);
  page.goForward();
  console.log(page.url);

    phantom.exit();
  });
});
