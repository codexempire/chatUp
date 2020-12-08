module.exports = (server, app) => {
    require('./mongoose');
    require('./socket')(server);
}