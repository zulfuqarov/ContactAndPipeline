import { useContext, useEffect, useState } from "react";
import { BsDownload, BsPersonVcard } from "react-icons/bs";
import { FaArrowLeft, FaCheckSquare, FaWindowClose } from "react-icons/fa";
import { IoEllipsisHorizontalCircleOutline, IoPeople } from "react-icons/io5";
import { LuBuilding2, LuContact2 } from "react-icons/lu";
import { MdOutlineMailOutline, MdOutlinePhoneInTalk } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { ContactContext } from "../../context-conact/ContextContact";
import UploadEditModal from "../../Components/ContactUploadEditModal";
import { toast } from "react-toastify"; // Toast üçün
import UploadDeleteModal from "../../Components/UploadDeleteModal";

const UploadFile = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const {
    setIsOpenUploadEditModal,
    setUploadContacts,
    uploadContacts,
    setEditUploadContact,
    setIsUploadDeleteModal,
    addAllContacts,
    newTransferToCustomers,
  } = useContext(ContactContext);

  useEffect(() => {
    const storedUploadContacts = localStorage.getItem("uploadContacts");
    if (storedUploadContacts) {
      setUploadContacts(JSON.parse(storedUploadContacts));
    }
  }, []);

  useEffect(() => {
    if(uploadContacts){
      if (uploadContacts.length <= 0) {
        const timer = setTimeout(() => {
          navigate("/Contacts");
        }, 1000); 
  
        return () => clearTimeout(timer);
      }
    }
  }, [uploadContacts, navigate]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\+994\s?(50|51|55|70|77|60|10|40|41)\s?\d{3}\s?\d{2}\s?\d{2}$/.test(
      phoneNumber
    );
  };

  const handleEdit = (contact) => {
    const updateEditFormData = {
      id: contact.id,
      name: contact.name,
      surname: contact.surname,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
      company: contact.company,
      department: contact.department,
      position: contact.position,
    };
    console.log(updateEditFormData);

    setEditUploadContact(updateEditFormData);
    setIsOpenUploadEditModal(true);
  };

  return (
    <div className="p-6 w-full">
      <div>
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-3">
            <Link to="/Contacts" className="flex items-center gap-1">
              <FaArrowLeft className="text-[1.3rem] text-[#7C838B]" />
              <p className="text-[1.6rem] text-[#7C838B]">Contact</p>
            </Link>
            <span className="text-[1.2rem]">|</span>
            <h2 className="text-xl font-semibold">Uploaded File</h2>
          </div>
          <div>
            <div className="flex space-x-2 items-center w-full">
              <Link
                to="/Contacts"
                className="bg-[#F3F4F6] text-neutral-950 rounded-md px-4 py-2 "
              >
                Discard
              </Link>

              <label
                onClick={newTransferToCustomers}
                className="bg-[#1971F6] text-white text-center rounded-md px-4 py-2 cursor-pointer flex justify-center items-center gap-2"
              >
                <BsDownload /> Save
              </label>
            </div>
          </div>
        </div>

        <table className="min-w-full bg-white border mt-4">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4 border-b">
                <div className="flex items-center gap-1 font-normal">
                  <LuContact2 />
                  Contact
                </div>
              </th>
              <th className="py-2 px-4 border-b">
                <div className="flex items-center gap-1 font-normal">
                  <MdOutlineMailOutline />
                  Email
                </div>
              </th>
              <th className="py-2 px-4 border-b">
                <div className="flex items-center gap-1 font-normal">
                  <MdOutlinePhoneInTalk />
                  Phone
                </div>
              </th>
              <th className="py-2 px-4 border-b">
                <div className="flex items-center gap-1 font-normal">
                  <LuBuilding2 /> Company
                </div>
              </th>
              <th className="py-2 px-4 border-b">
                <div className="flex items-center gap-1 font-normal">
                  <IoPeople />
                  Department
                </div>
              </th>
              <th className="py-2 px-4 border-b">
                <div className="flex items-center gap-1 font-normal">
                  <BsPersonVcard />
                  Position
                </div>
              </th>
              <th className="py-2 px-4 border-b">
                <div className="flex items-center gap-1 font-normal">
                  <TfiReload />
                  Status
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {uploadContacts?.map((contact, key) => {
              return (
                <tr key={key}>
                  <td className="py-2 px-4 flex items-center gap-1 relative">
                    <IoEllipsisHorizontalCircleOutline
                      onMouseEnter={() => handleMouseEnter(contact.id)}
                      onMouseLeave={handleMouseLeave}
                      className="text-[1.3rem] cursor-pointer"
                    />
                    {hoveredIndex === contact.id && (
                      <ul
                        className="absolute -top-3 left-8 w-full bg-white border shadow-lg z-10 max-h-60 overflow-y-auto"
                        onMouseEnter={() => handleMouseEnter(contact.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <li
                          onClick={() => handleEdit(contact)}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Edit
                        </li>
                        <li
                          onClick={() => setIsUploadDeleteModal(true)}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Delete
                        </li>
                        <UploadDeleteModal uploadContact={contact} />
                      </ul>
                    )}
                    <UploadEditModal />
                    <p>
                      {contact.name || (
                        <span className="text-red-500">Not Provided</span>
                      )}
                    </p>
                  </td>
                  <td className="py-2 px-4">
                    {contact.email === "" ||
                    !/\S+@\S+\.\S+/.test(contact.email) ? (
                      <span className="text-red-500">
                        {contact.email === ""
                          ? "Not Provided"
                          : "Invalid Format"}
                      </span>
                    ) : (
                      contact.email
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {contact.phone || contact.phoneNumber ? (
                      /^\+994\s?(50|51|55|70|77|60|10|40|41)\s?\d{3}\s?\d{2}\s?\d{2}$/.test(
                        contact.phone || contact.phoneNumber
                      ) ? (
                        contact.phone || contact.phoneNumber
                      ) : (
                        <span className="text-red-500">Invalid Format</span>
                      )
                    ) : (
                      <span className="text-red-500">Not Provided</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {contact.company || (
                      <span className="text-red-500">Not Provided</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {contact.department || (
                      <span className="text-red-500">Not Provided</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {contact.position || (
                      <span className="text-red-500">Not Provided</span>
                    )}
                  </td>
                  <td className="py-2 px-4 flex justify-center items-center">
                    {/* Hər bir sahənin doluluğuna əsaslanaraq ikonları göstəririk */}
                    <span
                      className={
                        contact.name &&
                        contact.email &&
                        (contact.phone || contact.phoneNumber) &&
                        contact.company &&
                        contact.department &&
                        contact.position
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      <td className="py-2 px-4 flex justify-center items-center">
                        {contact.name &&
                        contact.email &&
                        validateEmail(contact.email) && // Email validation
                        (contact.phone || contact.phoneNumber) &&
                        validatePhoneNumber(
                          contact.phone || contact.phoneNumber
                        ) && // Phone validation
                        contact.company &&
                        contact.department &&
                        contact.position ? (
                          <div className="w-[1rem] h-[1rem] bg-green-500"></div>
                        ) : (
                          <div className="w-[1rem] h-[1rem] bg-red-500 "></div>
                        )}
                      </td>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadFile;
