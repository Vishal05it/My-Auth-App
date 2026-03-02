import React, { createContext, useContext, useState } from "react";
const allContexts = createContext();
function AllContexts({ children }) {
  let [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || "",
  );
  let [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  let [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {},
  );
  let [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLogin") || false),
  );
  let darkModeFunc = () => {
    let htmlTag = document.querySelector("html");
    htmlTag.classList.remove("light");
    htmlTag.classList.add("dark");
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  };
  let lightModeFunc = () => {
    let htmlTag = document.querySelector("html");
    htmlTag.classList.remove("dark");
    htmlTag.classList.add("light");
    setTheme("light");
    localStorage.setItem("theme", "light");
  };
  return (
    <allContexts.Provider
      value={{
        userToken,
        setUserToken,
        theme,
        setTheme,
        lightModeFunc,
        darkModeFunc,
        isLogin,
        setIsLogin,
        user,
        setUser,
      }}
    >
      {children}
    </allContexts.Provider>
  );
}
export const useAllContexts = () => {
  return useContext(allContexts);
};
export default AllContexts;
