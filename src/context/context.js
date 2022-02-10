import React, { useContext, useEffect, useReducer } from 'react';
import { reducer } from './reducer';
const contextApi=React.createContext()
let INITIAL_STATE={
  user: localStorage.getItem('jwt') || null,
  isFetching:false,
  error:false
}
export const ContextAppProvider = ({children}) => {
  const [state,dispatch]=useReducer(reducer,INITIAL_STATE)

  const startLogin=()=>{
    dispatch({type:'START_LOGIN'})
  }
  const loginSuccess=(user)=>{
    dispatch({type:'LOGIN_SUCCESS',payload:user})
  }
  const loginFail=()=>{
    dispatch({type:'LOGIN_FAIL'})

  }

useEffect(()=>{
  localStorage.setItem('jwt',state.user)
},[state.user])

const logoutUser=()=>{
 dispatch({type:'LOGOUT_USER'})
 window.location.replace('/')
}
  return <contextApi.Provider value={{logoutUser,loginSuccess,startLogin,loginFail,state}}>{children}</contextApi.Provider>
};


export const useGlobalContext=()=>{
    return useContext(contextApi)
}
