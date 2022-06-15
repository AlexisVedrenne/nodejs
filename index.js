const readline = require('linebyline'),
rl = readline('./test.txt');
rl.on('line', function(line, lineCount, byteCount) {

})
.on('error', function(e) {
// something went wrong
});