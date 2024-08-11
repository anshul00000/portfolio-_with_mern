
const validate = (schema) => async (req , res , next) =>{
    try {
        
        const parsebody = await schema.parseAsync(req.body);
        req.body = parsebody;
        next();


    } catch (err) {
             const status = 422 ; 
             const message = err.errors[0].message;

         const error =  {
            status, 
            message,
         };

        // console.log(massage);
        // res.status(400).json({msg : massage});
    //    console.log(error);
        next(error);

    }
}


 function  my_anshul (req ,res , next){
    console.log("hyy from this middleware 🎉🎉");
    console.log(req.body.name);
    next();
}

module.exports = {validate , my_anshul};
 

