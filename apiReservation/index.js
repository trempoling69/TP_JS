const express = require('express')

const app = express()

const models = require('./models/index');
const syncTable = async () => {
  await models.sequelize.sync();
};

syncTable();

app.get('/', (req, res)=>{
    res.send('coucoccc')
})


const routes_reservation= require('./routes/reservation_routes');

app.use('/api/reservation', routes_reservation);

app.get('/', (req, res) => {
  res.send('coucou');
});


app.listen(3001, ()=>{
    console.log('run on 3001');
})