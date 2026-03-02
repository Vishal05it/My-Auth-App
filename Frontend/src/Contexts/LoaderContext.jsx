import React, { createContext, useContext, useState } from "react";
const loaderContext = createContext();
function LoaderContext({ children }) {
  let [showLoader, setShowLoader] = useState(false);
  return (
    <loaderContext.Provider value={{ showLoader, setShowLoader }}>
      {children}
    </loaderContext.Provider>
  );
}
export const useLoader = () => {
  return useContext(loaderContext);
};
export default LoaderContext;
