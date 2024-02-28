
const headerConfig = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
   'Content-Type': 'application/json'
 }

const sendRes = (res,statusCode,content) => {
    res.writeHead(statusCode,headerConfig)
    let resData = {}
    if(statusCode === 200){
        resData = {
                    status:'success',
                    data:content
                  }
    }else{
        resData = {
            status:'faild',
            message:content
        }
    }
    res.write(JSON.stringify(resData))
    console.log('send res')
    res.end()
}

module.exports = sendRes;