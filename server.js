var express = require('express')
var port = process.env.PORT || 4000
var app = express()
app.use(express.static(__dirname+'/dist/'))
app.listen(port)
console.log("Listening on port " + port)