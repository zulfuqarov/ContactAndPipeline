import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ExcelEditableTable = () => {
  const { register, formState: { errors }, setError, clearErrors } = useForm();
  const [contacts, setContacts] = useState([
    { name: "Jessica Smart", email: "jessica.smart@gmail.com", phone: "+994701224232", company: "Ocean Blue Designs", department: "Marketing", position: "Senior Marketing Manager" },
    { name: "Alex Johnson", email: "alex.johnson@gmail.com", phone: "+994701224233", company: "Sunflower Studios", department: "Design", position: "Lead Designer" }
  ]);

  const [editingField, setEditingField] = useState({ rowIndex: null, field: null });

  const handleInputChange = (event, index, field) => {
    const { value } = event.target;
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);

    // Clear the error first
    clearErrors(`contacts.${index}.${field}`);

    // Validate the field based on its type
    if (field === 'email') {
      if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        setError(`contacts.${index}.${field}`, { type: "manual", message: "" });
      }
    } else if (field === 'phone') {
      if (!value.match(/^\+?\d{10,15}$/)) {
        setError(`contacts.${index}.${field}`, { type: "manual", message: "" });
      }
    }
  };

  const addNewRow = () => {
    setContacts([...contacts, { name: "", email: "", phone: "", company: "", department: "", position: "" }]);
  };

  const handleClick = (index, field) => {
    setEditingField({ rowIndex: index, field });
  };

  const handleKeyDown = (e, index, field) => {
    const fields = ["name", "email", "phone", "company", "department", "position"];
    const currentRowIndex = index;
    const currentFieldIndex = fields.indexOf(field);

    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (currentFieldIndex < fields.length - 1) {
        const nextField = fields[currentFieldIndex + 1];
        const nextInput = document.querySelector(`input[data-index='${currentRowIndex}'][data-field='${nextField}']`);
        nextInput && nextInput.focus();
      } else {
        const nextRowIndex = currentRowIndex + 1;
        if (nextRowIndex < contacts.length) {
          const nextInput = document.querySelector(`input[data-index='${nextRowIndex}'][data-field='name']`);
          nextInput && nextInput.focus();
        }
      }
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (currentFieldIndex > 0) {
        const prevField = fields[currentFieldIndex - 1];
        const prevInput = document.querySelector(`input[data-index='${currentRowIndex}'][data-field='${prevField}']`);
        prevInput && prevInput.focus();
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextRowIndex = currentRowIndex + 1;
      if (nextRowIndex < contacts.length) {
        const nextInput = document.querySelector(`input[data-index='${nextRowIndex}'][data-field='${fields[currentFieldIndex]}']`);
        nextInput && nextInput.focus();
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevRowIndex = currentRowIndex - 1;
      if (prevRowIndex >= 0) {
        const prevInput = document.querySelector(`input[data-index='${prevRowIndex}'][data-field='${fields[currentFieldIndex]}']`);
        prevInput && prevInput.focus();
      }
    }

    if (e.key === "Enter" && field === "delete") {
      e.preventDefault();
      deleteRow(index);
    }
  };

  const deleteRow = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };
console.log("Hello")
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <ToastContainer />

      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">📇 Contact</th>
            <th className="px-4 py-2">📧 Email</th>
            <th className="px-4 py-2">📞 Phone</th>
            <th className="px-4 py-2">🏢 Company</th>
            <th className="px-4 py-2">👥 Department</th>
            <th className="px-4 py-2">📋 Position</th>
            <th className="px-4 py-2">🗑️ Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index} className="border-t">
              {["name", "email", "phone", "company", "department", "position"].map((field) => (
                <td key={field} className="px-4 py-2">
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    placeholder={field === "email" ? "example@gmail.com" : field === "phone" ? "+994701224232" : `Example ${field}`}
                    className={`w-full p-2 bg-white border rounded focus:outline-none focus:border-blue-500 ${
                      errors.contacts?.[index]?.[field] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={contact[field] || ""}
                    onChange={(e) => handleInputChange(e, index, field)}
                    onClick={() => handleClick(index, field)}
                    onBlur={() => setEditingField({ rowIndex: null, field: null })} // Close input field on blur
                    data-index={index}
                    data-field={field}
                    onKeyDown={(e) => handleKeyDown(e, index, field)}
                  />
                </td>
              ))}
              <td className="px-4 py-2">
                <button
                  onClick={() => deleteRow(index)}
                  onKeyDown={(e) => e.key === "Enter" && deleteRow(index)} // Enter ilə silmək
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Yeni Sətir Əlavə Etmək üçün Button */}
      <button
        onClick={addNewRow}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        + Yeni Sətir Əlavə Et
      </button>
    </div>
  );
};

export default ExcelEditableTable;
