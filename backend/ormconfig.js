require('dotenv').config()
const join = require('path').join

module.exports = {
   "type": "postgres",
   "host": process.env.TYPEORM_HOST,
   "port": process.env.TYPEORM_PORT,
   "username": process.env.TYPEORM_USERNAME,
   "password": process.env.TYPEORM_PASSWORD,
   "database": process.env.TYPEORM_DATABASE,
   "synchronize": true,
   "logging": false,
   "entities": [
      join(__dirname, 'entity', '**', '*.{ts,js}')
   ],
   "migrations": [
      join(__dirname, 'migration', '**', '*.{ts,js}')
   ],
   "subscribers": [
      join(__dirname, 'subscriber', '**', '*.{ts,js}')
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
