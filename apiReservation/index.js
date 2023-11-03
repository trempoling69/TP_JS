const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express()

app.use(bodyParser.json());

const models = require('./models/index');
const syncTable = async () => {
  await models.sequelize.sync();
};

syncTable();

app.get('/', (req, res)=>{
    res.send('coucoccc')
})


const routes_reservation= require('./routes/reservation_routes');

const routes_user = require('./routes/user_route');

app.use('/api/user', routes_user);

app.use('/api/reservation', routes_reservation);

app.get('/', (req, res) => {
  res.send('coucou');
});


app.listen(3001, ()=>{
    console.log('run on 3001');
})