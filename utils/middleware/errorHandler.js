const config = require('../../config');
const sentry = require('@sentry/node');

sentry.init({ dsn: `https://${config.sentryDns}.ingest.sentry.io/${config.sentryId}` });

function logErrors(err, req, res, next) {
    sentry.captureException(err);
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    // catch errors for ajax request
    if(req.xhr) {
        res.status(500).json({err: err.message});
    } else {
        next(err);
    }
}


function errorDefault(err, req, res, next) {
    // catch erros while streaming
    if(res.headersSent) {
        next(err)
    }
    if(!config.dev) {
        delete err.stack;
    }
    res.status(err.status || 500);
    res.render("error", {error: err})
} 

module.exports = {
    logErrors,
    clientErrorHandler,
    errorDefault
}