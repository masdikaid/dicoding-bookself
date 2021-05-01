const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: true,
        },
    });

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
