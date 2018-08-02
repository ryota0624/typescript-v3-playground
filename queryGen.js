const spawn = require('child_process').spawnSync;
const fs = require('fs');
const chokidar = require('chokidar');
const watcher = chokidar.watch('./queries', {	//watch対象ディレクトリorファイル
	ignored: /\.ts|__generated__/,	//無視する対象
	persistent:true	//監視を継続するかどうか
	});

function generateTsDef() {
	spawn('./node_modules/apollo/bin/run', 
		['codegen:generate', '--target=typescript', '--schema=schema.json', '--queries="queries/*.graphql"'],
		{stdio: 'inherit'}
	)
}
generateTsDef();
function clearGenerateDir() {
	if (!fs.existsSync('queries/__generated__')) return -1;
	console.log('------- start clear directory __gererated__ -------');
	const allFileNames = fs.readdirSync('queries/__generated__');
	allFileNames.forEach(fileName => {
		fs.unlinkSync(`queries/__generated__/${fileName}`);
	});
	fs.rmdirSync('queries/__generated__');
	console.log('------- finish clear directory __gererated__ -------');
}

// watcher.on('ready', () => { console.log("監視開始"); })
// 	.on('add', (path) => { 
// 		console.log("追加ファイル-> " + path); 
// 	})
// 	.on('addDir', (path) => {
// 		 console.log("追加ディレクトリ-> " + path); 
// 		})
// 	.on('unlink', (path) => { 
// 		console.log("削除されました-> " + path);
// 		clearGenerateDir();
// 		generateTsDef();
// 	})
//   .on('unlinkDir', (path) => {
// 		 console.log("削除されました-> " + path);
// 		 clearGenerateDir();
// 		 generateTsDef();
// 	})
// 	.on('change', (path) => {
// 		 console.log("修正されました-> " + path); 
// 		 generateTsDef();
// 	})
// 	.on('error', (error) => { console.log("エラーです-> " + error); });