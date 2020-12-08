module.exports = app => {
    app.use('/v1/auth', require('./auth'));
}