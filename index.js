const express = require('express')
const path = require('path');
const PORT = process.env.PORT || 3000

express()
    .get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/index.html'));
    })
    .use(express.static(path.join(__dirname, 'css')))
    .use(express.static(path.join(__dirname, 'img')))
    .use(express.static(path.join(__dirname, 'jss')))
    .use(express.static(path.join(__dirname, 'pages')))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))