var batch = [
'readme.txt',
{'index.html' : 'www/index.html'}
];
var path_src = '';
var path_dst = 'example.com/';
var cfg = {
  host:'ftp.example.com',
  user:'username',
  password:'password'
};
var ftpc = require('ftp');
var async = require('async');
var calls = [];
var c = new ftpc();
c.on('ready', function() {
  batch.forEach(function (p) {
    calls.push(function (cb) {
      var psrc, pdst;
      if (typeof p == 'object' && p !== null) {
        for (var i in p) {
          psrc = i;
          pdst = p[i];
          break;
        }
      } else {
        psrc = p;
        pdst = p;
      }
      c.put(path_src+psrc, path_dst+pdst, function(err) {
        if (err) cb(err, null);
        else cb(null, true);
      });
    });
  });
  async.series(calls, function (e, r) {
    if (!e) console.log('done');
    else {
      console.log('error:', e.toString());
      throw e;
    }
    c.end();
  });
});
c.connect(cfg);