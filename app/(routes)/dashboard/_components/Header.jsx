"use client";

import Logo from "@/app/components/Logo";
import { OrganizationSwitcher, useAuth, UserButton } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  const { orgId } = useAuth();
  console.log("orgId: ", orgId);
  return (
    <div className=" flex items-center justify-between shadow-sm py-4 px-10">
      <Logo />
      <OrganizationSwitcher
        afterLeaveOrganizationUrl={"/dashboard"}
        afterCreateOrganizationUrl={"/dashboard"}
        afterDeleteOrganization={"/dashboard"}
      />
      <UserButton />
    </div>
  );
};

export default Header;
