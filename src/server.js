'use strict';

const restify = require('restify');

const errors = require('restify-errors');
const corsMiddleware = require('restify-cors-middleware');
const cors = corsMiddleware({
	origins: ['*'],
	allowHeaders: ['X-App-Version'],
	exposeHeaders: [],
});

const config = require(`./configs/config.${process.env.NODE_ENV || 'dev'}`);
const session = require('restify-cookie-session')({
	debug: config.cookie.debug,
	ttl: config.cookie.ttl,
});
const cookie = require('cookie');

const bodyParser = require('body-parser');
const queryParser = require('query-parser');
const compression = require('compression');
const morgan = require('morgan');
const rjwt = require('restify-jwt-community');

const settings = require('./settings');
const users = require('./users');
const pages = require('./pages');

module.exports.init = function (configs, db) {
	const app = restify.createServer({
		name: 'Borming CMS API',
	});

	// config express middlewares
	app.use(restify.plugins.bodyParser());
	app.use(restify.plugins.queryParser());
	app.pre(cors.preflight);
	app.use(cors.actual);
	app.use(compression());
	app.use(morgan(configs.server.logger.format));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(session.useCookieParse);
	app.use(session.sessionManager);

	// auth routes
	app.use(rjwt({ secret: configs.token.secret }).unless({ path: ['/api/user/login'] }));

	// setup routes
	settings.init(app, configs, db);
	users.init(app, configs, db);
	pages.init(app, configs, db);

	app.pre((req, res, next) => {
		// console.info(`${req.method} - ${req.url}`);
		return next();
	});

	return app;
};
