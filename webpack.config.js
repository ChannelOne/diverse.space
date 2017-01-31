var webpack = require('webpack');
module.exports = {
    entry: './src/app.ts',
    output: {
        filename: './build/bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    // Add minification
    /*
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    */
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'}
        ]
    },
    externals: {
        "three": "THREE"
    }
}