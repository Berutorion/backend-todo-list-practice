const http = require('http')
const todoRouter = require('./todoRouter')
const sendRes = require('./sendRes')
const {HttpError,errorHandler} = require('./Error')
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
    errorHandler(res,e)
    }
}


const server = http.createServer(serverListener)
server.listen(process.env.PORT || 8080)