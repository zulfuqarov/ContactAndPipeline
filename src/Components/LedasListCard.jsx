import React, { useState, useEffect, useContext } from "react";
import NoteLogo from "../Assets/Img/NoteLogo.svg";
import { Link } from "react-router-dom";
import { ContextCrm } from "../ContextCrm/ContextCrm";

const LedasListCard = ({ index, OneMap }) => {

  const { leadColor } = useContext(ContextCrm)

  return (
    <div
      key={index}
      className="flex items-center relative  border border-gray-300  "
    >
      <div className="flex w-[307px] h-[52px] items-center gap-3 p-2 pl-5 ">
        <Link
          to={`/Leads/${OneMap.lead.id}`}
          className="flex items-center gap-2 relative flex-shrink-0"
        >
          <img className="relative w-6 h-6" src={NoteLogo} />
        </Link>
        <div className="flex items-center gap-4 relative flex-shrink-0">
          <p className="relative w-fit mt-[-1px] font-normal text-gray-900 text-sm">
            {OneMap.customer.name} {OneMap.customer.surname}
          </p>
        </div>
      </div>

      <div className="flex w-[307px] h-[52px] items-center gap-3 p-2 pl-5 ">
        <div className="flex items-center gap-4 relative flex-shrink-0">
          <p className="relative w-fit mt-[-1px] font-normal text-gray-900 text-sm">
            {OneMap.customer.company ? OneMap.customer.company : '------'}
          </p>
        </div>
      </div>

      <div className="flex w-[307px] h-[52px] items-center gap-3 p-2 pl-5 ">
        <div className="flex items-center">
          <button
            className={`flex items-center justify-center gap-2 ${leadColor[OneMap.product.name]} rounded-full py-0.5 px-2 w-[150px]`}
          >
            <p className="text-white text-sm">
              {OneMap.product ? OneMap.product.name : "no Product"}
            </p>
          </button>
        </div>
      </div>

      <div className="flex w-[307px] h-[52px] items-center gap-3 p-2 pl-5 ">
        <div className="flex items-center gap-4 relative flex-shrink-0">
          <p className="relative w-fit mt-[-1px] font-normal text-gray-900 text-sm">
            $ {OneMap.lead.expectedRevenue}
          </p>
        </div>
      </div>

      <div className="flex w-[306px] h-[52px] items-center gap-3 p-2 pl-5 ">
        <div className="flex items-center gap-4 relative flex-shrink-0">
          <p className="relative w-fit mt-[-1px] font-normal text-gray-900 text-sm">
            {OneMap.lead_Stag_History.expectedClosingDate.split("T")[0]}
          </p>
        </div>
      </div>

      <div className="flex w-[307px] h-[52px] items-center gap-3 p-2 pl-5 ">
        <div className="relative w-[28px] h-[28px] bg-[#77919d] rounded-full flex items-center justify-center">
          <p className="relative w-fit text-white text-sm">
            {" "}
            {OneMap.user.name[0]}
          </p>
        </div>
        <div className="flex items-center gap-4 relative flex-shrink-0">
          <p className="relative w-fit mt-[-1px] font-normal text-gray-900 text-sm">
            {OneMap.user.name} {OneMap.user.surname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LedasListCard;
