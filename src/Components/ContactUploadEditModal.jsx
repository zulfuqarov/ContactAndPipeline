import { IoIosCloseCircleOutline } from "react-icons/io";
import { ContactContext } from "../context-conact/ContextContact";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
      console.log(editUploadContact);
      Object.keys(editUploadContact).forEach((key) => {
        setValue(key, editUploadContact[key]);
      });
    } else {
      reset();
    }
  }, [editUploadContact, setValue, reset]);

  const watchedFields = watch();

  const isFormChanged = Object.keys(watchedFields).some(
    (key) => watchedFields[key] !== (editUploadContact?.[key] || "")
  );

  const onSubmit = (data) => {
    const newUpload = {
      id: editUploadContact ? editUploadContact.id : Date.now(),
      ...data,
    };
    const updatedContacts = uploadContacts.map((contact) =>
      contact.id === newUpload.id ? newUpload : contact
    );
    const isNameExist = contactsData.some(
      (contact) =>
        contact.name === newUpload.name && contact.id !== newUpload.id
    );
    const isEmailExist = contactsData.some(
      (contact) =>
        contact.email === newUpload.email && contact.id !== newUpload.id
    );

    if (isNameExist) {
      toast.error("This name already exists in another contact!");
      return;
    }

    if (isEmailExist) {
      toast.error("This email already exists in another contact!");
      return;
    }
    if (editUploadContact) {
      updateUploadContact(newUpload);
      toast.success("Upload updated successfully!");
      setUploadContacts(updatedContacts);
      setIsOpenUploadEditModal(false);
      console.info();
    }

    reset();
  };

  if (!isOpenUploadEditModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-10 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[40%] p-6 relative">
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
          {/* Input Fields */}
          <InputField
            id="name"
            label="Full Name"
            type="text"
            register={register}
            errors={errors}
            required
            placeholder="Sarah White"
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
            pattern={/^\S+@\S+$/i}
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
            pattern={/^\+?\d{1,4}[\s-]?\d{1,3}[\s-]?\d{1,4}[\s-]?\d{1,4}$/}
            patternErrorMsg="Please enter a valid phone number."
            placeholder="e.g. (+994)70 211 45 32"
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
              <button className="bg-red-500 text-white rounded-md px-4 py-2">
                Delete
              </button>
            )}
          </div>
          <div className="flex space-x-2">
            <button className="bg-gray-400 text-white rounded-md px-4 py-2">
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
