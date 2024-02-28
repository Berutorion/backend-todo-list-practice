

const todoRouter = (req,res) => {
    const method = req.method
    console.log(method)
    switch(method){
        case'GET': 
        console.log('get method')
            break;
        case 'DELETE':
        console.log('delete method')
            break;
        case 'PATCH':
        console.log('patch method')
            break;
        case 'POST':
        console.log('post method')
            break;
        default:
    }
    
    res.end()
}

module.exports = todoRouter;