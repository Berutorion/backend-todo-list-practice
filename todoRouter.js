

const todoRouter = (req,res) => {
    let data = ''
    const method = req.method
    req.on('data' , (chuck) => {
        data += chuck
    })

    req.on('end' , () => {
        data = JSON.parse(data)
    })
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