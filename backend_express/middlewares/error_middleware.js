const errormiddleware = (err , rwq , res , next)=>{

    const status = err.status || 500 ; 
    const message = err.message || "Backend Error" ; 
    const extradetails = err.extradetails || "Error fron Backend " ; 
 
     return res.json({message, extradetails}) ;

};

module.exports = errormiddleware ;

// exporting the function as a module .  we can use this function in our routes to handle errors.  It will automatically be used if an error occurs in our routes.  It will return a JSON response with the status, message, and extradetails.  If no status or message is provided, it will default to 500 and "Backend Error".  If no extradetails is provided, it will default to