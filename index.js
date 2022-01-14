const express = require('express')
const path = require('path');
const PORT = process.env.PORT || 3000

express()
    .get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/index.html'));
    })
    .use(express.static('public'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))