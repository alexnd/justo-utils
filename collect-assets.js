/*
Collect static files tree skeleton as js object
Usage: nodejs collect-assets.js path/to/project
*/

var dirs = ['images'];
var outFile = 'assets.json';

var path = require('path');
var fs = require('fs');
var util = require('util');

var workPath = (process.argv.length > 2 && fs.existsSync(process.argv[2])) ? process.argv[2] : __dirname;

var col = {};

function collectDir(dirNode, dirPath, dir) {
	dirNode['@'] = [];
	var dirUriPath = path.join(dirPath, dir);
	var files = fs.readdirSync(dirUriPath);
	files.forEach(function (file) {
		var dirFilePath = path.join(dirUriPath, file);
		var stats = fs.statSync(dirFilePath);
		if (stats.isDirectory()) {
			dirNode[file] = {};
			collectDir(dirNode[file], dirUriPath, file);
		} else {
			//TODO: match the extensions patterns (.png, .jpg) and skip @2x, 3x, .ios, etc...
			dirNode['@'].push(file);
		}
	});
}

dirs.forEach(function(k) {
	col[k] = {};
	collectDir(col[k], workPath, k);
});


fs.writeFileSync(path.join(workPath, outFile), JSON.stringify(col, null, 2));
