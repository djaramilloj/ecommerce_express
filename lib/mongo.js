const {MongoClient, ObjectId} = require('mongodb');
const config  = require('../config/index.js');

const MONGO_URI = config.mongo_uri;
const DB_NAME = config.db_name;

class mongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if(err) {
                    reject(err)
                }
                console.log('mongo successfully connected');
                resolve(this.client.db(DB_NAME))
            })
        })
    }

    getAll(collection, query) {
        return this.connect().then(db => {
            return db.collection(collection)
            .find(query)
            .toArray();
        })
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection)
            .findOne({_id: ObjectId(id)})
        })
    }

    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection)
            .insertOne(data)
        })
        .then(result => result.insertedId)
    }

    update(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection)
            .updateOne({_id: ObjectId(id)}, {$set: data}, {upsert: true})
        })
        .then(result => result.upsertedId || id)
    }

    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection)
            .updateOne({_id: ObjectId(id)})
        })
        .then(result => result.deletedId || id)
    }
}

module.exports = mongoLib;