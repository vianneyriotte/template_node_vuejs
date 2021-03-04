# Proposition d'exemple de configuration de relation avec Sequelize
## Enveloppe

```javascript
// ./models/envelope.js
const Sequelize = require('sequelize');

export default {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	recuperee: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	id_user_recupere: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	id_user_traite: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	date: {
		type: Sequelize.DATE,
		allowNull: true
	}
};
```

## User

```javascript
// ./models/user.js
const Sequelize = require('sequelize');

export default {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		notEmpty: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true,
		primaryKey: true
	},
	firstname: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true
	},
	lastname: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true
	}
};
```

## Définitions (relations...)

```javascript
// ./models/index.js
import Sequelize from 'sequelize';

import config from '../config';

import user from './user';
import envelope from './envelope';

const { MYSQL_DBHOST, MYSQL_DBUSER, MYSQL_DBPWD, MYSQL_DBPORT, DBNAME, DB_LOGS } = config.db;
const sequelize = new Sequelize(DBNAME, MYSQL_DBUSER, MYSQL_DBPWD, {
	host: MYSQL_DBHOST,
	port: MYSQL_DBPORT,
	logging: DB_LOGS ? true : false,
	dialect: 'mysql',
	freezeTableName: true
});

// Définition des tables
const User = sequelize.define('users', user, {
	tableName: 'users',
	timestamps: false
});
const Envelope = sequelize.define('envelope', envelope, {
	tableName: 'envelope',
	timestamps: false
});
// Définition des relations
Envelope.hasOne(User, {
	foreignKey: 'id',
	sourceKey: 'id_user_traite',
	as: 'UserTraite',
	constraints: false
});
Envelope.hasOne(User, {
	foreignKey: 'id',
	sourceKey: 'id_user_recupere',
	as: 'UserRecupere',
	constraints: false
});

User.hasMany(Envelope, {
	foreignKey: 'id_user_traite',
	sourceKey: 'id',
	as: 'EnveloppesTraitees',
	constraints: false
});
User.hasMany(Envelope, {
	foreignKey: 'id_user_recupere',
	sourceKey: 'id',
	as: 'EnveloppesRecuperees',
	constraints: false
});

User.sync();
Envelope.sync();

export default {
	User,
	Envelope
};
```

## Exemple d'utilisation

```javascript
import models from '../models';
import { salt } from '../helpers/security';
import config from '../config';
import Sequelize from 'sequelize';

// ...

// Création de 2 users
let user = await models.User.findOrCreate({
	where: { email: 'john@doe.com' },
	defaults: { id: 1, email: 'john@doe.com', firstname: 'John', lastname: 'DOE', password: salt('abcd') }
});

user = await models.User.findOrCreate({
	where: { email: 'marge@simpson.com' },
	defaults: { id: 2, email: 'marge@simpson.com', firstname: 'Marge', lastname: 'SIMPSON', password: salt('abcd') }
});

// Création de 2 enveloppes
let envelope = await models.Envelope.findOrCreate({
	where: { id: 1 },
	defaults: { id: 1, recuperee: true, id_user_recupere: 1, id_user_traite: 2, date: Sequelize.fn('NOW') }
});

envelope = await models.Envelope.findOrCreate({
	where: { id: 2 },
	defaults: { id: 2, recuperee: true, id_user_recupere: 1, id_user_traite: 1, date: Sequelize.fn('NOW') }
});

// Exemple de récupération  d'enveloppe et de user
const testEnveloppe = await models.Envelope.findOne({
	where: { id: 1 },
	include: [ 'UserTraite', 'UserRecupere' ]
});

const testUser = await models.User.findOne({
	where: { id: 1 },
	include: [ 'EnveloppesTraitees', 'EnveloppesRecuperees' ]
});

const testUser2 = await models.User.findOne({
	where: { id: 2 },
	include: [ 'EnveloppesTraitees', 'EnveloppesRecuperees' ]
});

// Affichage des traces
loggers.trace(JSON.stringify(testEnveloppe));
loggers.trace(JSON.stringify(testUser));
loggers.trace(JSON.stringify(testUser2));
// ...
```

Exemple de traces:
```javascript
// loggers.trace(JSON.stringify(testEnveloppe));
{
   "id":1,
   "recuperee":true,
   "id_user_recupere":1,
   "id_user_traite":2,
   "date":"2021-03-04T19:59:24.000Z",
   "UserTraite":{
      "id":2,
      "email":"marge@simpson.com",
      "firstname":"Marge",
      "lastname":"SIMPSON",
      "password":"$2a$10$YqIrJjw48I2pRW0V3YICOemuCMgKpxIO5/1AwxJqmOCVhoG225IOK"
   },
   "UserRecupere":{
      "id":1,
      "email":"john@doe.com",
      "firstname":"John",
      "lastname":"DOE",
      "password":"$2a$10$6hDp/Bq7fz6zvwQeXy5KmOtFZN3w5ksUXlbzm5Yr0pEJU0rFrSbiS"
   }
}
```

```javascript
// loggers.trace(JSON.stringify(testUser));
{
   "id":1,
   "email":"john@doe.com",
   "firstname":"John",
   "lastname":"DOE",
   "password":"$2a$10$6hDp/Bq7fz6zvwQeXy5KmOtFZN3w5ksUXlbzm5Yr0pEJU0rFrSbiS",
   "EnveloppesTraitees":[
      {
         "id":2,
         "recuperee":true,
         "id_user_recupere":1,
         "id_user_traite":1,
         "date":"2021-03-04T19:59:24.000Z"
      }
   ],
   "EnveloppesRecuperees":[
      {
         "id":2,
         "recuperee":true,
         "id_user_recupere":1,
         "id_user_traite":1,
         "date":"2021-03-04T19:59:24.000Z"
      },
      {
         "id":1,
         "recuperee":true,
         "id_user_recupere":1,
         "id_user_traite":2,
         "date":"2021-03-04T19:59:24.000Z"
      }
   ]
}
```