function requestType(req) {
    return !req.accepts("html") || req.xhr;
}

module.exports = requestType;