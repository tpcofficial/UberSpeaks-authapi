/*
 * Version Checker
 * 
 * Compares local master hash to remote master hash (via a GET request) then notifies user on launch about being outdated if so
 */

const https = require('https'),
    url = require('url'),
    fs = require('fs'),
    log = require('./logging');

https.get({ host: 'api.github.com', path: '/repos/tpcofficial/UberSpeaks-authapi/commits/master', headers: { 'User-Agent': 'request' } }, function (res) {
    let json = '';
    res.on('data', function (chunk) { json += chunk; });
    res.on('end', function () {
        var data = JSON.parse(json);
        const parseName = url.parse(data.html_url);
        const getPath = parseName.pathname;
        const formatPath = getPath.replace(/((?!\w+$).)/g, '');
        var ver;
        try {
            ver = fs.readFileSync('.git/refs/heads/master').toString('utf-8');
        } catch (e) {
            ver = 'na';
        }
        if (formatPath !== ver.replace(/\n$/, '')) {
            log.error('AN UPDATE IS AVAILABLE. YOU SHOULD PULL CHANGES ASAP!');
            console.log(`\nCurrent version: ${ver}\nAvailable version: ${formatPath}`);
        }
    });
});
