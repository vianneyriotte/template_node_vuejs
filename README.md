# Proposition de bonnes pratiques de développement - Backend/Frontend Node/Vue.js

## Objectif

Définir un template de projet **Backend/FrontEnd** en **Node/Vue.js** qui fonctionne dans un environnement de développement sous **Docker**, le plus conforme pour le déploiement sur les plateformes de pré-prod/prod (et à venir le futur K8s).

Cet environnement doit fonctionner sur **tous les types de système d'exploitation**, laissant aux developpeurs le libre choix de son système et de sa machine.

Le template devra prendre en compte l'utilisation de **variables d'environnement**, de la possibilité de se connecter à une **base de données** (dans l'exemple ici MySQL).

L'environnement de développement sera donc exécuté dans des conteneurs **Docker**, pour être au plus proche des environnements d'exploitation (dockers, pods...)

## Pré-requis - Logiciels

- Un système d'exploitation W**indows / MacOS** ou **Linux** :laughing:
- **Node**
- **Git**
- **Docker**
- **Visual Studio Code**
  - Extensions conseillées: **Docker, Docker explorer, Git lens, DotEnv, LiveServer, Prettier Now (Remi Marsal), Vue 3, Vue 3 Snippet, YAML, Material Icon Theme, Bracket Lens, Bookmarks**

##  Pré-requis langages

Le frontend (vue) comme le backend (node) seront développés en javascript. Il est préférable de coder en ECMASCRIPT 6 (et +)  qui nous apportera les notamment les évolutions suivantes:

- Les "**arrows function**" : permet de réduire le code
- La manipulation des objets facilitées:
  - **Spread Operator**, Destructuring
- **Promise** / **Callback** => **async await**
- "**import**" qui remplace les "require"
- L'utilisation de "**export**" et "**export default**"

## Création de la structure initiale des répertoires

Sur le poste de développement, nous utiliserons node pour créer les projets initiaux, mais également pour utiliser des script de lancement *(npm run xxx )* plus facilement sous VSCode. Il sera défini dans le package.json les commandes de lancement docker-compose nécessaires (*ex. lancement du frontend, lancement du backend, arrêt du backend etc.*)

Il serait tout à fait possible d'effectuer la configuration initiale des projets Front et Back sans installation de Node sur le poste de dev, mais cette solution ne sera pas choisie ici; ceci afin d'éviter de "perdre du temps" dans l'utilisation de docker en mode "**utilitaire**" pour la conrfiguration des projets.


Dans un répertoire dédié au nouveau module à développer, on va créer la structure des répertoires

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

## Backend - NodeJS

### Installation des packages nécessaires

```sh
cd backend
# Création du package.json
npm init -y
# Installation de tous les packages utilisé dans le backend node
npm i esm express body-parser cors debug morgan jsonwebtoken node-fetch fs moment lodash sequelize serverless-mysql mysql2 bcryptjs bootstrap sass
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
- **<u>jsonwebtoken</u>** : permet de gérer les JWT
- **<u>node-fetch</u>** : permet de requeter une API HTTP externe
- **<u>fs</u>** : gestion filesystem
- **<u>moment</u>** : gestion de dates/time
- **<u>lodash</u>** : manipulation des liste, array ou autres tools pratiques
- **<u>sequelize</u>** : ORM pour gérer les données en base
- **<u>serverless-mysql</u>** : pour requêter sous forme de requêtes SQL lorsqu'il faut dénormaliser ou gérer des données en masse
- **<u>mysql2</u>**: utilisé par sequelize (orm)
- **<u>nodemon</u>** : permet d'exécuter le projet en mode développement avec du hot-reloading
- **<u>bcryptjs</u>**: pour saler les mot de passe
- **<u>boostrap</u>**: pour les style css boostrap
- **<u>sass</u>**: utilisation de sass (avec boost rap par exemple ou autre...)

### Variables d'environnement

Un fichier **./sample.env** est founi, il sera donc libre à chaque développeur de recopier ce fichier en "**.env**" afin de définir les valeurs propre à son environnement.

### "Config" du projet

Un objet config permet de récupérer toutes les variables d'environnement.

Cet objet se trouve dans **./config/index.js**.

- Les différents loggers seront initialisés (utilisation du module npm "**Debug**")
- Le port d'écoute du serveur
- Les infos de connexion à une base de données (MySQL)
- La version courante du module
- Le nom du module
- L'environnement d'exécution (dev/prod/preprod) 
- Le SECRET permettant de générer les JSON Web Token
- ...

### Mises à jour de la base de données

Les objets/méthodes permettant d'effectuer des requêtes à la base de données sont définis dans **./helpers/db_connection.js**. Il est défini ici comment exécuter des requêtes, ainsi que des transactions.

Dans **./models/*** l'accès aux données est gérée avec l'ORM Sequelize. Dans ce mode, on va manipuler des objets plutôt que des requêtes.

Les mises à jour des données (modifications, ajout de structures, de data ...) sont gérées dans le fichier **./database-updates/index.js**. On y trouver des exemple avec l'utilisation des requêtes mais aussi l'utilisation des objets (*sequelize*).

### Express Server

**Express** est un "framework" node permettant de gérer les request/response http (get, post, put, delete...)

Cette partie serveur Express est configurée dans le fichier **./boostrap/index.js**.

On y trouvera:

- L'import de l'objet config
- La définition CORS (par défaut qui autorise tout)
- L'activation de **Morgan** qui est un logger de Request (activé ici en mode dev uniquement)
- La suppresion d'infos inutiles (*ex. x-powered-by*)
- La définition des parsers de request: **json**, **urlencoded**
- L'import et la chargement des routes

Ce code retourne un object "server" qui contient un méthode "start" permettant de lancer l'écoute du serveur sur le port défini.

### Point d'entrée du backend

Le point d'entrée du backend est le fichier **./index.js**.

Il se charge d'exécuter les mises à jour de base de données, puis d'importer le boostrap défini et d'exécuter le serveur (*méthode start()*)

En mode dev, **nodemon** exécutera ce point d'entrée. Cela permet d'avoir le **hot reloading** dès qu'une modification est effectuée sur le code.

### Définition des Routes

Le framework "**express**" permet de définir des routes pour chaque request. On préfèrera séparer les routes en fonction de leur couverture fonctionnelle.

On trouve donc les routes qui sont définis dans "**./routes**" avec le fichier "**./routes/index.js**" qui va rassembler les différentes routes fonctionnelles (*ex. auth/js, secured.js, home.js*).

## Frontend - VueJS

```sh
cd frontend
# Création du projet

# Ancienne méthide avec la CLI vue
# npx @vue/cli create --default --force .

# Nouvelle méthode avec le projet vitejs
npm init @vitejs/app -y . -- --template vue
npm i
npm run dev
```

La structure de base d'un projet VueJS a été créé.

Avec **vitejs**, il est possible de créer des projets template de différents types : vanilla, react, preact, vue, vue (typescript)... https://vitejs.dev/guide/#scaffolding-your-first-vite-project

L'avantage de **vitejs** est qu'il est très rapide à créer, très rapide à être exécuté, et très simple à configurer. 

On bénéficie en **Vue 3.0** du mode de programmation "**Reactive**" permettantd'effectuer des des modifications de manière déclarative.

L'architecture d'un projet Vue est très simple. 

Un projet Vue est un projet dans un langage orienté "**Components**" (comme React et Angular)

Les composants parents fournissent aux composants enfants des valeurs de **propriétés** (*:nom*), des **méthodes** répondant à des **évenemments** (*@click*). Il est possible d'utiliser des **conditions** (*:v-if*), et des **boucles** (*:v-for*) dans la partie **render**.

Le frontend (comme le backend) founit également un mécanisme de **Routes** (*et donc de Routers*)

>  Il est recommandé de NE PLUS UTILISER JQUERY (sauf grande nécessité). 

Il est possible de mettre en place **Sass** pour la gestion des styles, et d'utiliser **boostrap** ou autre gestionnaire de styles visuel.

Des modules peuvent être ajouté pour enrichir l'IHM ex: 

## Configuration Docker

```yaml
# ./docker-compose.yml

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
      - ./backend/.env
    ports:
      - 3001:3001
    volumes:
      - ./backend:/app
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
      - ./frontend/.env
    tty: true
    stdin_open: true
    ports:
      - 3000:3000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - app-network
  mysql-server:
    image: mysql/mysql-server:8.0.22-1.1.18
    container_name: mysql-server
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - TZ=Europe/Paris
    ports:
      - 3306:3306
    volumes:
      - ./_data/mysql:/var/lib/mysql
    networks:
      - app-network
  adminer:
    container_name: adminer
    image: adminer
    restart: always
    ports:
      - 3002:8080
    links:
      - mysql-server:db
    networks:
      - app-network
networks:
  app-network:
    name: app-dev-network

```

```yaml
# ./node.dockerfile

FROM node:15.10.0-alpine3.12

RUN apk add --no-cache tzdata

ENV TZ Europe/Paris
RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime

WORKDIR /app

COPY ./backend/package.json .

RUN npm install --loglevel verbose

COPY ./backend .

EXPOSE 3001

CMD npm start
```

```yaml
# ./vue.dockerfile

FROM node:15.10.0-alpine3.12

RUN apk add --no-cache tzdata

ENV TZ Europe/Paris
RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime

WORKDIR /app

COPY ./frontend/package.json .

RUN npm install --loglevel verbose

COPY ./frontend .

EXPOSE 3000

CMD npm run dev

```

```json
// ./package.json
{
	"scripts": {
		"start": "docker-compose up backend frontend",
		"stop": "docker-compose stop backend && docker-compose stop frontend && docker-compose rm -fsv frontend backend",
		"start-database": "docker-compose up mysql-server adminer",
		"stop-database": "docker-compose stop mysql-server adminer && docker-compose rm -fsv mysql-server adminer",
		"init-database": "docker exec -it mysql-server mysql -uroot -ppassword -e \"ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY 'password';GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';CREATE DATABASE IF NOT EXISTS ma_base;\"",
		"start-backend": "docker-compose up backend",
		"start-frontend": "docker-compose up frontend",
		"stop-backend": "docker-compose stop backend && docker-compose rm -fsv backend",
		"stop-frontend": "docker-compose stop frontend && docker-compose rm -fsv frontend",
		"build-backend": "docker-compose build --no-cache --force-rm backend",
		"build-frontend": "docker-compose build --no-cache --force-rm frontend",
		"backend-sh": "docker exec -it backend sh",
		"frontend-sh": "docker exec -it frontend sh",
		"stop-all": "docker-compose down && docker-compose rm -fsv"
	}
}
```


