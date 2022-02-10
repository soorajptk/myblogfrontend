export const reducer=(state,action)=>{
    switch (action.type) {
        case 'START_LOGIN':
        return {...state,isFetching:true}            
        case "LOGIN_SUCCESS":
        return {user:action.payload,isFetching:false,error:false}        
        case "LOGIN_FAIL":
            return {...state,error:true,isFetching:false}
        case "LOGOUT_USER":
            return {...state,user:null}

        default:
            return state
    }
}