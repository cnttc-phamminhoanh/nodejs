require('dotenv').config();

var express = require('express');

var cookieParser = require('cookie-parser')

var csurf = require('csurf')

var userRoute = require('./routes/user.route.js');

var authRouter = require('./routes/auth.route.js');

var cartRoute = require('./routes/cart.route.js');

var transferRoute = require('./routes/transfer.route.js')

var authMiddleware = require('./middlewares/auth.middleware.js');

var sessionMiddleware = require('./middlewares/session.middleware.js');

var productRoute = require('./routes/product.route.js');

var app = express();

app.set('view engine', 'pug');

app.set('views', './views');

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(sessionMiddleware);

app.use(csurf({cookie:true}));

app.use(express.static('public'));

var port = 3000;

app.get('/',function(req,res){
	res.render('index.pug',{
		name : 'Mati 17CNTTC'
	});
});

app.use('/auth',authRouter);

app.use('/users',authMiddleware.requireAuth,userRoute);

app.use('/products',productRoute);

app.use('/cart',cartRoute);

app.use('/transfer',authMiddleware.requireAuth,transferRoute);

app.listen(port,function(){
	console.log('Server listening on port ' + port);
	console.log('Link : http://localhost:3000/');
});