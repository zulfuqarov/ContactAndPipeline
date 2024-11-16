import React, { useContext, useState } from "react";
import { ContactContext } from "../context-conact/ContextContact";
import successImage from "../../src/assets/img/create-sucss.png";
const ContactCreateSuccesModal = () => {
  const {createContactSuccs, setCreateContactSuccs} = useContext(ContactContext);

  return (
    createContactSuccs && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-4 py-10 rounded-lg shadow-lg flex flex-col items-center space-y-4 text-center">
          <div className="mx-auto w-3/4">
            <div className="w-full h-16  flex items-center justify-center">
              <img src={successImage} alt="" />
            </div>
            <h3 className="text-lg font-semibold text-[#39A645] mt-5">
              Contact Created
            </h3>
            <p className="text-gray-600 text-center">
              The contact was created successfully.
            </p>
            <button
              onClick={() => setCreateContactSuccs(false)}
              className="bg-[#F3F4F6] px-4 py-2 w-full mt-2 border border-[#D2D2D5]  rounded-lg shadow hover:"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ContactCreateSuccesModal;
