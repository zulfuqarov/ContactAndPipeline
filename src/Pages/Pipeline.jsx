import React, { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import StageCard from "../Components/StageCard";
import { ContextCrm } from "../ContextCrm/ContextCrm";
import LeadsCard from "../Components/LeadsCard";
import { Link } from "react-router-dom";
import AddStage from "../Components/AddStage";
import List from "../Components/List";
import LeadsList from "../Components/LeadsList";

const Pipeline = () => {
  const { stage, setstage, leads, setleads, handleChangeLeadsStage, nameFilter, setnameFilter } =
    useContext(ContextCrm);

  const onDragEnd = (result) => {
    const { source, destination, type, draggableId } = result;

    if (!destination) return;

    if (type === "Stage") {
      const newStage = [...stage];
      const [reorderedStage] = newStage.splice(source.index, 1);
      newStage.splice(destination.index, 0, reorderedStage);
      localStorage.setItem("newStage", JSON.stringify(newStage))
      setstage(JSON.parse(localStorage.getItem("newStage")));
      return;
    }

    if (type === "Leads") {
      const newLeads = leads.map((oneMap) =>
        oneMap.lead.id === draggableId && (JSON.parse(localStorage.getItem('userId')).value === 9 || oneMap.lead.userId === JSON.parse(localStorage.getItem('userId')).value) &&

          oneMap.lead_Stag_History.expectedClosingDate !== "2024-11-01T00:00:00"
          ? {
            ...oneMap,
            lead: { ...oneMap.lead, stage_Id: destination.droppableId },
          }
          : { ...oneMap }
      );
      setleads(newLeads);

      if (nameFilter.length > 0) {
        const newLeads = nameFilter.map((oneMap) =>
          oneMap.lead.id === draggableId && oneMap.lead.userId === JSON.parse(localStorage.getItem('userId')).value
            ? {
              ...oneMap,
              lead: { ...oneMap.lead, stage_Id: destination.droppableId },
            }
            : { ...oneMap }
        );

        setnameFilter(newLeads);
      }
      handleChangeLeadsStage(draggableId, destination.droppableId);
    }
  };

  const [showListLeads, setshowListLeads] = useState(false);
  const toggleListAndGrid = () => {
    setshowListLeads(!showListLeads);
  };

  if (showListLeads) {
    return (
      <div className={"bg-[#F9FAFB]"}>
        <List
          toggleListAndGrid={toggleListAndGrid}
          showListLeads={showListLeads}
        />
        <LeadsList />
      </div>
    );
  } else {
    return (
      <div className="w-full bg-[#F9FAFB]">
        <List
          toggleListAndGrid={toggleListAndGrid}
          showListLeads={showListLeads}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="categories"
            type="Stage"
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <div
                className={`  flex   transition-colors duration-200 ${snapshot.isDraggingOver
                  ? "bg-gray-100 border-2 border-dashed border-gray-200"
                  : ""
                  }`}
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ width: `${376 * stage.length}px` }}

              >
                {
                  stage &&
                  stage.map((Onestage, index) => (
                    <Draggable
                      key={Onestage.id}
                      draggableId={Onestage.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="w-full px-[8px] "
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <StageCard Stage={Onestage} number={index} />
                          <Droppable droppableId={Onestage.id} type="Leads">
                            {(provided, snapshot) => (
                              <div
                                className={`w-[360px]  transition-colors duration-200 ${snapshot.isDraggingOver
                                  ? "bg-gray-100 border-2 border-dashed border-gray-200"
                                  : ""
                                  }`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                  minHeight: "150px",
                                }}
                              >
                                {

                                  nameFilter.length > 0 ?
                                    nameFilter
                                      .filter(
                                        (oneLeads) =>
                                          oneLeads.lead.stage_Id === Onestage.id
                                      )
                                      .map((OneMap, index) => (
                                        <Draggable
                                          key={OneMap.lead.id}
                                          draggableId={OneMap.lead.id}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <Link
                                              to={`/Leads/${OneMap.lead.id}`}
                                              className="mb-[10px] inline-block w-full !cursor-pointer"
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={{
                                                ...provided.draggableProps.style,
                                              }}
                                            >
                                              <LeadsCard Leads={OneMap} />
                                            </Link>
                                          )}
                                        </Draggable>
                                      )) :
                                    leads &&
                                    leads
                                      .filter(
                                        (oneLeads) =>
                                          oneLeads.lead.stage_Id === Onestage.id
                                      )
                                      .map((OneMap, index) => (
                                        <Draggable
                                          key={OneMap.lead.id}
                                          draggableId={OneMap.lead.id}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <Link
                                              to={`/Leads/${OneMap.lead.id}`}
                                              className="mb-[10px] inline-block w-full !cursor-pointer"
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={{
                                                ...provided.draggableProps.style,
                                              }}
                                            >
                                              <LeadsCard Leads={OneMap} />
                                            </Link>
                                          )}
                                        </Draggable>
                                      ))
                                }
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                <AddStage />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
};

export default Pipeline;
