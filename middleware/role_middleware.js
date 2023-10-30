const identify_role=(my_role)=>{


    return(request,response,next)=>{


        if(my_role.includes(request.body.role)){


           return next();


        }
        
        
        else{

            return response.status(403).send('gap');

        }


    }
   
}


module.exports={identify_role};