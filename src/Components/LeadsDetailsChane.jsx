import React, { useContext, useEffect } from "react";
import { ContextCrm } from "../ContextCrm/ContextCrm";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LeadsDetailsChane = () => {
  const { id } = useParams();
  const { leads, stage, handleChangeLeadsStage } = useContext(ContextCrm);
  const navigate = useNavigate();

  const nuberPaginationsLeft = (id) => {
    const index = leads.findIndex((lead) => lead.lead.id === id);
    if (index > 0) {
      const previousId = leads[index - 1].lead.id;

      navigate(`/leads/${previousId}`);
    }
  };

  const nuberPaginationsRight = (id) => {
    const index = leads.findIndex((lead) => lead.lead.id === id);
    if (index < leads.length - 1) {
      const nextId = leads[index + 1].lead.id;
      navigate(`/leads/${nextId}`);
    }
  };

  const findIndex = (id) => {
    const index = leads.findIndex((lead) => lead.lead.id === id);
    return index + 1;
  };

  const findLeadsStage = (id) => {
    const index = leads.findIndex((lead) => lead.lead.id === id);
    if (index > -1) {
      return leads[index].lead.stage_Id;
    }
    return null;
  };

  return (
    <div className="flex items-center justify-between relative py-[20px]">
      <div className="flex items-center gap-2">
        {stage &&
          stage.map((oneStage) => (
            <button
              onClick={() => {
                if (findLeadsStage(id) !== oneStage.id) {
                  handleChangeLeadsStage(id, oneStage.id);
                } else {
                  toast.error("This lead already exists.");
                }
              }}
              className={`flex items-center justify-center h-11 ${
                findLeadsStage(id) === oneStage.id
                  ? " bg-blue-600"
                  : "bg-[#F3F4F6]"
              } rounded px-3`}
            >
              <p
                className={`${
                  findLeadsStage(id) === oneStage.id
                    ? "text-white"
                    : "text-black"
                } text-base font-normal whitespace-nowrap`}
              >
                {oneStage.name}
              </p>
            </button>
          ))}
      </div>
      <div className="flex items-center gap-3">
        <p className="text-gray-600 text-lg font-normal whitespace-nowrap">
          {findIndex(id)} / {leads.length}{" "}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => nuberPaginationsLeft(id)}
            className="flex justify-center items-center w-11 h-11 bg-[#F3F4F6] border border-gray-300 rounded p-2"
          >
            <i className="fa-solid fa-arrow-left-long text-[#7C838B]"></i>
          </button>
          <button
            onClick={() => nuberPaginationsRight(id)}
            className="flex justify-center items-center w-11 h-11 bg-[#F3F4F6] border border-gray-300 rounded p-2"
          >
            <i className="fa-solid fa-arrow-right-long text-[#7C838B]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadsDetailsChane;
