const express = require('express')
const server = express()
const args = process.argv;
var setport

if (args.length > 2)
    setport = args[2]
else
    setport = 8080

const port = setport
server.use(express.static('static'))

server.get('/', (req, res) => {
    res.send('Welcome To My Webserver')
    console.log("Incoming GET Request")
    console.log(req.headers)
})

server.get('*', (req, res) => {
    res.send('Fuck OFF (GET)')
    console.log("Incoming Invalid GET Request")
    console.log(req.headers)
})

server.post("*", (req, res) => {
    res.send('Fuck OFF (POST)')
    console.log("Incoming POST Request")
    console.log(req.headers)
})

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})