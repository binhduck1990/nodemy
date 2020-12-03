const express = require('express')
const app = express()
const port = 3000
const postRoutes = require('./routes/postRoute')
const userRoutes = require('./routes/userRoute')
const bodyParser = require('body-parser')
require('./config/database')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Your app listening at http://localhost:${port}`)
})
