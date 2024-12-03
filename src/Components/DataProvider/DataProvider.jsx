import React, { createContext, useReducer } from "react";
// import { initialState } from "../../Utility/reducer";

//Initiate Data to be provided
export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};
