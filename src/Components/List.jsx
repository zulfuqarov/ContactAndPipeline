import React, { useContext } from "react";
import PersonLogo from '../Assets/Img/PersonLogo.svg'
import GridLog from "../Assets/Img/GridLog.svg"
import { ContextCrm } from "../ContextCrm/ContextCrm";
const List = ({ showListLeads, toggleListAndGrid }) => {
  const { handleFilterName, newLeadsListFunc } = useContext(ContextCrm)
  return (
    <div className="frame flex w-[100%] items-center justify-between px-10 py-10 max-[991px]:flex-col">
      <div className="div-wrapper flex w-[168px] max-[991px]:justify-center max-[991px]:w-full gap-2 items-center relative max-[991px]:pb-[30px]">
        <div className="text-wrapper relative w-fit -mt-1 font-medium text-[32px] text-main-text-color leading-normal">
          Pipeline
        </div>
      </div>
      <div className="div inline-flex gap-3 flex-none items-center relative max-[991px]:block">
        <div className="flex justify-center items-center relative max-[991px]:mb-[30px]">
          <input
            onChange={handleFilterName}
            className="flex w-[413px] h-[44px] pl-[40px] pr-[16px] py-[10px] bg-white border border-gray-300 rounded-[4px] focus:outline-none focus:border-blue-500"
            placeholder="Search contacts"
          />
          <i className="fa-solid fa-magnifying-glass absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-500"></i>
        </div>
        <div className="div-2 inline-flex gap-2 flex-none items-center relative max-[991px]:w-full max-[991px]:justify-center">
          <button
            disabled={showListLeads ? true : false}
            onClick={toggleListAndGrid}
            className={`${showListLeads ? "border-blue-600 " : ""
              }div-3 inline-flex h-[44px] justify-center gap-2 px-[12px] flex-none bg-gray-200 border  rounded-[4px] items-center relative`}
          >
            <i className="fa-solid fa-bars-staggered" />
            <p
              className={`text-wrapper-3 relative w-fit font-normal text-main-text-color text-[16px] leading-normal whitespace-nowrap ${showListLeads ? "text-blue-600" : ""
                }`}
            >
              List
            </p>
          </button>
          <button
            disabled={showListLeads ? false : true}
            onClick={toggleListAndGrid}
            className={`${showListLeads ? "" : "border-blue-600 "
              } div-4 inline-flex h-[44px] justify-center gap-2 px-[12px] flex-none bg-gray-200 border rounded-[4px] items-center relative`}
          >
            <img src={GridLog} alt="" />
            <p
              className={`list relative w-fit font-normal  text-[16px] leading-normal whitespace-nowrap ${showListLeads ? "" : "text-blue-600"
                }`}
            >
              Grid
            </p>
          </button>
          <button
            onClick={newLeadsListFunc}
            className="div-5 inline-flex h-[44px] justify-center gap-3 px-[12px] flex-none bg-blue-600 rounded-[4px] items-center relative">
            <img src={PersonLogo} alt="" />
            <p className="new-contact relative w-fit font-normal text-white text-[16px] leading-normal whitespace-nowrap">
              New Lead
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
