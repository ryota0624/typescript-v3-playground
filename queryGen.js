var chokidar = require('chokidar')
var watcher = chokidar.watch('./queries', {	//watch対象ディレクトリorファイル
	ignored: /\.ts|__generated__/,	//無視する対象
	persistent:true	//監視を継続するかどうか
	})
 
 
watcher.on('ready', () => { console.log("監視開始"); })
	.on('add', (path) => { console.log("追加ファイル-> " + path); })
	.on('addDir', (path) => { console.log("追加ディレクトリ-> " + path); })
	.on('unlink', (path) => { console.log("削除されました-> " + path);　/* TODO: __generated__以下を全部消す。 ./node_modules/apollo/bin/run codegen:generate --target=typescript --schema=schema.json --queries="queries/*.graphql"を叩く */  })
  .on('unlinkDir', (path) => { console.log("削除されました-> " + path);/* TODO: __generated__以下を全部消す。 ./node_modules/apollo/bin/run codegen:generate --target=typescript --schema=schema.json --queries="queries/*.graphql"を叩く */ })
	.on('change', (path) => { console.log("修正されました-> " + path); /* TODO: ./node_modules/apollo/bin/run codegen:generate --target=typescript --schema=schema.json --queries="queries/*.graphql"を叩く */ })
	.on('error', (error) => { console.log("エラーです-> " + error); })