//--------CONTSTANTS----------\\
const url = require('url'),
	path = require('path'),
	express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	app = express(),
	MemoryStore = require('memorystore')(session),
	dataDir = path.resolve(`./web`)
	app.set('view engine', 'html');
	app.use('/', express.static(path.resolve(`${dataDir}/`)));
   
	app.use(
		session({
			store: new MemoryStore({ checkPeriod: 86400000 }),
			secret:"jdisdlsdfhosu;os",
			resave: false,
			saveUninitialized: false
		})
	);

    app.use(bodyParser.json());
	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	);


 app.get('/', (req, res) => {
		res.sendFile(__dirname + '/web/index.html')
	})
	app.get('/tos', (req, res) => {
		res.sendFile(__dirname + '/web/terms.html')
	})
	app.get('/policy', (req, res) => {
		res.sendFile(__dirname + '/web/privacy.html')
	})
	app.get('/commands', (req, res) => {
		res.sendFile(__dirname + '/web/commands.html')
	})
	app.get('/premium', (req, res) => {
		res.sendFile(__dirname + '/web/premium.html')
	})
	app.get('/faq', (req, res) => {
		res.sendFile(__dirname + '/web/faq.html')
	})


  app.use(function(req, res) {
    res.status(404).sendFile(__dirname + '/web/404.html')
  });
    app.listen(80, null, null, () =>
    console.log(`[INFO]: The Website is ready on port 80`)
);