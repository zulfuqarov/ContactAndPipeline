import { useEffect, useState } from "react";
import Context from "./ContextCrm/ContextCrm";
import { Route, Routes, useLocation } from "react-router-dom";
import Pipeline from "./Pages/Pipeline";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeadsDetails from "./Pages/LeadsDetails";
import ComplatePopaps from "./Components/ComplatePopaps";
import Welcome from "./Pages/Welcome";
import ForgetPassword from "./Pages/ForgetPassword";
import ChangePassword from "./Pages/ChangePassword";
import Register from "./Pages/Register";
import ContextUser from "./ContextCrm/ContextUser";
import DashBoard from "./Pages/DashBoard";
import Contacts from "./Pages/Contacts/Contacts";
import UploadFile from "./Pages/UploadFile/UploadFile";
import ContactDeleteModal from "./Components/ContactDeleteModal";
import ContextContact from "./context-conact/ContextContact";

function App() {
  const location = useLocation();

  const noNavbarRoutes = ["/", "/Login", "/Register", "/Forget-Password", "/Change-Password"]
  const hideNavbar = noNavbarRoutes.includes(location.pathname);



  return (
    <>
      <ContextUser>
        <Context>
          <ContextContact>
            < ToastContainer />
            {hideNavbar ? null : <ComplatePopaps />}
            {hideNavbar ? null : <Navbar />}
            {hideNavbar ? null : <ContactDeleteModal />}
            <Routes>
              <Route path="/Login" element={<Welcome />} />
              <Route path="/Dashboard" element={<DashBoard />} />
              <Route path="/Register" element={< Register />} />
              <Route path="/Forget-Password" element={<ForgetPassword />} />
              <Route path="/Change-Password" element={<ChangePassword />} />

              <Route path="/Pipeline" element={<Pipeline />} />
              <Route path="/Leads/:id" element={<LeadsDetails />} />
              <Route path="/Contacts" element={<Contacts />} />
              <Route path="/Upload-File" element={<UploadFile />} />

            </Routes>
          </ContextContact>
        </Context>
      </ContextUser>
    </>
  );
}

export default App;
