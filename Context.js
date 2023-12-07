import React, { useContext } from "react";


export const AuthContext = React.createContext();

export const AppContext = ()=>{
  return useContext(AuthContext)
}