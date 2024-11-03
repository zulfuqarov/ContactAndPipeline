import { IoIosCloseCircleOutline } from "react-icons/io";
import { ContactContext } from "../context-conact/ContextContact";
import { useContext } from "react";
import { BsDownload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ContactUploadModal = () => {
  const navigate = useNavigate();
  const {
    isOpenUploadModal,
    setIsOpenUploadModal,
    handleFileUpload
  } = useContext(ContactContext);
  if (!isOpenUploadModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[30%] p-6 relative">
        <div className="flex items-start text-center w-full">
          <div className="w-full">
            <div className="text-center flex justify-center">
              <img
                className="w-[20rem]"
                src="../../src/pages/Contacts/Image/no-contact.png"
                alt="No Contact"
              />
            </div>
            <button
              onClick={() => setIsOpenUploadModal(false)}
              className="absolute top-[1rem] right-[1rem] text-[1.7rem]"
            >
              <IoIosCloseCircleOutline />
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[1.4rem] font-semibold">
            Upload an Excel or CSV file to import
          </p>
          <p className="py-3">
            Excel files are recommended as formatting is automatic.
          </p>
          <p className="py-3">Need help?</p>
          <a href="../../../public/files/Template.xlsx">
          <div className="flex justify-center items-center pb-4 text-[#1971F6] gap-2">
            <BsDownload />
            <p>Import template for customers</p>
          </div>
          </a>
        </div>

        <div className="flex justify-center items-center w-full">
          <div className="flex space-x-2 w-full">
            {/* Discard düyməsi */}
            <button
              onClick={() => setIsOpenUploadModal(false)}
              className="bg-[#F3F4F6] text-neutral-950 rounded-md px-4 py-2 w-1/2"
            >
              Discard
            </button>

            {/* Upload inputu düymə kimi */}
            <label className="w-1/2 bg-[#1971F6] text-white text-center rounded-md px-4 py-2 cursor-pointer">
              Upload
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUploadModal;
