const http = require('http')
const todoRouter = require('./todoRouter')
const sendRes = require('./sendRes')
const {HttpError} = require('./Error')

const serverListener = (req,res) => {
const url = req.url.split('/')[1]
const headerConfig = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
   'Content-Type': 'application/json'
 }

try{
    if(req.url === '/'){
        sendRes(res,200,'Welcome')
    }else if(url === 'todo'){
        res.writeHead(200,headerConfig)
        todoRouter(req,res)
    }else{
        throw new HttpError('Can\'t find page',404)
    }
}catch(e) {
    if(e.statusCode !== undefined){
        sendRes(res,e.statusCode,e.message);
    }else{
        sendRes(res,500,'It have some error, please try again .');
    }
    }
}


const server = http.createServer(serverListener)
server.listen(8080)