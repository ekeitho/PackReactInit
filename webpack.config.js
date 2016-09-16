const path = require('path');
const merge = require('webpack-merge');
const PATHS = {
    src: path.join(__dirname, 'src'),
    style: path.join(__dirname, 'src', 'main.css'),
    build: path.join(__dirname, 'build'),
    libs: path.join(__dirname, 'libs')
};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');
const parts = require(PATHS.libs + "/parts")

const common = {
    //allows imports like import Button from './Button'
    resolve: {
        extensions: ['', '.js', '.jsx']  
    },
	entry: {
        style: PATHS.style,
        app: PATHS.src
    },
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo',
            template: 'a-template.ejs'
        })
    ]
}

var config;
switch(process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(common,
                        parts.setupBabel(PATHS.src), 
                        parts.minify(),
                        parts.extractCSS(PATHS.style),
                        parts.setFreeVariable(
                            'process.env.NODE_ENV',
                            'production'
                        ),
                        parts.clean(PATHS.build),
                        parts.extractBundle({
                            name: 'vendor',
                            entries: ['react']
                        })
                      );
        break;
    default:
        config = merge(common, parts.devServer({
            // customize host & port if needed
            host: process.env.HOST, // localhost
            port: process.env.PORT // port 8080
        }), parts.setupCSS(PATHS.style), parts.setupBabel(PATHS.src))
}

module.exports = validate(config);