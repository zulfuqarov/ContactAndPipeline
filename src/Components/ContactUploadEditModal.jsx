import { IoIosCloseCircleOutline } from "react-icons/io";
import { ContactContext } from "../context-conact/ContextContact";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ContactDeleteModal from "./ContactDeleteModal";
import UploadDeleteModal from "./UploadDeleteModal";
import UploadNewDeleteModal from "./UploadNewDeleteModal";

const InputField = ({
  id,
  label,
  type,
  register,
  errors,
  required,
  pattern,
  placeholder,
  patternErrorMsg,
}) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className={`border w-full py-[.3rem] ps-2 focus:outline-none ${
        errors[id] ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
      {...register(id, { required, pattern })}
    />
    {errors[id]?.type === "required" && (
      <p className="text-red-500 text-sm mt-1">{`${label} is required.`}</p>
    )}
    {errors[id]?.type === "pattern" && (
      <p className="text-red-500 text-sm mt-1">{patternErrorMsg}</p>
    )}
  </div>
);

const ContactUploadEditModal = () => {
  const {
    isOpenUploadEditModal,
    editUploadContact,
    setIsOpenUploadEditModal,
    uploadContacts,
    updateUploadContact,
    setUploadContacts,
    contactsData,
    setIsNewUploadDeleteModal
  } = useContext(ContactContext);
 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    if (editUploadContact) {
      setValue("fullName", `${editUploadContact.name} ${editUploadContact.surname}`);
      setValue("email", editUploadContact.email);
      setValue("phoneNumber", editUploadContact.phoneNumber);
      setValue("company", editUploadContact.company);
      setValue("department", editUploadContact.department);
      setValue("position", editUploadContact.position);
    } else {
      reset();
    }
  }, [editUploadContact, setValue, reset]);

  const watchedFields = watch();

  const isFormChanged = Object.keys(watchedFields).some(
    (key) => watchedFields[key] !== (editUploadContact?.[key] || "")
  );

  const onSubmit = (data) => {
    const parts = data.fullName.trim().split(" ");
    if (parts.length < 2) {
      toast.error("Please enter both first and last name.");
      return;
    }
  
    const name = parts[0];
    const surname = parts.slice(1).join(" "); 
  
    const newUpload = {
      id: editUploadContact ? editUploadContact.id : Date.now(),
      ...data,
      name: name,      
      surname: surname
    };
  
    // Check if email already exists
    const isEmailExist = contactsData.some(
      (contact) =>
        contact.email === newUpload.email && contact.id !== newUpload.id
    );
    
    if (isEmailExist) {
      toast.error("This email already exists in another contact!");
      return;
    }
  
    // Prepare updated contacts list
    const updatedContacts = uploadContacts.map((contact) =>
      contact.id === newUpload.id ? newUpload : contact
    );
  
    // If editing an existing contact, update it
    if (editUploadContact) {
      updateUploadContact(newUpload);
      toast.success("Upload updated successfully!");
      setUploadContacts(updatedContacts);
      setIsOpenUploadEditModal(false);
    }
  
    reset();
  };
  

  const deleteBtnClick=()=>{
    setIsNewUploadDeleteModal(true)
  }
  if (!isOpenUploadEditModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-10 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg  w-full max-w-[40%] p-6 relative">
        <div className="flex items-start">
          <div className="w-full">
            <div>
              <p className="text-base font-semibold text-gray-900 text-[1.4rem]">
                Edit upload
              </p>
              <p className="mt-1 text-[1.1rem] text-gray-500">
                Enter details to edit the upload.
              </p>
            </div>
            <button
              onClick={() => {
                setIsOpenUploadEditModal(false);
                editUploadContact(null);
              }}
              className="absolute top-[1rem] right-[1rem] text-[1.7rem]"
            >
              <IoIosCloseCircleOutline />
            </button>
          </div>
        </div>
        <hr className="my-3" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-3 grid grid-cols-2 gap-8"
        >
          <InputField
            id="fullName"
            label="Full Name"
            type="text"
            register={register}
            errors={errors}
            required
            placeholder="Sarah White"
            pattern={/^[A-Za-z]+(?:[ '-][A-Za-z]+)*\s[A-Za-z]+(?:[ '-][A-Za-z]+)*$/}
            patternErrorMsg="Please enter both first and last name."
          
          />
             <InputField
            id="company"
            label="Company"
            type="text"
            register={register}
            errors={errors}
            required
            placeholder="Sunflower Studios"
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            required
            pattern={/^[^\s@]+@[^\s@]+\.(com|net|org|ru|edu|gov|info|io|co|us|uk|biz|cn|de|fr)$/i}
            patternErrorMsg="Please enter a valid email address."
            placeholder="e.g. example@gmail.com"
          />
       
          <InputField
            id="department"
            label="Department"
            type="text"
            register={register}
            errors={errors}
            required
            placeholder="Marketing"
          />
          <InputField
            id="phoneNumber"
            label="phoneNumber"
            type="text"
            register={register}
            errors={errors}
            required
            pattern={/^\+994\s?(50|51|55|70|77|60|10|40|41)\s?\d{3}\s?\d{2}\s?\d{2}$/}
            patternErrorMsg="Please enter a valid phone number."
            placeholder="e.g. +994702114532"
          />
          <InputField
            id="position"
            label="Position"
            type="text"
            register={register}
            errors={errors}
            required
            placeholder="Position"
          />
        </form>
        <div className="flex justify-between items-center w-full">
          <div>
            {editUploadContact && (
              <button onClick={() =>{deleteBtnClick()}} className="bg-red-500 text-white rounded-md px-4 py-2">
                Delete
              </button>
            )}
            <UploadNewDeleteModal/>
       
          </div>
          <div className="flex space-x-2">
            <button onClick={()=>setIsOpenUploadEditModal(false)} className="bg-gray-400 text-white rounded-md px-4 py-2">
              Discard
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className={`bg-blue-500 text-white rounded-md px-4 py-2 ${
                !isFormChanged ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isFormChanged}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUploadEditModal;
