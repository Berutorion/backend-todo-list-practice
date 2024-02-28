
const { HttpError } = require('./Error')
const sendRes = require('./sendRes')
const { v4 }  = require('uuid')



const todoRouter = async(req,res,todoList) => {
    const method = req.method
try{
    switch(method){
        case'GET': 
        getAll(res,todoList)
            break;
        case 'DELETE':
        console.log('delete method')
            break;
        case 'PATCH':
        console.log('patch method')
            break;
        case 'POST':
            const data = await getDataFromRequest(req)
            createTodo(res,todoList,data)
            break;
        default:
    }
}catch(e){
    if(e.statusCode !== undefined){
        sendRes(res,e.statusCode,e.message);
    }else{
        console.log(e)
        sendRes(res,500,'It have some error, please try again .');
    }
    } 
}

const getAll = (res,todoList) => {
    console.log("GET", todoList)
    sendRes(res,200,todoList)
}

const createTodo = (res,todoList,data) => {
    if(!data.title) throw new HttpError('Input does not conform to the format',400)
    const todo = {
        title:data.title,
        id : v4()
    }
    todoList.push(todo)
    sendRes(res,200,todo)
}

const getDataFromRequest = (req) => {
    return new Promise((resolve, reject) => {
        let data = '';
        
        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                resolve(parsedData);
            } catch (error) {
                reject(error);
            }
        });

        req.on('error', (error) => {
            reject(error);
        });
    });
};

module.exports = todoRouter;