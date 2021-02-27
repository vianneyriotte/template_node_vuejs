# Recommandations et bonnes pratiques de développement - Backend/Frontend Node/Vue.js



## Objectif

Définir un template de projet Backend/FrontEnd en Node/Vue.js qui fonctionne dans un environnement de développement sous Docker, le plus conforme pour le déploiement sur les plateformes de pré-prod/prod (et à venir le futur K8s).

Le template devra prendre en compte l'utilisation de variables d'environnement, de la possibilité de se connecter à une base de données (dans l'exemple MySQL).

L'environnement de développement sera exécuté dans ces conteneurs Docker, pour être au plus proche des environnements d'exploitation (dockers, pods...)

## Pré-requis

- Un système d'exploitation Windows / MacOS ou Linux
- Node
- Git
- Docker
- Visual Studio Code



## Création de la structure initiale des répertoires

Sur le poste de développement, nous utiliserons node pour créer les projets initiaux, mais également pour lancer les script de lancement *(npm run xxx )* plus facilement sous VSCode.

Il serait tout à fait possible d'effectuer la configuration des projets Front et Back sans installation de Node sur le poste de dev, mais cette solution ne sera pas choisie ici.


Dans un répertoire dédiée au nouveau module à développer, on va créer la structure des répertoires

```sh
mkdir mon_projet_web
cd mon_projet_web
# Création du répertoire pour le backend
mkdir backend
# Création du répertoire pour le frontend
mkdir frontend
# Création du répertoire du package.json pour les différents lancements
npm init -f
# Lancement de vscode
code .
```

## Création du projet NodeJS

#### Installation des packages nécessaires

```sh
cd ../backend
# Création du package.json
npm init -y
# Installation de tous les packages utilisé dans le backend node
npm i esm express body-parser cors debug morgan jsonwebtoken node-fetch fs moment lodash sequelize serverless-mysql mysql2 bcryptjs
npm i --save-dev nodemon
```

Description des packages installés:

- **<u>esm</u>** : permet d'écrire du code node en Ecmascript plutôt qu'en CommonJS
  - Ex. remplacer les **require** par des **import**, ou des **module.exports** par des **export default** ...
- **<u>express</u>** : framework permettant de gérer les requests/responses, avec middleware, routers et autres modules ultra-pratiques pour un serveur d'APIs backend
- **<u>body-parser</u>** : permet de parser automatiquement les requête json, url ou autres...
- **<u>cors</u>** : pour gérer la configuration cors (cross origin resource sharing)
- **<u>debug</u>** : fournit un logger permettant de logger à différents niveaux (debug, trace, error ...)
- **<u>morgan</u>** : morgan est un middleware express permettant de logger les request/response
-  **<u>jsonwebtoken</u>** : permet de gérer les JWT
- **<u>node-fetch</u>** : permet de requeter une API HTTP externe
- **<u>fs</u>** : gestion filesystem
- **<u>moment</u>** : gestion de dates/time
- **<u>lodash</u>** : manipulation des liste, array ou autres tools pratiques
- **<u>sequelize</u>** : ORM pour gérer les données en base
- **<u>serverless-mysql</u>** : pour requêter sous forme de requêtes SQL lorsqu'il faut dénormaliser ou gérer des données en masse
- **<u>nodemon</u>** : permet d'exécuter le projet en mode développement avec du hot-reloading

#### Création et configuration du projet

Création des fichiers / répertoires

```sh
touch index.js && mkdir -p bootstrap && touch ./bootstrap/index.js && mkdir -p config && touch ./config/index.js	&& touch .gitignore && touch sample.env && mkdir -p database-updates && touch ./database-updates/index.js && mkdir -p helpers && touch ./helpers/db_connection.js && mkdir -p routes && touch ./routes/index.js && touch ./routes/home.js && touch ./routes/auth.js && mkdir -p middlewares && touch ./middlewares/auth.js && touch ./routes/secured.js && touch ./helpers/security.js
```

- **.gitignore**

```yaml
# .gitignore

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*
```

- **sample.env** (à copier en .env)

```js
# sample.env

# Port d'écoute du serveur
SERVER_PORT=8081

# On active tous les types de logs
DEBUG=app:debug,app:fatal,app:erreur,app:info,app:trace,app:db

# Pour les JWT
JWTSECRET=azerty;1234$

# Parametres SGBD
MYSQL_DBHOST=hlp-sql
MYSQL_DBUSER=root
MYSQL_DBPWD=
MYSQL_DBPORT=3306
DBNAME=hlp_publicite
```

- **./database-updates/index.js**

```js
# ./database-updates/index.js

```

- **./helpers/db_connection.js**

```js
# ./helpers/db_connection.js

```

- **./routes/home.js**

```js
# ./routes/home.js

```

- **./routes/auth.js**

```js
# ./routes/auth.js

```

- **./routes/secured.js**

```js
# ./routes/secured.js

```

- **./routes/index.js**

```js
# ./routes/index.js

```

- **./middlewares/auth.js**

```js
# ./middlewartes/auth.js

```

- **./helpers/security.js**

```js
# ./helpers/security.js

```

- **./bootstrap/index.js**

```js
# ./bootstrap/index.js

```

- **./config/index.js**

```js
# ./config/index.js

```

## Création du projet Frontend (vuejs)

```sh
cd frontend
# Création du projet
# npx @vue/cli create --default --force .
# Nouvelle méthode avec le projet vitejs
npm init @vitejs/app -y . -- --template vue
npm i
npm run dev
```

La structure de base d'un projet VueJS a été créé.

Avec vitejs, il est possible de créer des projets template de différents types : vanilla, react, preact, vue, vue (typescript)... https://vitejs.dev/guide/#scaffolding-your-first-vite-project

## Configuration Docker

```sh
cd docker
touch docker_compose.yml
touch node.dockerfile
touch vue.dockerfile
```

```yaml
# ./docker/docker-compose.yml

version: "3.8"
services:
  backend:
    build:
      context: ./
      dockerfile: ./node.dockerfile
    image: backend
    container_name: backend
    tty: true
    stdin_open: true
    env_file:
      - ../backend/.env
    ports:
      - 1337:8081
    volumes:
      - ../backend:/app
      - /app/node_modules
    networks:
      - app-network
  frontend:
    build:
      context: ./
      dockerfile: ./vue.dockerfile
    container_name: frontend
    image: frontend
    env_file:
      - ../frontend/.env
    tty: true
    stdin_open: true
    ports:
      - 1338:3000
    volumes:
      - ../frontend:/app
      - /app/node_modules
    networks:
      - app-network
networks:
  app-network:
    name: app-dev-network

```

```yaml
# ./docker/node.dockerfile

FROM node:12.18.1-alpine

RUN apk add --no-cache tzdata

# Compatiblite Mac Apple Silicon (M1)
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

ENV TZ Europe/Paris
RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime

WORKDIR /app

COPY ./backend/package.json .

RUN npm install --loglevel verbose

COPY ./backend .

EXPOSE 8080

CMD ./node_modules/.bin/nodemon  --unhandled-rejections=strict --legacy-watch -r esm -r ./src/index.js
```

```yaml
# ./docker/vue.dockerfile


```

```js
# .dockerignore

node_modules/
```


