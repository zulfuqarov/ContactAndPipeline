import React, { useState, useEffect, useContext } from "react";
import { ContextCrm } from "../ContextCrm/ContextCrm";

const LeadsCard = ({ Leads }) => {
  const { leadColor, handleUpdateLeadsShow } = useContext(ContextCrm)
  // const getRandomColor = () => {
  //   return buttonColors[Math.floor(Math.random() * buttonColors.length)];
  // };

  // useEffect(() => {
  //   if (!leadColor) {
  //     const newColor = getRandomColor();
  //     setLeadColor(newColor);
  //   }
  // }, [leadColor]);

  return (
    <div className="flex flex-col gap-3 p-4 bg-white border border-gray-300 rounded-md">
      <div className="flex w-86 gap-20">
        <div className="flex flex-col w-full gap-2 ">
          <div className="flex flex-col gap-1">
            <div className="font-medium text-main-text-color text-base flex justify-between">
              <p> {Leads.customer.name} {Leads.customer.surname}</p>
              {
                Leads.lead.stage_Id === "74e5b9fd-676a-4962-87a1-26e64d6cb5b3" ?
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdateLeadsShow(Leads)
                    }}
                    className="hover:text-black text-slate-400 transition-all"><i className="fa-solid fa-pen "></i></button> : ''
              }
            </div>
            <div className="font-normal text-blue-700 text-base">
              {
                Leads.customer.company
              }
            </div>
          </div>
          <div className="font-normal text-gray-500 text-base">
            $ {Leads.lead.expectedRevenue}
          </div>
          <button
            className={`flex items-center justify-center gap-2 ${leadColor[Leads.product.name]} rounded-full py-0.5 px-2 w-[150px]`}
          >
            <p className="text-white text-sm">{Leads.product.name}</p>
          </button>
        </div>
      </div>
      <div className="flex justify-between w-86 items-end">
        <div className="flex gap-2">
          <div className="text-gray-500 text-base">Closing date:</div>
          <div className="text-gray-500 text-base">
            {Leads.lead_Stag_History.expectedClosingDate.split("T")[0]}
          </div>
        </div>
        <div className="w-7 h-7 flex justify-center items-center bg-[#77919D] rounded-md overflow-hidden">
          <div className=" top-1 left-2 font-medium text-white text-base">
            {Leads.user.name[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsCard;
