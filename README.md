# antd-local-icon
A webpack loader for deploy icon files when using the [antd](https://github.com/ant-design/ant-design)

## Usage

**Note that you must import antd source instead of distribution.**

1. `npm install --save-dev antd-local-icon`

2. [Download](https://ant.design/docs/resource/download) the antd icon to local and place all font files in your project.

3. Modify your `webpack.config.js` like following:

```javascript
module.exports = {
	//... your config
	
	module: {
		loaders: [
		//... your config
			{
				test: function(abspath) {
				// extract 'index.less' in antd to load it using antd-local-icon
					return /\.less/.test(abspath) && abspath.indexOf('antd/lib/style/index.less') == -1;
				},
				loader: "style!css!less"
			},
			{
				test: function(abspath) {
					return abspath.indexOf('antd/lib/style/index.less') !== -1;
				},
				// the param url is your local icon files location.
				loader: "style!css!less!antd-local-icon?url=/assets/font/iconfont"
			}
		]
	}
}
```

## Feedback

If you have any questions or requirements, use [Issues](https://github.com/yedaodao/antd-local-icon/issues).




