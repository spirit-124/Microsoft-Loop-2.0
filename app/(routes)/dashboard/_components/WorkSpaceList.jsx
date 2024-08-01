"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { AlignLeft, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const WorkSpaceList = () => {
  const { user } = useUser();

  const [workspaceList, setWorkspaceList] = useState([]);
  return (
    <div className=" my-10 p-10 md:px-24 lg:px-36 xl:px-62">
      <div className=" flex justify-between items-center">
        <h2 className=" font-bold text-2xl">Hello {user?.fullName}</h2>
        <Link href="/createWorkspace">
          <Button>+</Button>
        </Link>
      </div>
      <div className=" mt-10 flex justify-between items-center">
        <div className=" text-primary font-medium">
          <h2>Workspaces</h2>
        </div>
        <div className=" flex gap-2">
          <LayoutGrid />
          <AlignLeft />
        </div>
      </div>
      {workspaceList?.length == 0 ? (
        <div className=" flex justify-center items-center flex-col my-10">
          <Image
            src={"/workspace.png"}
            height={200}
            width={200}
            alt="workspace"
          />
          <h2>Create a new workspace</h2>
          <Link href="/createWorkspace">
            <Button variant="outline"> + New Workspace</Button>
          </Link>
        </div>
      ) : (
        <div>Workspace list item</div>
      )}
    </div>
  );
};

export default WorkSpaceList;
