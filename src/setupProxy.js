const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api/postgrest',
        createProxyMiddleware({
            target: 'http://localhost:7100',
            changeOrigin: true,
            pathRewrite: {
                '^/api/postgrest': '/'
            }
        })
    );
    app.use(
        '/api/spring',
        createProxyMiddleware({
            target: 'http://localhost:7101',
            changeOrigin: true,
            pathRewrite: {
                '^/api/spring': '/'
            }
        })
    );
};