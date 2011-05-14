var {Response} = require('ringo/webapp/response');

var {JSFile} = require('./model.js');

exports.index = function (req) {
    return Response.skin(module.resolve('skins/index.html'), {
        title: "It's working!"
    });
};



exports.files = function (req) {
  var jsonpstr = req.queryParams['callback'] || req.postParams['callback'] || 'jsonp';

  var files = [f.name for each( f in JSFile.query().select() ) ];

  var res = new Response(jsonpstr+'('+JSON.stringify(files)+');');
  print('returned files');
  res.contentType = 'application/json';
  return res;
}

exports.file = {
	GET: function (req,filename) {
		  var jsonpstr = req.queryParams['callback'] || req.postParams['callback'] || 'jsonp';
		  var file = JSFile.query().equals('name',filename).select()[0];
		  var res = new Response(jsonpstr+'('+JSON.stringify(file)+');');
		  res.contentType = 'application/json';
		  return res;   
		},
	POST: function(req,filename) {
		  var jsonpstr = req.queryParams['callback'] || req.postParams['callback'] || 'jsonp';
		  var file = JSFile.query().equals('name',filename).select()[0];
		file = file || new JSFile();
		file.name = filename; // only if new


		var fileContent = req.params['source'];
		file.source = fileContent;
		file.save();
		  
		  var res = new Response('OK');
		  res.contentType = 'text/plain';
		  return res;   
		}
}


