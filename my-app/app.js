const express = require('express')
const app = express()
const port = 3000
const api = require('./Routes/api')
const web = require('./Routes/web')

app.use('/api', api);
app.use('/', web);

app.listen(port, () => {
  console.log(`Your app listening at http://localhost:${port}`)
})
