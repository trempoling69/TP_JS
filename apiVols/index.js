const express = require('express');

const app = express();

const models = require('./models/index');
const syncTable = async () => {
  await models.sequelize.sync();
};

syncTable();

const routes_vol = require('./routes/vols_routes');

app.use('/api/flight', routes_vol);

app.get('/', (req, res) => {
  res.send('coucou');
});

app.listen(3000, () => {
  console.log('listen 3000');
});
