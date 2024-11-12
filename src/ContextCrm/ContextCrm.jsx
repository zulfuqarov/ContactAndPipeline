import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ContextUserData } from "./ContextUser";
import { ContactContext } from "../context-conact/ContextContact";
export const ContextCrm = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

const Context = ({ children }) => {

  const { userIdToken } = useContext(ContextUserData)
  const { addLeadsToPipeline } = useContext(ContactContext)

  const [succesPopaps, setsuccesPopaps] = useState(false)

  // Stage start
  const [stage, setstage] = useState([]);
  const getStage = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/Stages`);
      const newStageLocal = JSON.parse(localStorage.getItem("newStage")) || [];
      response.data.forEach(stage => {
        if (!newStageLocal.some(localStage => localStage.id === stage.id)) {
          newStageLocal.push(stage);
        }
      });

      const updatedStageLocal = newStageLocal.filter(localStage =>
        response.data.some(stage => stage.id === localStage.id)
      );

      response.data.forEach((stage) => {
        const existingStage = updatedStageLocal.find(localStage => localStage.id === stage.id);
        if (existingStage) {
          existingStage.total_Revenue = stage.total_Revenue;
        }
      })


      localStorage.setItem("newStage", JSON.stringify(updatedStageLocal))
      setstage(updatedStageLocal)
    } catch (error) {
      console.log(error);
      setstage([])
    }
  };
  const [addStage, setaddStage] = useState();
  const handleAddStage = async (stage) => {
    try {
      const response = await axios.post(`${apiUrl}/api/Stages`, stage);
      setaddStage(response.data);
      setsuccesPopaps(true)
    } catch (error) {
      console.log(error);
      toast.error("Failed to add stage!");
    }
  };
  const [editStage, seteditStage] = useState();
  const handleEditStage = async (stage) => {

    try {
      const response = await axios.put(`${apiUrl}/api/Stages/${stage.id}`, {
        name: stage.name,
        userId: stage.userId,
      });
      const newStageLocal = JSON.parse(localStorage.getItem("newStage")) || [];
      newStageLocal.find((localStage) => localStage.id === stage.id).name = stage.name;
      localStorage.setItem("newStage", JSON.stringify(newStageLocal))
      seteditStage(stage);
      setsuccesPopaps(true)
    } catch (error) {
      console.log(error);
      toast.error("Failed to update stage!");
    }
  };
  const [deleteStage, setdeleteStage] = useState();
  const handleDeleteStage = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/Stages/${id}`);
      const newStageLocal = JSON.parse(localStorage.getItem("newStage")) || [];
      localStorage.setItem("newStage", JSON.stringify(newStageLocal.filter((localStage) => localStage.id !== id)))
      setdeleteStage(id);
      setsuccesPopaps(true)
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete stage!");
    }
  };

  // Leads start
  const [leads, setleads] = useState([]);
  const getLeads = async () => {
    try {
      const response = await axios(`${apiUrl}/api/Leads`);
      setleads(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [newLeads, setnewLeads] = useState();
  const handleAddLeads = async (lead, stageId, userId) => {
    try {
      const response = await axios.post(`${apiUrl}/api/Leads`, {
        ...lead,
        stageId: stageId,
        userId: userId,
      });
      setnewLeads(response.data);
      setsuccesPopaps(true)
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data}`);
    }
  };
  const [editLeads, seteditLeads] = useState();
  const handleEditLeads = async (lead) => {
    try {
      const response = await axios.put(`${apiUrl}/api/Lead_Stage_History`, lead);
      seteditLeads(lead);
      setsuccesPopaps(true)
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data}`)
    }
  }
  const [idLeads, setidLeads] = useState();
  const handleGetIdLeads = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/Leads/${id}`);
      setidLeads(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [changeLeadsStage, setchangeLeadsStage] = useState();
  const handleChangeLeadsStage = async (leadId, newStageId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/Leads/${leadId}?stageId=${newStageId}&userId=${JSON.parse(localStorage.getItem('userId')).value}`
      );
      setchangeLeadsStage(response);
      setsuccesPopaps(true)
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data}`);
    }
  };
  const [searchLeadsContact, setsearchLeadsContact] = useState([]);
  const handleSearchLeadsContact = async (contact) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/Leads/SearchCustomers/${contact}`
      );
      setsearchLeadsContact(response.data);
    } catch (error) {
      console.log(error);
      setsearchLeadsContact([]);
    }
  };
  const [searchLeadsProduct, setsearchLeadsProduct] = useState([]);
  const handleSearchLeadsProduct = async (Product) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/Leads/SearchProducts/${Product}`
      );
      setsearchLeadsProduct(response.data);
    } catch (error) {
      console.log(error);
      setsearchLeadsProduct([]);
    }
  };
  const [updateLeadsShow, setupdateLeadsShow] = useState(false)
  const [updateLeadsData, setupdateLeadsData] = useState()
  const handleUpdateLeadsShow = (Leads) => {
    setupdateLeadsShow(!updateLeadsShow)
    setupdateLeadsData(Leads)
  }
  // const [swapStage, setswapStage] = useState()
  // const handleswapStage = async (draggedStageId, targetStageId) => {
  //   try {
  //     const response = await axios.post(`${apiUrl}/api/Stages/swap-stages/`, {
  //       draggedStageId: draggedStageId,
  //       targetStageId: targetStageId
  //     });
  //     setswapStage(targetStageId)
  //     setsuccesPopaps(true)
  //   } catch (error) {
  //     console.log(error)
  //     toast.error("Failed to swap stage!")
  //   }
  // }
  const [nameFilter, setnameFilter] = useState([])
  const handleFilterName = (e) => {
    const nameFilteringLeads = leads.filter((oneFilter) => {
      const fullName = `${oneFilter.customer.name} ${oneFilter.customer.surname}`;
      return fullName.toLowerCase().trim().includes(e.target.value.toLowerCase().trim());
    });
    setnameFilter(nameFilteringLeads)
  }


  const [userData, setuserIdData] = useState()
  const getUserData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/User`)
      const user = response.data.find((user) => user.id === userIdToken.userId.value);
      setuserIdData(user)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (userIdToken.token !== null && userIdToken.userId !== null) {
      getUserData()
    }
  }, [userIdToken])

  useEffect(() => {
    if (userIdToken.token !== null && userIdToken.userId !== null) {
      getStage();
    }
  }, [addStage, editStage, deleteStage, newLeads, changeLeadsStage, userIdToken,editLeads]);

  useEffect(() => {
    if (userIdToken.token !== null && userIdToken.userId !== null) {
      getLeads();
    }
  }, [newLeads, changeLeadsStage, userIdToken, editLeads, addLeadsToPipeline]);



  const [leadColor, setLeadColor] = useState({});
  const buttonColors = [
    "bg-[#FFA61A]",
    "bg-[#AF59F7]",
    "bg-[#F76A8B]",
    "bg-[#2B8547]",
    "bg-[#6A8BF7]",
    "bg-[#FF5733]",
    "bg-[#33C3FF]",
  ];

  useEffect(() => {
    const savedLeadColors = localStorage.getItem("leadColors");
    const leadsProductNameColor = savedLeadColors ? JSON.parse(savedLeadColors) : { ...leadColor }; // Mevcut renkleri koru

    leads.forEach((lead) => {
      const productName = lead.product.name;

      if (!leadsProductNameColor[productName]) {
        const usedColors = Object.values(leadsProductNameColor);
        const availableColors = buttonColors.filter(
          (color) => !usedColors.includes(color)
        );

        if (availableColors.length > 0) {
          leadsProductNameColor[productName] = availableColors[
            Math.floor(Math.random() * availableColors.length)
          ];
        }
      }
    });

    setLeadColor(leadsProductNameColor);
    localStorage.setItem("leadColors", JSON.stringify(leadsProductNameColor));
  }, [leads]);

  const [newLeadsListShow, setnewLeadsListShow] = useState(false)
  const newLeadsListFunc = () => {
    setnewLeadsListShow(!newLeadsListShow)
  }

  return (
    <ContextCrm.Provider
      value={{
        stage,
        setstage,
        handleAddStage,
        handleEditStage,
        handleDeleteStage,
        leads,
        setleads,
        handleAddLeads,
        handleChangeLeadsStage,
        searchLeadsContact,
        handleSearchLeadsContact,
        searchLeadsProduct,
        handleSearchLeadsProduct,
        idLeads,
        handleGetIdLeads,
        handleFilterName,
        nameFilter,
        setnameFilter,
        succesPopaps,
        setsuccesPopaps,
        leadColor,
        userData,
        newLeadsListFunc,
        setnewLeadsListShow,
        newLeadsListShow,
        handleUpdateLeadsShow,
        setupdateLeadsShow,
        updateLeadsShow,
        updateLeadsData,
        handleEditLeads
      }}
    >
      {children}
    </ContextCrm.Provider>
  );
};

export default Context;
