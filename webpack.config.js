const path = require("path");

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'week1app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    node: {
        console: 'mock',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
