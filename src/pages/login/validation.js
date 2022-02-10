
export const validation=(data)=>{
    let error={}
    if(!data.email){
        error.email='email field can not be empty'
    }else if(!( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email))){
        error.email='email is not valid'
    }
    if(!data.password){
        error.password='password field can not be empty'
    }else if(data.password.length<6){
        error.password='password length too short '

    }
    
    return error
}