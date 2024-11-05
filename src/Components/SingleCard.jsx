import { CiEdit } from "react-icons/ci";
import { ContactContext } from "../context-conact/ContextContact";
import { useContext } from "react";

const SingleCard = ({ data }) => {
  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const {
    setEditContact,
    setIsOpenCreateModal,
    handleSelect,
    selectedContacts,
  } = useContext(ContactContext);
  const firstLetter = data.name.charAt(0).toUpperCase();
  const isChecked = selectedContacts.includes(data.id);
  const cardColor = data.color;
  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-GB");
  const handleEdit = () => {
    setEditContact(data);
    setIsOpenCreateModal(true);
  };

  return (
    <div className="flex items-center gap-2 border border-gray-300 bg-white rounded-lg p-[.5rem] h-[6.6rem] shadow relative overflow-hidden">
      {/* Checkbox */}
      <div>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={isChecked} // Checkbox-un vəziyyətini burada idarə edirik
          onChange={() => handleSelect(data.id)} // Checkbox dəyişdikdə funksiyanı çağırır
        />
      </div>

      {/* Profile Initial */}
      <div className="flex gap-2 items-center">
        <div
          className={`h-[4rem] w-[4rem] flex items-center justify-center rounded-lg ${cardColor}`}
        >
          <p className="text-white text-[2.4rem]">{firstLetter}</p>
        </div>
        {/* User Info */}
        <div className="flex flex-col">
          <h4 className="font-bold text-[1.2rem]">{data.name}</h4>
          <p className="text-gray-900">{data.company}</p>
          <p className="text-gray-400">{data.email}</p>
          <p className="text-gray-400">{formattedDate}</p>
        </div>
      </div>
      {/* Edit Icon */}
      <div
        onClick={handleEdit}
        className="text-gray-500 cursor-pointer self-end mt-auto absolute bottom-1 right-1"
      >
        <CiEdit size={24} />
      </div>
    </div>
  );
};

export default SingleCard;
