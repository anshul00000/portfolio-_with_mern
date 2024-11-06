const { z } = require("zod");

// create an object schema 

const signupschema = z.object({


    username: z.string({message : "name is reuired"}).min(3 , {message : "name must be al least 3 char."}).max(30),

    email: z.string({message : "invalid email address is string"}).email({message : "invalid email address"}),

    password: z.string({message : "invalid password is string"}).min(8 , {message : "password must be al least 8 char."}).max(20 , {message : "password is not contain longer then 20 char."}),


    phone: z.string({message : "invalid phone is string"}).min(10, {message : "phone number must be at least 10 char ."}).max(15 ,  {message : "phone number must not be more then 10 char ."}),


});



const loginschema = z.object({
    email: z.string().email({message : "invalid email address"}),

    password: z.string().min(8 , {message : "password must be at least 6 Character"}).max(20 , {message : "password must not be more then 20 Character"}),
});


const projectschema = z.object({


    name: z.string({message : "Name to dalo bhai 👇🏻"}).min(3 , {message : "name must be al least 3 char."}).max(30),

    description: z.string({message : "description is important 👇🏻"}),

    technologys: z.string({message : "are bhai ye to btao bnaya kese  👇🏻"}).min(1).max(20),
    
    github_link: z.string({message : "phle github pe dalo 👇🏻"}).min(1).max(20),


});

module.exports = {signupschema , loginschema , projectschema}; 