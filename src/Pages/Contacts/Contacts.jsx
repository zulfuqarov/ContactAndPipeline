import { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import userAddCricle from "../../../src/pages/Contacts/Image/user-cirlce-add.png";
import ContactCreateModal from "../../Components/ContactCreateEditModal";
import { ContactContext } from "../../context-conact/ContextContact";
import SingleCard from "../../Components/SingleCard";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import noContactImg from "./Image/no-contact.png";
import ContactCreateSuccesModal from "../../Components/ContactCreateSuccesModal";
import ContactUploadModal from "../../Components/ContactUploadModal";
const Contacts = () => {
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [navbarHeight, setNavbarHeight] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [sortContacts, setSortContacs] = useState();
  const itemsPerPage = 16;

  const {
    setIsOpenCreateModal,
    isOpenCreateModal,
    contactsData,
    handleSelectAll,
    selectAll,
    setIsOpenUploadModal,
    setEditContact,
    addToLead,
    selectedContacts
  } = useContext(ContactContext);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      setNavbarHeight(navbarHeight);
    }
  }, []);
  useEffect(() => {
    const results = contactsData.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(results);
  }, [searchTerm, contactsData]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredContacts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const nextPage = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);

  const toggleMenuSort = () => setIsOpenSort((prev) => !prev);
  const closeMenuSort = () => setIsOpenSort(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSortChange = (direction) => {
    const sortedContacts = [...contactsData].sort((a, b) => {
      if (direction === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    setSortContacs(sortedContacts);
    closeMenuSort();
  };
  useEffect(() => {
    const sortedContacts = [...contactsData].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setSortContacs(sortedContacts);
  }, [contactsData]);

  useEffect(() => {
    const sortedContacts = [...contactsData].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const filteredResults = sortedContacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredContacts(filteredResults);
  }, [contactsData, searchTerm]);

  const handleContactClick = (contact) => {
    setEditContact(contact);
    setIsOpenCreateModal(true);
  };
  return (
    <div className="px-5 md:px-10">
      {/* Head */}
      <div className="flex items-center justify-between py-2">
        {/* Head Left */}
        <div className="flex items-center gap-3">
          <p className="text-3xl font-semibold">Contacts</p>
          <span className="text-3xl text-[#C2C4CA]">{contactsData.length}</span>
        </div>

        {/* Head Right */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="flex items-center border px-[.2rem] py-[.4rem] pl-[.6rem] w-[23rem] rounded bg-white relative">
            <label htmlFor="search">
              <FiSearch className="text-[1.7rem] cursor-pointer" />
            </label>
            <input
              id="search"
              placeholder="Search Contacts"
              className="outline-none mx-2 text-1xl w-full"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            {/* Dropdown Search Results */}
            {searchTerm && (
              <ul className="absolute top-full left-0 w-full bg-white border shadow-lg z-10 max-h-60 overflow-y-auto">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <li
                      key={contact.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleContactClick(contact)}
                    >
                      {contact.name}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No contacts</li>
                )}
              </ul>
            )}
          </div>
          {/* Sort Dropdown */}
          <div className={isOpenCreateModal ? "z-0" : undefined}>
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex text-1xl gap-x-1.5 rounded-md bg-[#F3F4F6] px-3 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-[15rem] py-[.57rem]"
                  onClick={toggleMenuSort}
                  aria-expanded={isOpenSort}
                  aria-haspopup="true"
                >
                  Sort by: <span>Date created</span>
    

                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {isOpenSort && (
                <div
                  className="absolute right-0 text-1xl z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      role="menuitem"
                      onClick={() => handleSortChange("oldest")}
                    >
                      Newest to Oldest
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      role="menuitem"
                      onClick={() => handleSortChange("newest")}
                    >
                      Oldest to Newest
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Upload */}
          <div>
            <button
              onClick={() => {
                setIsOpenUploadModal(true);
              }}
              className="bg-[#F3F4F6] text-gray-900 py-[.57rem] px-[.57rem] rounded border border-[#D2D2D5] font-semibold"
            >
              Upload records
            </button>
            <ContactUploadModal />
          </div>
          {/* Create User */}
          <div>
            <button
              onClick={() => setIsOpenCreateModal(true)}
              className="flex items-center gap-1 bg-[#1971F6] text-white py-[.57rem] px-[.57rem] rounded border border-[#D2D2D5] font-semibold"
            >
              <img src={userAddCricle} alt="Add User" />
              New Contact
            </button>
            <ContactCreateModal />
            <ContactCreateSuccesModal />
          </div>
        </div>
      </div>
      {/* Body */}
      <div
        className="relative"
        style={{ height: `calc(89vh - ${navbarHeight}px)` }}
      >
        {contactsData.length <= 0 ? (
          <div className="flex items-center justify-center ">
            <div className="text-center">
              <img className="mx-auto" src={noContactImg} alt="" />
              <p className="text-[1.5rem] font-semibold">
                You currently have no contacts.
              </p>
              <p>
                Once you add some, they'll appear here for easy access and
                management.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-auto">
            <div className="flex items-center justify-between h-auto">
              <p>
                Easily access and manage all your contacts with detailed
                information.
              </p>
              <div className="flex items-center gap-1">
                <span className="text-xl">{`${currentPage} / ${totalPages}`}</span>
                <button
                  className="border px-[.2rem] py-[.2rem] text-[2rem] disabled:bg-gray-300"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <IoIosArrowRoundBack />
                </button>
                <button
                  className="border px-[.2rem] py-[.2rem] text-[2rem] disabled:bg-gray-300"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  <IoIosArrowRoundForward />
                </button>
              </div>
            </div>
            <div className="h-[100%]">
              <div className="grid grid-cols-4 gap-2 w-full mt-2 h-[100%]">
                {(sortContacts && sortContacts.length > 0
                  ? sortContacts.slice(startIndex, startIndex + itemsPerPage)
                  : currentData
                ).map((data, index) => (
                  <SingleCard data={data} key={data.id} />
                ))}
              </div>
              <div className=" fixed bottom-0 pb-2 flex justify-between items-center w-[95%]">
                <button
                  onClick={handleSelectAll}
                  className="border px-3 py-2 rounded-sm bg-[#F3F4F6]"
                >
                  {selectAll ? "Deselect All" : "Select All"}
                </button>
                <button onClick={()=>{
                  if(selectedContacts){
                    addToLead(selectedContacts)

                  }
                  }} className="bg-[#1971F6] text-white text-center rounded-md px-4 py-2 cursor-pointer flex justify-center items-center gap-2">
                  Send Selected Contacts to Pipeline
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
