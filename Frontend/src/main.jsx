import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import About from "./Pages/About.jsx";
import Signup from "./Pages/Signup.jsx";
import AllContexts from "./Contexts/AllContexts.jsx";
import Profile from "./Pages/Profile.jsx";
import LoaderContext from "./Contexts/LoaderContext.jsx";
let myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
    </Route>,
  ),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoaderContext>
      <AllContexts>
        <RouterProvider router={myRouter} />
      </AllContexts>
    </LoaderContext>
  </StrictMode>,
);
