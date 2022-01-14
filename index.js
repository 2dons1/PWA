const express = require('express')
const path = require('path');
const PORT = process.env.PORT || 3000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .get('/', function(req, res) {
        res.sendFile(path.join(__dirname, "public", "/index.html"));
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))