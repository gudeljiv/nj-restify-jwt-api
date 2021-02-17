const configs = require('./configs');
const database = require('./database');
const server = require('./server');

// unhandling unexpected exceptions
process.on('uncaughtException', (error) => {
	console.error(`uncaughtException ${error.message}`);
});

// unhandling rejected promises
process.on('unhandledRejection', (reason) => {
	console.error(`unhandledRejection ${reason}`);
});

const config = configs.getConfig();
const db = database.init(config.database);
const appServer = server.init(config, db);

appServer.listen(process.env.PORT || config.server.port, () => {
	console.log('Server running at:', config.server.port);
});
