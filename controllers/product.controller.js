var db = require('../db.js');	
module.exports.index = function(req,res){
	var page = parseInt(req.query.page) || 1;
	var perPage = 4;
	var start = (page-1)*perPage;
	var end = page*perPage;
	var totalPage = Math.ceil((db.get('products').size().value())/perPage) || 1;  
	res.render('products/index.pug',{
		products : db.get('products').value().slice(start,end),
		totalPage : totalPage
	});
};

module.exports.search = function(req,res){
	var q = req.query.q;
	if (q !== ''){
		var matchedProducts = db.get('products').value().filter(function(product){
			return product.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
		});
		res.render('products/index.pug',{
			products : matchedProducts,
			key : q
		});
		return;
	}else{
		res.render('products/index.pug',{
			errors: [
				'Require enter the search word.'
			]
		});
		return;
	}
};