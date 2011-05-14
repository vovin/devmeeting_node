var fstore = require ('ringo/storage/filestore');
var file = new fstore.Store('./db');
exports.JSFile = file.defineEntity('JSFile');

