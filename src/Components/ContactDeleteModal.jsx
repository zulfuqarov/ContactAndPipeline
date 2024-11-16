import { useContext } from "react";
import { ContactContext } from "../context-conact/ContextContact";
import { toast } from "react-toastify";
import deleteImage from "../../src/assets/img/delete-img.png"
const ContactDeleteModal = () => {
  const { isOpendeleteContact, setIsOpendeleteContact ,editContact,
    deleteContact,setEditContact,setIsOpenCreateModal
  } =
    useContext(ContactContext);

    const handleDelete = () => {
      if (editContact) {
        deleteContact(editContact.id);
        setEditContact(null); 
        setIsOpendeleteContact(false)
        setIsOpenCreateModal(false);
        setIsOpendeleteContact(false)        
      }
    };
  return (
    isOpendeleteContact && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-[1000]">
        <div className="bg-white py-10 rounded-lg shadow-lg w-[21rem] space-y-4 text-center">
          <div className="mx-auto w-3/4">
            <div className="w-full h-16  flex items-center justify-center mb-4">
              <img src={deleteImage} alt="" />
            </div>
            <h3 className="text-[1.4rem] font-semibold my-2 pt-3">
              Are you sure you want to delete this contact?
            </h3>
            <p className="text-gray-600 text-center text-[1.1rem] w-[15rem] overflow-auto">
              {editContact?editContact.name:"Sarah"}
            </p>
            <p className="text-gray-600 text-center text-[1.1rem] w-[15rem] overflow-auto">
            {editContact?editContact.email:"sarah@gmail.com"}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpendeleteContact(false)}
                className="bg-[#F3F4F6] px-4 py-2 w-full mt-2 border border-[#D2D2D5]  rounded-lg shadow hover: text-[1.2rem]"
              >
                Close
              </button>
              <button
                onClick={handleDelete}
                className="bg-[#F3F4F6] px-4 py-2 w-full mt-2 border border-[#D2D2D5] text-[red]  rounded-lg shadow hover: text-[1.2rem]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ContactDeleteModal;
