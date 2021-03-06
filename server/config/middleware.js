var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express){
	// console.log('go to middleware');
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	if(process.env.ENVIRONMENT === "PRODUCTION") {
		app.use(express.static('client/public/build'));
	} else {
		app.use(express.static('client/public/dist'));
	}

	// var userRouter = express.Router();
	// app.use('/user', userRouter);
	// require('../user/userRoutes.js')(userRouter);

	var contentRouter = express.Router();
	app.use('/api/lesson', contentRouter);
	require('../content/contentRoutes.js')(contentRouter);
};

