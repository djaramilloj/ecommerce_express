require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    db_name: process.env.DB_NAME,
    sentryDns: process.env.SENTRY_DNS,
    sentryId: process.env.SENTRY_ID,
    adminUsername : process.env.AUTH_ADMIN_USERNAME,
    adminPassword: process.env.AUTH_ADMIN_PASSWORD,
    adminEmail : process.env.AUTH_ADMIN_EMAIL,
    jwtScret : process.env.AUTH_JWT_SCRET
}

module.exports = config;