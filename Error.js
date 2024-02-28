const sendRes = require("./sendRes");

class HttpError extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const errorHandler = (res,e) => {
    if(e.statusCode !== undefined){
        sendRes(res,e.statusCode,e.message);
    }else{
        console.log(e.message)
        sendRes(res,500,'It have some error, please try again .');
    }
}

module.exports = {HttpError,errorHandler}