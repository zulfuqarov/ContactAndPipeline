import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ContextCrm } from "../ContextCrm/ContextCrm";

const LeadsDetailsMain = ({ idLeads }) => {

  const { leadColor } = useContext(ContextCrm)

  const { id } = useParams();
  const [noteInput, setnoteInput] = useState({
    Id: "",
    content: "",
  });

  const handleSaveNote = () => {
    const getLocalNote = JSON.parse(localStorage.getItem("Notes")) || [];


    const updatedNote = getLocalNote.some((item) => item.Id === id)
      ? getLocalNote.map((item) => (item.Id === id ? noteInput : item))
      : [...getLocalNote, noteInput];

    localStorage.setItem("Notes", JSON.stringify(updatedNote));
    toast.success("Note saving")
  };


  useEffect(() => {
    const getLocalNote = JSON.parse(localStorage.getItem("Notes")) || [];
    const currentNote = getLocalNote.find((item) => item.Id === id);
    if (currentNote) {
      setnoteInput(currentNote);
    } else {
      setnoteInput({
        Id: "",
        content: "",
      })
    }
  }, [id]);

  const handleNoteChange = (e) => {
    setnoteInput({ Id: id, content: e.target.value });
  };

  return (
    <div className="flex gap-2">
      <div className="flex-[2] border py-[10px] px-[30px]">
        <div>
          <p className="font-inter text-[36px] font-normal  text-left">
            {idLeads && idLeads.customer.name}{" "}
            {idLeads && idLeads.customer.surname}
          </p>
        </div>
        <div className="flex  justify-between pt-[30px] w-[90%]">
          <div>
            <p className="font-inter text-[18px] font-medium leading-[24.2px] text-left pb-[20px]">
              Expected revenue
            </p>
            <p className="font-inter text-[17px] font-normal leading-[24.2px] text-left">
              $ {idLeads && idLeads.lead.expectedRevenue}
            </p>
          </div>
          <div>
            <p className="font-inter text-[18px] font-medium leading-[24.2px] text-left pb-[20px]">
              Probability
            </p>
            <p className="font-inter text-[17px] font-normal leading-[24.2px] text-left">
              at {idLeads && idLeads.lead_Stag_History.probability} %
            </p>
          </div>
          <div>
            <p className="font-inter text-[18px] font-medium leading-[24.2px] text-left pb-[20px]">
              Product
            </p>
            <button className={`rounded ${idLeads && leadColor[idLeads.product.name]} flex justify-center items-center`}>
              <p className="w-[110px]  p-[2px] px-[5px] text-[15px] text-white">
                {idLeads && idLeads.product.name}
              </p>
            </button>
          </div>
          <div>
            <p className="font-inter text-[18px] font-medium leading-[24.2px] text-left pb-[20px]">
              Expected closing date
            </p>
            <p className="font-inter text-[17px] font-normal leading-[24.2px] text-left">
              {idLeads &&
                idLeads.lead_Stag_History.expectedClosingDate
                  .split("T")[0]
                  .replace("-", "/")}
            </p>
          </div>
        </div>
        <div className="pt-[40px] flex">
          <div className="grid grid-cols-2  h-[140px] w-[50%]">
            <p className="font-inter text-[18px] font-medium leading-[24.2px] text-left">
              Company
            </p>
            <p className="font-inter text-[16px] text-[#031225] font-normal leading-[24.2px] text-left">
              {idLeads && idLeads.customer.company}
            </p>

            <p className="font-inter text-[18px] font-medium leading-[24.2px] text-left">
              Department
            </p>
            <p className="font-inter text-[16px] text-[#031225] font-normal leading-[24.2px] text-left">
              {idLeads && idLeads.customer.department}
            </p>

            <p className="font-inter text-[18px] font-medium leading-[24.2px] text-left">
              Position
            </p>
            <p className="font-inter text-[16px] text-[#031225] font-normal leading-[24.2px] text-left">
              {idLeads && idLeads.customer.position}
            </p>
          </div>

          <div className="grid grid-cols-2  h-[140px] w-[50%]">
            <p className="font-inter text-[18px] font-medium leading-[24.2px] text-left">
              Email
            </p>
            <p className="font-inter text-[16px] text-[#031225] font-normal leading-[24.2px] text-left">
              {idLeads && idLeads.customer.email}
            </p>

            <p className="font-inter text-[18px] font-medium leading-[24.2px] text-left">
              Phone
            </p>
            <p className="font-inter text-[16px] text-[#031225] font-normal leading-[24.2px] text-left">
              {idLeads && idLeads.customer.phoneNumber}
            </p>

            <p className="font-inter text-[18px] font-medium leading-[24.2px] text-left">
              Salesperson
            </p>
            <div className="flex">
              <div className="w-7 h-7 bg-[#77919D] rounded-md overflow-hidden mr-[7px] flex justify-center items-center">
                <div className="top-1 left-2 font-medium text-white text-base">
                  {idLeads && idLeads.user.name[0]}
                </div>
              </div>
              <p className="font-inter text-[16px] text-[#031225] font-normal leading-[24.2px] text-left">
                {idLeads && idLeads.user.name} {idLeads && idLeads.user.surname}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-[1] ">
        <div className="inline-flex w-full flex-col items-start relative">
          <div className="flex items-center px-5 w-full relative ">
            <button className="flex items-center justify-center gap-2.5 p-2.5 w-[150px] bg-white border border-t-[2px] border-t-[#1971F6]">
              <p className="relative  text-[16px] text-[var(--main-text-color)] font-normal font-inter whitespace-nowrap">
                Internal Notes
              </p>
            </button>
            <button
              onClick={handleSaveNote}
              className="flex items-center justify-center gap-2.5 p-2.5 w-[150px] bg-[#1971F6] border border-[#d2d2d5] ml-[-1px] relative transition-colors duration-300 ease-in-out hover:bg-[#155CCB]">
              <p className="relative text-white text-[16px] font-normal font-inter whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-[#E0E0E0]">
                Save Notes
              </p>
            </button>

          </div>
          <div className="flex items-start gap-2.5 p-5 mt-[-1px] w-full h-[459px] bg-white border border-[#d2d2d5] rounded-[4px] relative">
            <textarea
              value={noteInput.content}
              onChange={handleNoteChange}
              className="w-full h-full p-3 border-none resize-none outline-none text-[16px] text-[var(--text-color-grey)] font-normal font-inter rounded-md"
              placeholder="Add a description..."
            ></textarea>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LeadsDetailsMain;
