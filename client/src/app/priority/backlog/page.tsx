import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/types/enums";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Urgent;
