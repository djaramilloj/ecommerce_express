const config = require('../../config');
const sentry = require('@sentry/node');
const boom = require('@hapi/boom');
const requestType = require('../../utils/requestType');

sentry.init({ dsn: `https://${config.sentryDns}.ingest.sentry.io/${config.sentryId}` });

function withErrorStack(err, stack) {
    if (config.dev) {
        return {...err, stack};
    }
}

function logErrors(err, req, res, next) {
    sentry.captureException(err);
    console.error(err.stack);
    next(err);
}

function wrapErrors (err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }

    next(err);
}

function clientErrorHandler(err, req, res, next) {
    const {
        output: {statusCode, payload}
    } = err;
    // catch errors for ajax request or if error on streaming
    if(requestType(req) || res.headersSent) {
        res.status(statusCode).json(withErrorStack(payload, err.stack));
    } else {
        next(err);
    }
}

function errorDefault(err, req, res, next) {
    // catch erros while streaming
    const {
        output: {statusCode, payload}
    } = err;
    res.status(statusCode);
    res.render("error", withErrorStack(payload, err.stack))
} 

module.exports = {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorDefault
}