import React, { createContext, useContext } from 'react'
import { useLocation } from 'react-router-dom';

const LocationContext = createContext(undefined);

export const LocationProvider = ({ children }) => {
    const location = useLocation();
    return (
      <LocationContext.Provider value={location}>
        {children}
      </LocationContext.Provider>
    );
  };
  
  export const useLocationContext = () => useContext(LocationContext);