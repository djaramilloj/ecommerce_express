const config = require('../config/index');


function chacheResponse (res, seconds) {
    if(!config.dev) {
        res.set('Cache-Control', `public, max-age=${seconds}`)
    }
}

module.exports = chacheResponse;