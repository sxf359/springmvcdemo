var webpack = require("../../../../");

module.exports = {
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			async: true
		})
	]
};
