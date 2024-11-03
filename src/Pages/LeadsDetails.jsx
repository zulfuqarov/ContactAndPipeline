import { useParams } from "react-router-dom";
import LeadsDetailsNav from "../Components/LeadsDetailsNav";
import LeadsDetailsChane from "../Components/LeadsDetailsChane";
import LeadsDetailsMain from "../Components/LeadsDetailsMain";
import { useContext, useEffect } from "react";
import { ContextCrm } from "../ContextCrm/ContextCrm";
const LeadsDetails = () => {
  const { id } = useParams();

  const { handleGetIdLeads, idLeads } = useContext(ContextCrm);

  useEffect(() => {
    handleGetIdLeads(id);
  }, [id]);
  return (
    <section className="pt-[40px] mx-auto container">
      <LeadsDetailsNav />
      <LeadsDetailsChane />
      <LeadsDetailsMain idLeads={idLeads} />
    </section>
  );
};

export default LeadsDetails;
