const express = require('express')
const app = express()
const Router = express.Router()
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))

// render login html
Router.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"))
})

module.exports = Router