# Sequelize

```sh
npm install --save sequelize-cli
node_modules/.bin/sequelize init 
```

4 répertoires vont être créé:

- **config/config.json**
- **models/index.js**
- **seeders/**
- **migrations/**

On va renommer le fichier **config.json** en **config.js** :

```json
// config.js
module.exports = {
	development: {
		username: process.env.MYSQL_DBUSER,
		password: process.env.MYSQL_DBPWD,
		database: process.env.DBNAME,
		host: process.env.MYSQL_DBHOST,
		port: process.env.MYSQL_DBPORT,
		dialect: 'mysql'
	},
	test: {
		username: process.env.MYSQL_DBUSER,
		password: process.env.MYSQL_DBPWD,
		database: process.env.DBNAME,
		host: process.env.MYSQL_DBHOST,
		port: process.env.MYSQL_DBPORT,
		dialect: 'mysql'
	},
	production: {
		username: process.env.MYSQL_DBUSER,
		password: process.env.MYSQL_DBPWD,
		database: process.env.DBNAME,
		host: process.env.MYSQL_DBHOST,
		port: process.env.MYSQL_DBPORT,
		dialect: 'mysql'
	}
};
// On va garder ce format pour le bon fonctionne de la CLI Sequelize
```

On va modifier **./models/index.js**

```javascript
// ...
// const config = require(__dirname + '/../config/config.json')[env];
const config = require(__dirname + '/../config/config.js')['development']; // Modification
// ...
```

On va créer notre premier model **User** et notre model **Envelope**:

```sh
npx sequelize-cli model:generate --name User --attributes email:string,firstname:string,lastname:string,password:string 

npx sequelize-cli model:generate --name Envelope --attributes recuperee:boolean,id_user_recupere:integer,id_user_traite:integer,date:date
```

On va supprimer les **dropTable** des fichiers de migration (**./migrations/xxxxxx-create-user.js, xxxxxxx-create-envelope.js**) pour éviter une erreur surtout en production...:

```js
// ...
down: async (queryInterface, Sequelize) => {
   // await queryInterface.dropTable('Users');
  }
// ...
```

On va ajouter les champs Id dans les models:

```js
// Dans ./models/envelope.js
// ...
Envelope.init({
    id: DataTypes.INTEGER,
    recuperee: DataTypes.BOOLEAN,
    id_user_recupere: DataTypes.INTEGER,
    id_user_traite: DataTypes.INTEGER,
    date: DataTypes.DATE
  }
// ...
   
// Dans ./models/user.js
// ...
User.init({
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING
  }
// ...
```

On va ajouter les associations:

```js
// Dans ./models/user.js
// ...
static associate(models) {
     User.hasMany(models.Envelope, {
				foreignKey: 'id_user_traite',
				sourceKey: 'id',
				as: 'EnveloppesTraitees',
				constraints: false
			});
			User.hasMany(models.Envelope, {
				foreignKey: 'id_user_recupere',
				sourceKey: 'id',
				as: 'EnveloppesRecuperees',
				constraints: false
			});
    }
// ...

// Dans ./models/envelope.js
// ...
	static associate(models) {
			Envelope.hasOne(models.User, {
				foreignKey: 'id',
				sourceKey: 'id_user_traite',
				as: 'UserTraite',
				constraints: false
			});
			Envelope.hasOne(models.User, {
				foreignKey: 'id',
				sourceKey: 'id_user_recupere',
				as: 'UserRecupere',
				constraints: false
			});
		}
// ...
```

On va lancer la migration:

```sh
node_modules/.bin/sequelize db:migrate
```


