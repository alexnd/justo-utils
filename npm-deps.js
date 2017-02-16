/*
Prints npm package dependencies (and dev dependencies) as "plain lists"
Usage: nodejs npm-deps.js path/to/package.json [-strict]
strict mode - returns names in form "package@version"
*/

var fs = require('fs');
var path = require('path');

var f = (process.argv.length > 2 && fs.existsSync(process.argv[2])) ? process.argv[2] : __dirname;
if (!f.match(/\.json$/)) f = path.join(f, 'package.json');

var strictMode = process.argv.indexOf('-strict') !== -1;

try {
	var s = '', p = JSON.parse(fs.readFileSync(f));
	console.log('dependencies:');
	if ( p.dependencies ) {
		if (strictMode) {
			for (var k in p.dependencies) {
				s += k + '@' + p.dependencies[k] + ' ';
			}
		} else {
			s = Object.keys(p.dependencies).join(' ')
		}
		console.log(' ', s);
	} else {
		console.log(' ');
	}
	console.log('devDependencies:');
	if ( p.devDependencies ) {
		s = '';
		if (strictMode) {
			for (var k in p.devDependencies) {
				s += k + '@' + p.devDependencies[k] + ' ';
			}
		} else {
			s = Object.keys(p.devDependencies).join(' ');
		}
		console.log(' ', s);
	} else {
		console.log(' ');
	}
} catch (e) {
	console.error(e.stack);
}
