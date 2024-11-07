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
      className={`border w-full py-[.3rem] ps-2 focus:outline-none ${errors[id] ? "border-red-500" : "border-gray-300"
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

const ContactCreateEditModal = () => {
  const {
    setIsOpenCreateModal,
    isOpenCreateModal,
    addContact,
    editContact,
    updateContact,
    setEditContact,
    setCreateContactSuccs,
    contactsData,
    deleteContact,
    isOpendeleteContact,
    setIsOpendeleteContact,
    setContactsData
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
    if (editContact) {
      setValue("fullName", `${editContact.name} ${editContact.surname}`);
      setValue("email", editContact.email);
      setValue("phone", editContact.phoneNumber);
      setValue("company", editContact.company);
      setValue("department", editContact.department);
      setValue("position", editContact.position);
    } else {
      reset();
    }
  }, [editContact, setValue, reset]);

  const watchedFields = watch();

  const isFormChanged = Object.keys(watchedFields).some(
    (key) => watchedFields[key] !== (editContact?.[key] || "")
  );
  const firstLetter = editContact?.name.charAt(0).toUpperCase();

  const onSubmit = (data) => {
    const parts = data.fullName.trim().split(" ");
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");
    if (parts.length < 2) {
      toast.error("Please enter both first and last name.");
      return;
    }
    const newContact = {
      id: editContact ? editContact.id : Date.now(),
      name: firstName,
      surname: lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      department: data.department,
      position: data.position,
      ...data,
    };

    const isEmailExist = contactsData.some(
      (contact) =>
        contact.email === newContact.email && contact.id !== newContact.id
    );

    if (isEmailExist) {
      toast.error("This email already exists!");
      return;
    }

    if (editContact) {
      updateContact(newContact);
      toast.success("Contact updated successfully!");
    } else {
      addContact(newContact);
      setCreateContactSuccs(true);
      toast.success("Contact created successfully!");
    }
    reset();
    setEditContact(null);
    setIsOpenCreateModal(false);
  };

  const handleDelete = () => {
    if (editContact) {
      setIsOpendeleteContact(true);
    }
  };
  if (!isOpenCreateModal) return null;
  const handleDiscard = () => {
    reset();
    setIsOpenCreateModal(false);
    setEditContact(null);
  };
  const formattedDate = editContact?.createdAt
    ? new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(editContact.createdAt))
    : "Date not available";
  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[40%] p-6 relative">
        <div className="flex items-start">
          <div className="w-full">
            {editContact ? (
              <div className="">
                <div
                  className={`${editContact.color} p-[2rem] rounded-[100%] w-[4.5rem] h-[4.5rem] flex items-center justify-center`}
                >
                  <p className="text-[2.3rem] font-semibold text-white">
                    {firstLetter}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <p className="font-semibold text-[1.5rem]">
                      {editContact.name}
                    </p>
                    <p>{editContact.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[1.1rem] py-[.2rem]">
                      Created By:
                    </p>
                    <div>Amanda</div>
                  </div>
                  <div>
                    <p className="font-semibold text-[1.1rem] py-[.2rem]">
                      Date added:
                    </p>
                    <p>{formattedDate}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-base font-semibold text-gray-900 text-[1.4rem]">
                  {editContact ? "Edit contact" : "Create new contact"}
                </p>
                <p className="mt-1 text-[1.1rem] text-gray-500">
                  Enter basic contact details to {editContact ? "edit" : "add"}{" "}
                  a new customer.
                </p>
              </div>
            )}

            <button
              onClick={() => {
                setIsOpenCreateModal(false);
                setEditContact(null);
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
            id="fullName"
            label="Full Name"
            type="text"
            register={register}
            errors={errors}
            required
            validate={(value) => {
              const parts = value.trim().split(" ");
              const isValidName =
                parts.length === 2 &&
                parts.every((part) =>
                  /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(part)
                );
              return isValidName;
            }}
            patternErrorMsg={
              "Please enter a valid first and last name (e.g., Sarah White)"
            }
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
            pattern={/^[^\s@]+@[^\s@]+\.(com|net|org)$/i}
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
            id="phone"
            label="Phone"
            type="tel"
            register={register}
            errors={errors}
            required
            pattern={
              /^\+994\s?(50|51|55|70|77|60|10|40|41)\s?\d{3}\s?\d{2}\s?\d{2}$/
            }
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
            {editContact && (
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white rounded-md px-4 py-2"
              >
                Delete
              </button>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleDiscard}
              className="bg-gray-400 text-white rounded-md px-4 py-2"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className={`bg-blue-500 text-white rounded-md px-4 py-2 ${!isFormChanged ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={!isFormChanged}
            >
              {editContact ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCreateEditModal;
