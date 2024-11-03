import React, { useContext, useState } from "react";

import ContacLogo from "../Assets/Img/ContacLogo.svg";
import CompanyLogo from "../Assets/Img/CompanyLogo.svg";
import ProductLogo from "../Assets/Img/ProductLogo.svg";
import RevenueLogo from "../Assets/Img/RevenueLogo.svg";
import DataLogo from "../Assets/Img/DataLogo.svg";
import SalesPersonLogo from "../Assets/Img/SalesPersonLogo.svg";
import LedasListCard from "./LedasListCard";
import { ContextCrm } from "../ContextCrm/ContextCrm";
const LeadsList = () => {
  const { leads, nameFilter } = useContext(ContextCrm);

  return (
    <div>
      <div className="flex items-center relative border-b border-gray-300">
        <div className="w-[307px] flex items-center gap-2 py-3 px-5">
          <img className="w-6 h-6" src={ContacLogo} alt="User" />
          <div className="font-normal text-gray-600 text-base whitespace-nowrap">
            Contact
          </div>
        </div>
        <div className="w-[306px] flex items-center gap-2 py-3 px-5">
          <img className="w-6 h-6" src={CompanyLogo} alt="Company" />
          <div className="font-normal text-gray-600 text-base whitespace-nowrap">
            Company
          </div>
        </div>
        <div className="w-[307px] flex items-center gap-2 py-3 px-5">
          <img className="w-6 h-6" src={ProductLogo} alt="Product" />
          <div className="font-normal text-gray-600 text-base whitespace-nowrap">
            Product
          </div>
        </div>
        <div className="w-[307px] flex items-center gap-2 py-3 px-5">
          <img className="w-6 h-6" src={RevenueLogo} alt="Expected revenue" />
          <div className="font-normal text-gray-600 text-base whitespace-nowrap">
            Expected revenue
          </div>
        </div>
        <div className="w-[306px] flex items-center gap-2 py-3 px-5">
          <img className="w-6 h-6" src={DataLogo} alt="Closing date" />
          <div className="font-normal text-gray-600 text-base whitespace-nowrap">
            Closing date
          </div>
        </div>
        <div className="w-[307px] flex items-center gap-2 py-3 px-5">
          <img className="w-6 h-6" src={SalesPersonLogo} alt="Salesperson" />
          <div className="font-normal text-gray-600 text-base whitespace-nowrap">
            Salesperson
          </div>
        </div>
      </div>
      <div>

        {
          nameFilter.length > 0 ?
            nameFilter.map((OneMap, index) => (
              <LedasListCard OneMap={OneMap} index={index} />
            )) : leads.map((OneMap, index) => (
              <LedasListCard OneMap={OneMap} index={index} />
            ))
        }


      </div>
    </div>
  );
};

export default LeadsList;
