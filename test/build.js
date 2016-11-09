import webpack from 'webpack'
import path from 'path';
import should from 'should';
import fs from 'fs';

let webpackConfig = {
    entry: {
        icon: [path.resolve(__dirname, './src/icon.js')]
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel",
                query: {compact: false}
            },
            {
                test: function (abspath) {
                    return abspath.indexOf('/lib/style/index.less') !== -1;
                },
                loader: "style!css!less!" + path.resolve(__dirname, '../index.js') + '?url=' + path.resolve(__dirname, '/font/iconfont'),
            }
        ]
    }
};

describe('./index.js', function () {
        this.timeout(120000);
        describe('#webpack-compile', ()=> {
            it('should compile icon', (done)=> {
                webpack(webpackConfig, (err, stats)=> {
                    should(err).be.null();
                    done();
                });
            });
            it('should not exist at.alicdn.com', (done)=> {
                let rs = fs.createReadStream(path.resolve(__dirname, './build/icon.js')),
                    str = '';
                rs.setEncoding('utf8');
                rs.on('data', (data)=> {
                    str += data;
                });
                rs.on('end', ()=> {
                    str.indexOf('at.alicdn.com').should.be.equal(-1);
                    done();
                });
                rs.on('err', (err)=> {
                    should(err).be.null();
                });
            });
        });
    }
);