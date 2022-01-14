const express = require('express')
const path = require('path');
const PORT = process.env.PORT || 3000

express()
    .use(express.static(path.join(__dirname, 'css')))
    .use(express.static(path.join(__dirname, 'img')))
    .use(express.static(path.join(__dirname, 'jss')))
    .use(express.static(path.join(__dirname, 'pages')))
    .get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/index.html'));
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))