import React, { useContext, useState } from "react";
import { ContextCrm } from "../ContextCrm/ContextCrm";
import { toast } from "react-toastify";

const AddStage = () => {
  const { handleAddStage } = useContext(ContextCrm);
  const [show, setShow] = useState(false);
  const [stageNameInput, setStageNameInput] = useState({
    name: "",
    userId: JSON.parse(localStorage.getItem('userId')).value,
  });

  const handleToggle = () => {
    setShow(!show);
  };

  const handleChangeInput = (e) => {
    setStageNameInput({ ...stageNameInput, name: e.target.value });
  };

  return (
    <div className="relative w-full max-w-sm mx-auto pt-4 pl-[20px]">
      {show ? (
        <div className="p-4 bg-white shadow-lg w-[300px] rounded-lg transition-all">
          <input
            value={stageNameInput.name}
            onChange={handleChangeInput}
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Stage..."
          />
          <button
            onClick={() => {
              if (stageNameInput.name) {
                handleAddStage(stageNameInput);
                setStageNameInput({
                  name: "",
                  userId: JSON.parse(localStorage.getItem('userId')).value,
                });
              } else {
                toast.error("Failed to add stage!");
              }
            }}
            className="w-full mt-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-all flex items-center justify-center"
          >
            <p className="text-lg">Add</p>
            <i className="fa-solid fa-plus pl-2"></i>
          </button>
          <button
            onClick={handleToggle}
            className="w-full py-2 px-4 text-white bg-red-500 rounded hover:bg-red-600 transition-all flex items-center justify-center shadow-md"
          >
            <p className="text-lg">Close</p>
            <i className="fa-x fa-plus pl-2"></i>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-[300px]">
          <button
            onClick={handleToggle}
            className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600 transition-all flex items-center justify-center shadow-md"
          >
            <p className="text-lg">Stage</p>
            <i className="fa-solid fa-plus pl-2"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default AddStage;
