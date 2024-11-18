// import jwt from 'jsonwebtoken'
// var expiretime = 3600;

// const tokengenerate = (payload) => {
//     var token_value = jwt.sign({ data: payload }, process.env.SECRETKEY, { expiresIn: expiretime });
//     console.log(token_value);
//     return token_value;
// }

// const verifytoken = (req, res, next) => {
//     // console.log("verify token func called");
//     // console.log(req.headers) 
//     // console.log(req.headers.authorization)
//     try{

//         var tokenFromFrontend = req.headers.authorization.split(' ')[1];

//         var decoded = jwt.verify(tokenFromFrontend, process.env.SECRETKEY);
//         console.log(decoded);
//         next();


//     } 
//     catch(err){
//         console.log(err);
//         return false;
//     }



// }

// export {
//     tokengenerate,
//     verifytoken
// }