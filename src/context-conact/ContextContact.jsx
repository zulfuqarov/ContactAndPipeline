import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Router, useActionData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;
const newApiUrl = "http://141.98.112.193:5000/api/";
export const ContactContext = createContext();
const ContextContact = ({ children }) => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [contactsData, setContactsData] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [createContactSuccs, setCreateContactSuccs] = useState(null);
  const [isOpendeleteContact, setIsOpendeleteContact] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
console.log(contactsData );

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isUploadDeleteModal, setIsUploadDeleteModal] = useState(false);
  const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
  const [isOpenUploadFaly, setIsOpenUploadFaly] = useState(false);
  const [isOpenUploadEditModal, setIsOpenUploadEditModal] = useState(false);
  const [uploadContacts, setUploadContacts] = useState(null);
  const [editUploadContact, setEditUploadContact] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(selectedContacts);
  
  const [newTransferToCustomersState, setnewTransferToCustomersState] =
    useState();
  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContactsData(JSON.parse(storedContacts));
    }
    const getContacts = async () => {
      try {
        const response = await axios.get(`${newApiUrl}Post/CustomerD`);
        const contacts = response.data.map((contact) => ({
          ...contact,
          color: contact.color || getRandomColor(),
        }));
        setContactsData(contacts);
        localStorage.setItem("contacts", JSON.stringify(contacts));
      } catch (error) {
        console.error(
          "Xəta məlumatı:",
          error.response.status,
          error.response.data
        );
      }
    };
    getContacts();
    setLoading(true);
    getContacts().then(() => {
      setLoading(false);
    });
    const storedUploadContacts = localStorage.getItem("uploadContacts");
    if (storedUploadContacts) {
      setUploadContacts(JSON.parse(storedUploadContacts));
    }
  }, [newTransferToCustomersState]);
  function getRandomColor() {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  const addAllContacts = () => {
    const updatedContacts = [
      ...contactsData,
      ...uploadContacts.map((contact) => ({
        ...contact,
        createdAt: new Date().toISOString(),
      })),
    ];
    updatedContacts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setContactsData(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };
  const addContact = async (data) => {
    try {
      const response = await axios.post(`${newApiUrl}Post/CustomerD`, {
        name: data.name,
        surname: data.surname,
        email: data.email,
        PhoneNumber: data.phone,
        company: data.company,
        department: data.department,
        position: data.position,
        createdByUserId: JSON.parse(localStorage.getItem('userId')).value,
      });
      console.log(response.data);
      
      const newContact = {
        ...response.data,
        color: getRandomColor(),
      };
      setContactsData((prevContacts) => [...prevContacts, newContact]);
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Faild to add contact");
    }
  };
  const updateContact = async (contact) => {
    try {
      const url = `${newApiUrl}Post/CustomerD`; // Yeniləmə endpoint-i
      const response = await axios.put(url, {
        id: contact.id,
        name: contact.name,
        surname: contact.surname,
        phoneNumber: contact.phone,
        email: contact.email,
        company: contact.company,
        department: contact.department,
        position: contact.position,
        createdByUserId: JSON.parse(localStorage.getItem('userId')).value,
      });
      if (response.status === 200) {
        const updatedContacts = contactsData.map((item) =>
          item.id === contact.id ? { ...item, ...contact } : item
        );
        setContactsData(updatedContacts);
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
        toast.success("Contact updated successfully");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error(
        "Failed to update contact: " +
        (error.response?.statusText || "Unknown error")
      );
    }
  };

  const handleSelectAll = () => {
    const allContactIds = contactsData.map((contact) => contact.id);

    if (selectAll) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(allContactIds);
    }

    setSelectAll(!selectAll);
  };

  const handleSelect = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts((prev) =>
        prev.filter((contactId) => contactId !== id)
      );
    } else {
      setSelectedContacts((prev) => [...prev, id]);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      await axios.delete(`${newApiUrl}Post/CustomerD/${contactId}`);

      const filteredContacts = contactsData.filter(
        (contact) => contact.id !== contactId
      );
      setContactsData(filteredContacts);
      toast.success("Contact deleted successfully!");
      localStorage.setItem("contacts", JSON.stringify(filteredContacts));
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
    }
  };

  const clearEditContact = () => {
    setEditContact(null);
  };

  const navigate = useNavigate();
  const [fileUpload, setfileUpload] = useState();
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const date = new Date();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(`${newApiUrl}Customers/ImportExcel`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("File uploaded successfully:", response.data);

          setIsOpenUploadModal(false);
          setIsOpenUploadFaly(true);
          setfileUpload(date);
          navigate("/Upload-File");
        })
        .catch((error) => {
          console.error("An error occurred while uploading the file", error);
        });
    }
  };
  useEffect(() => {
    getTempCustomer();
  }, [fileUpload]);
  useEffect(() => {
    getTempCustomer();
  }, []);
  const getTempCustomer = async () => {
    try {
      const response = await axios.get(
        `${newApiUrl}Customers/TempCustomersGET`
      );
      localStorage.setItem("uploadContacts", JSON.stringify(response.data));
      setUploadContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [updateContactState, setupdateContactState] = useState();
  const updateUploadContact = (updatedData) => {
    axios
      .put(`${newApiUrl}Customers/UpdateTempCustomer/${updatedData.id}`, {
        id: updatedData.id,
        name: updatedData.name,
        surname: updatedData.surname,
        phoneNumber: updatedData.phoneNumber,
        email: updatedData.email,
        company: updatedData.company,
        department: updatedData.department,
        position: updatedData.position,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Error:", error));
  };

  const newTransferToCustomers = async () => {
    const isDataValid = uploadContacts.every((contact) => {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.(com|net|org)$/i.test(
        contact.email
      );
      const isPhoneValid =
        /^\+994\s?(50|51|55|70|77|60|10|40|41)\s?\d{3}\s?\d{2}\s?\d{2}$/.test(
          contact.phoneNumber
        );
      return (
        contact.company &&
        contact.department &&
        contact.position &&
        isEmailValid &&
        isPhoneValid &&
        contact.name.trim() !== "" &&
        contact.surname.trim() !== "" &&
        contact.company.trim() !== "" &&
        contact.department.trim() !== "" &&
        contact.p
      );
    });

    if (!isDataValid) {
      toast.error("Please fill in all fields correctly and completely.");
      return;
    }
    axios
      .get(
        `http://141.98.112.193:5000/api/Customers/newTransferToCustomers?userId=${JSON.parse(localStorage.getItem('userId')).value}`
      )
      .then((response) => {
        toast.success("Yuklendi");
        uploadContacts.forEach((item) => {
          if (response) {
            const newContact = {
              ...item,
              color: getRandomColor(),
            };
            setContactsData((prevContacts) => [...prevContacts, newContact]);
          }
          console.log(contactsData);
          setnewTransferToCustomersState(uploadContacts);
          navigate("/Contacts");
        });
      })
      .catch((error) => {
        toast.error("Error");
      });
  };

  useEffect(() => {
    if (updateContactState) {
      updateUploadContact();
    }
  }, [updateContactState]);
  const deleteUploadContact = (contactId) => {
    axios
      .delete(`${newApiUrl}Customers/TempCustomersDEL/${contactId}`)
      .then((response) => {
        const filteredUploadContacts = uploadContacts.filter(
          (contact) => contact.id !== contactId
        );
        setUploadContacts(filteredUploadContacts);
        localStorage.setItem(
          "uploadContacts",
          JSON.stringify(filteredUploadContacts)
        );
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
      });
  };
  const postData = {
    productId: "9fcb649d-6b85-42c8-8946-bc8487452619",
    expectedRevenue: 0,
    probability: 0,
    expectedClosingDate: "2024-11-02T16:16:58.716Z",
    stageId: "9d02a814-9b9a-4bcc-a065-8996390a6308",
    userId: JSON.parse(localStorage.getItem('userId'))?.value || null,
  };
  const addToLead = async (customerIds) => {
    if (customerIds.length === 0) {
      toast.info("No customers have been selected.");
      return;
    }
    const baseUrl = "http://141.98.112.193:5000/api/Customers/AddToLead";
    const queryParams = customerIds.map((id) => `Ids=${id}`).join("&");
    const url = `${baseUrl}?${queryParams}`;
    try {
      const response = await axios.post(url, postData, {
        headers: {
          "Content-Type": "application/json-patch+json",
          Accept: "application/json",
        },
      });
      toast.success("Customer successfully added!");
      console.log("Response:", response.data);
    } catch (error) {
      toast.error(
        "An error occurred: " +
        (error.response ? error.response.data.message : error.message)
      );
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <ContactContext.Provider
      value={{
        isOpenCreateModal,
        setIsOpenCreateModal,
        contactsData,
        addContact,
        editContact,
        setEditContact,
        updateContact,
        createContactSuccs,
        setCreateContactSuccs,
        selectAll,
        handleSelectAll,
        handleSelect,
        selectedContacts,
        deleteContact,
        clearEditContact,
        addAllContacts,
        isOpendeleteContact,
        setIsOpendeleteContact,

        addToLead,

        newTransferToCustomers,
        getRandomColor,
        setIsOpenUploadModal,
        isOpenUploadModal,
        isOpenUploadFaly,
        setIsOpenUploadFaly,
        isOpenUploadEditModal,
        setIsOpenUploadEditModal,
        uploadContacts,
        handleFileUpload,
        editUploadContact,
        setEditUploadContact,
        updateUploadContact,
        deleteUploadContact,
        setUploadContacts,
        setIsUploadDeleteModal,
        isUploadDeleteModal,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContextContact;
