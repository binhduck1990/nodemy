require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.DB_PORT || 3000
const api = require('./Routes/api')
const web = require('./Routes/web')

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', api);
app.use('/', web);

app.listen(port, () => {
  console.log(`Your app listening at http://localhost:${port}`)
})
