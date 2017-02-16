# Justo utilities

Useful tools for developers

To set up :

- install *nodejs* and *npm* if you still don't have it - https://nodejs.org
- run ```git clone https://github.com/alexnd/justo-utils.git``` (or download as zip and unpack)
- run ```npm install```

## sync-ftp.js

Upload set of files to your remote host via ftp

To set up job just edit sync-ftp.js

*Key vars*

**path_src** - source directory from where looking files

**path_dst** - remote path to put files

**batch** - list of files to upload, use { 'source' : 'destination' } if locations differs

**ftp_cfg** - ftp connection params ( host, user, password )

*Running*

To start upload use command: ```node sync-ftp.js```

## collect-assets ##

Collect static files tree skeleton as js object

Usage: ```nodejs collect-assets.js path/to/project```

## npm-deps ##

Prints npm package dependencies (and dev dependencies) as "plain lists" (i.e. "pkg1 pkg2 ...")

Usage: ```nodejs npm-deps.js path/to/package.json [-strict]```

strict mode - returns names in form "package@version"