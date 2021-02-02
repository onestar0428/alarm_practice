const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/scripts', 'main.js'),
    output: {
        path: path.resolve(__dirname, 'src/scripts/dist'),
        filename: 'main.bundle.js',
    },
    target: ['es5'],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/scripts'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            [
                                "@babel/preset-env",
                                {
                                    "targets": {
                                        "browsers": [
                                            "ie >= 10",
                                            "last 2 versions",
                                            ">= 5% in KR"
                                        ]
                                    }
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    devtool: 'source-map',
}
