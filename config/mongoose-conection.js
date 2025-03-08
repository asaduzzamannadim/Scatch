const mongoose = require('mongoose');
var debug = require('debug')("development: mongoose")
const config = require('config')


main().then(e => debug("hay")).catch(err => debug(err));

async function main() {
  await mongoose.connect(`${config.get("MONGO_DB_URI")}/scatch`);
}

module.exports = mongoose.connection;