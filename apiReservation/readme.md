## documentation d'utilisation de l'api

- créer une base de donnée pour l'api
- créer un ficher .env en utilisant le .env.exemple et le remplir
- aller dans le terminal dans le répertoir de **apiReservation** et lancer la commande suivante

```
npm install
```

- lancer le serveur pour initialiser les tables avec

```
npm run start
```

- ouvrir un autre terminal en se mettant dans le même répertoir **apiReservation** et lancer pour ajouter des données dans la db

```
npx sequelize-cli db:seed:all
```

- ouvrir avec postman la doc avec toutes les requêtes préparé


## information supplémentaire

-possible de lancer le serveur en dev Mode avec

```
npm run devStart
```

## documentation des routes

liste de toutes les routes et body attendu dans les requêtes disponible directement dans le fichier json de postman.
Il est possible de directement importer le fichier dans postman afin de voir la documentation complète