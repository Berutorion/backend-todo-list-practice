const http = require('http')

const serverListener = (req,res) => {
const headerConfig = {
   'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json'
}

let data = ''

req.on('data' , (chuck) => {
    data += chuck
})

req.on('end' , () => {
    console.log(data)
})

if(req.url === '/' && req.method === 'GET'){
    res.writeHead(200,headerConfig)
    res.write('Welcome')
    res.end()
}else if(req.url === '/' && req.method === 'DELETE'){
    res.writeHead(200,headerConfig)
    res.write('Welcome')
    res.end()
}else if(req.method === 'OPTIONS' ){
    res.writeHead(200,headerConfig)
    res.end()
}else{
    res.writeHead(404,headerConfig)
    res.write('Can\'t find the page')
    res.end()
}
  
}

const server = http.createServer(serverListener)
server.listen(8080)