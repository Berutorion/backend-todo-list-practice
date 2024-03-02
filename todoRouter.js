
const { HttpError,errorHandler } = require('./Error')
const sendRes = require('./sendRes')
const { v4 }  = require('uuid')

const todoRouter = async(req,res,todoList) => {
    const method = req.method
    const id =  req.url.split('/').length < 3 ? "" : req.url.split('/').pop();
    let data = {}
    if(method === 'PATCH' || method === 'POST' ){
         data = await getDataFromRequest(req)
    }
try{
    switch(method){
        case'GET': 
        getAll(res,todoList)
            break;
        case 'DELETE':
            if(id !== ''){
                console.log('delete by id',id)
                deleteById(res,todoList,id)
            }else{
                console.log('delete all')
                deleteAll(res,todoList)
            }
            break;
        case 'PATCH':
            const todoData = getById(res,todoList,id)
            updateTodo(res,todoData,data)
            break;
        case 'POST':
            createTodo(res,todoList,data)
            break;
        default:
    }
}catch(e){
    errorHandler(res,e)
    } 
}

const getAll = (res,todoList) => {
    sendRes(res,200,todoList)
}

const getById = (res,todoList,id) => {
    const index = todoList.findIndex(ele => ele.id === id)
    if(index === -1) throw new HttpError('The data is not found.', 400)
    return todoList[index]
}

const createTodo = (res,todoList,data) => {
    if(!data.title) throw new HttpError('Input does not conform to the format.',400)
    const todo = {
        title:data.title,
        id : v4()
    }
    todoList.push(todo)
    sendRes(res,200,todo)
}

const updateTodo = (res,todoData,data) => {
    if(!data.title) throw new HttpError('Input does not conform to the format.',400)
   todoData.title = data.title
   sendRes(res,200,todoData)
}

const deleteAll = (res,todoList) => {
    todoList.length = 0
    sendRes(res,200,'Success to delete all data.')
}

const deleteById = (res,todoList,id) => {
    const index = todoList.findIndex(ele => ele.id === id)
    if(index === -1) throw new HttpError('The data is not found.', 400)
    const deletedData = todoList.splice(index,1)
    sendRes(res,200,deletedData)
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