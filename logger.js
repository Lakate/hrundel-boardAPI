const bunyan = require('bunyan');

function resSerializer(res) {
    return {
        statusCode: res.statusCode,
        body: res.body,
        request: {
            href: res.request.href,
            method: res.request.method,
            headers: res.request.headers
        }
    };
}

module.exports = bunyan.createLogger({
    name: 'myapp',
    serializers: {
        res: resSerializer,
        err: bunyan.stdSerializers.err      // standard bunyan error serializer
    }
});