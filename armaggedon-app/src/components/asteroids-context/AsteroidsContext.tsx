import React, {createContext, FC, ReactNode, useState} from "react";
import {RouterProvider} from "react-router-dom";

export const AsteroidsContext = createContext(null);

type AsteroidsContentProviderProps = {
  children?: ReactNode
};

export const AsteroidsContextProvider: FC<AsteroidsContentProviderProps> = ({children})=>{
    const [onlyDangerous, setonlyDangerous] = useState(false)
    const [onlyhdistanceMode, setonlyhdistanceMode] = useState(true)
    return <AsteroidsContext.Provider value={{onlyDangerous, setonlyDangerous, onlyhdistanceMode, setonlyhdistanceMode}}>
        {children}
    </AsteroidsContext.Provider>
}