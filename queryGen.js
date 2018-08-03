const spawn = require('child_process').spawn;



function infoLog(text) {
	const green = '\u001b[32m';
	const reset = '\u001b[0m';

	console.log(green + text + reset);
}

function errorLog(error) {
	const red = '\u001b[31m';
	const reset = '\u001b[0m';

	console.log(error)
	console.log(red + error + reset);
	return error;
}

function generateTsDef({watch} = {watch: false}) {
	return spawn('npx', 
		['apollo', 'codegen:generate', '--target=typescript', '--schema=schema.json', '--queries=queries/*.graphql'].concat(watch ? ['--watch'] : []),
		{stdio: 'inherit'}
	);
}

function webpack({watch} = {watch: false}) {
	return spawn('npx', 
		['webpack-cli', '--mode=development', '--config', 'webpack.dev.js'].concat( watch ? ['--w']: []),
		{stdio: 'inherit'}
	);
}

function localWebServer() {
	return spawn('npx',
		['lws', '--config-file', 'lws.config.js', '-p', '8004'],
		{stdio: 'inherit'}
	);
}

function buildBs({watch} = {watch: false}) {
	return spawn('npx',
		['bsb'].concat( watch ? ['-w']: []),
		{stdio: 'inherit'}
	);	
}

function childProcessWrapPromise(childProcess) {
	return new Promise((resolve, reject) => {
		childProcess.on('exit', () => resolve());
		childProcess.on('error', error => reject(error));
	});
}

function initialize() {
	infoLog("------ start initialize ------");
	const tsDefProcess = generateTsDef();
	const bsBuildProcess = buildBs();

	const initializeProcesses = [
		tsDefProcess,
		bsBuildProcess
	].map(childProcessWrapPromise);

	return Promise.all(initializeProcesses).then(() => {
		infoLog("------ finish initialize ------");
		infoLog("\n")
	});
}

function main(watch) {
	infoLog('----- start main -----');
	const tsDefProcess = watch ? generateTsDef({watch: true}) : null;
	const webpackProcess= webpack({watch});
	const localWebServerProcess = watch ? localWebServer() : null;
	const bsBuildProcess = watch ? buildBs({watch}) : null;

	const processes = [tsDefProcess, webpackProcess, localWebServerProcess, bsBuildProcess]
		.filter((p) => p).map(childProcessWrapPromise)

	return Promise.all(processes).then(() => {
		infoLog("------ finish main ------");
	});
}

function start() {
 const watch = process.argv.some((arg) => arg === "--w");
	return initialize()
		.then(() => main(watch))
}


start().catch(errorLog);