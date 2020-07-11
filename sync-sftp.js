//node sync-sftp.js

var batch = [
  {'www/index.html' : 'www/index.html'}
  // 'www/index.html'
  // ['www/index.html', 'www/index.html']
];
var sourcePath = __dirname + '/';
var remotePath = '/home/user/project/';

// TODO: rewrite to env
var cfg = {
  host:'127.0.0.1',
  port: 22,
  username:'user',
  password:'password'
};
var path = require('path');
var Client = require('ssh2-sftp-client');
var sftp = new Client();

sftp.connect(cfg).then(() => {
  processBatch().then(() => {
  	console.log('done');
    process.exit(0);
  })
}).catch(err => {
  console.log('*[error]', err);
  process.exit(1);
});

async function processBatch() {
  try {
  	for (var i = 0; i < batch.length; i++) {
      await batchStep(batch[i]);
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function batchStep(res) {
  let fileSrc, fileDst
  if (typeof res === 'object' && res !== null) {
    if (Array.isArray(res)) {
      fileSrc = res[0]
      fileDst = res[1]
    } else {
      fileSrc = Object.keys(res)[0]
      fileDst = res[fileSrc]
    }
  } else {
    fileSrc = `${res}`
    fileDst = `${res}`
  }
  console.log('from:', path.join(sourcePath, fileSrc));
  console.log('to:', `${remotePath}${fileDst}`);
  await sftp.put(
    path.join(sourcePath, fileSrc),
    `${remotePath}${fileDst}`
  );
}
