import React from "react";
import Header from "./_components/Header";
import Logo from "@/app/components/Logo";
import WorkSpaceList from "./_components/WorkSpaceList";

const Dashboard = () => {
  return (
    <>
      <Header />
      <WorkSpaceList />
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
