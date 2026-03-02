import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./Pages/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Pages/Footer";
import { Loader } from "lucide-react";
import RenderLoader from "./Components/RenderLoader";
import { useLoader } from "./Contexts/LoaderContext";
function App() {
  let { showLoader, setShowLoader } = useLoader();
  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  }, []);
  return (
    <>
      <Navbar />
      {showLoader ? <RenderLoader /> : <Outlet />}
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
