"use client";
import React from "react";
import SideNav from "../../_components/SideNav";

const page = ({ params }) => {
  return (
    <div>
      {/* SIDENAV  */}
      <div className=" ">
        <SideNav params={params} />
      </div>
      {/* DOCUMENT  */}
      <div className=" md:ml-72">Document</div>
    </div>
  );
};

export default page;
