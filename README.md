build: npx webpack-cli --mode=development --config webpack.dev.js

schema to def json: ./node_modules/apollo/bin/run schema:download  --endpoint sample.graphql

query def ts: ./node_modules/apollo/bin/run codegen:generate --target=typescript --schema=schema.json --queries="queries/*.graphql"

local server: ./node_modules/local-web-server/bin/cli.js --config-file lws.config.js -p 8004