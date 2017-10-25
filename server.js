const express = require('express');
const app = express();

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

app.use(forceSSL());
app.use(require('prerender-node').set('prerenderToken', 'nLDTqmJK87BXuSIBIs4x'));
app.use(require('prerender-node').set('protocol', 'https'));

const path = require('path');


var router = express.Router();
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/dist/index.html'));
// });

// Run the app by serving the static files
// in the dist directory
// 
// 
app.use(express.static(__dirname + '/dist'));
// 
// 
// Start the app by listening on the default
// serve angular front end files from root path



// router.use('/', express.static('app', { redirect: false }));
 
// rewrite virtual urls to angular app to enable refreshing of internal pages

app.all('/*', function (req, res, next) {
    res.sendFile('index.html', { root: __dirname + '/dist' });
});

// app.all('/*', function(req, res, next) {
//     // Just send the index.html for other files to support HTML5Mode
//     res.sendFile('index.html', { root: __dirname + '/dist' });
// });

// Heroku port
app.listen(process.env.PORT || 8080);

These polyfills must be the first thing imported in node
