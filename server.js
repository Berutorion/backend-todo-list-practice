const http = require('http')
const todoRouter = require('./todoRouter')
const sendRes = require('./sendRes')
const {HttpError} = require('./Error')
const todoList = [];

const serverListener = (req,res) => {
const url = req.url.split('/')[1]
try{
    if(req.url === '/'){
        sendRes(res,200,'Welcome')
    }else if(url === 'todo'){
        todoRouter(req,res,todoList)
    }else{
        throw new HttpError('Can\'t find page',404)
    }
}catch(e) {
    if(e.statusCode !== undefined){
        sendRes(res,e.statusCode,e.message);
    }else{
        console.log(e.message)
        sendRes(res,500,'It have some error, please try again .');
    }
    }
}


const server = http.createServer(serverListener)
server.listen(8080)