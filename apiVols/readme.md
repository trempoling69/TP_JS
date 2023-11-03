# documentation

## Installer le projet

- lancer

```
npm install
```

- Dans config/config.json remplir les info de connexion à la base de donnée
- Créer une base de donnée qui correspond au nom mis dans le config.json à la ligne "database":
- lancer le projet pour créer les tables
- lancer les seeds de la base de donnée en lançant

```
npx sequelize-cli db:seed:all
```

## Lancer le projet

```
npm run devStart
```

## documentation des routes

liste de toutes les routes et body attendu dans les requêtes disponible directement dans le fichier json de postman.
Il est possible de directement importer le fichier dans postman afin de voir la documentation complète
