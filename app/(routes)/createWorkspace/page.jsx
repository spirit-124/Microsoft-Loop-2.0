"use client";

import CoverPicker from "@/app/components/global/CoverPicker";
import EmojiPickerComponent from "@/app/components/global/EmojiPickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/config/firebaseConfig";
import { useAuth, useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { doc, setDoc } from "firebase/firestore";
import { Loader2Icon, SmilePlus } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import uuid4 from "uuid4";

const CreateWorkSpacePage = () => {
  const [coverImage, setCoverImage] = useState("/cover.png");
  const [workspace, setWorkspace] = useState([]);
  const [emoji, setEmoji] = useState();
  const { user } = useUser();
  const { orgId } = useAuth();
  const [loading, setLoading] = useState();
  const router = useRouter();

  const OnCreateWorkspace = async () => {
    setLoading(true);
    const workspaceId = Date.now();

    //   * Used to create new workspace and save data
    const reuslt = await setDoc(doc(db, "workspace", workspaceId.toString()), {
      workspaceName: workspace,
      coverImage,
      emoji,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      id: workspaceId,
      orgId: orgId ? orgId : user?.primaryEmailAddress.emailAddress,
    });

    const docId = uuid4();
    await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
      workspaceId: workspaceId,
      coverImage: null,
      emoji: null,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      id: docId,
      documentName: "Untittled Document",
      documentOutput: [],
    });

    await setDoc(doc(db, "workspace", docId.toString()), {
      docId,
      documentOutput: [],
    });
    setLoading(false);
    router.replace("/workspace/" + workspaceId + "/" + docId);
    // console.log("Data Inserted");
  };

  return (
    <div className=" p-10 md:px-36 lg:px-64 xl:px-96 py-28">
      <div className=" shadow-2xl rounded-xl">
        {/* COVER IMAGE  */}
        <CoverPicker setNewCover={(v) => setCoverImage(v)}>
          <div className=" relative group cursor-pointer">
            <div className=" hidden bg-primary/20 hover:bg-primary/50 absolute p-1 h-[20%] w-[20%]  top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] items-center rounded-md justify-center group-hover:flex">
              <h2 className=" ">Change cover</h2>
            </div>
            <div>
              <Image
                src={coverImage}
                height={400}
                width={400}
                alt="cover"
                className=" object-cover rounded-t-xl w-full h-[150px] group-hover:opacity-40 "
              />
            </div>
          </div>
        </CoverPicker>
        {/* INPUT SECTION  */}
        <div className="p-12">
          <h2 className=" font-medium text-xl">create a new workspace</h2>
          <h2 className=" text-sm mt-2">
            This is a shared spaace where you can collaborate with your team.
            You can always chnage it later !!
          </h2>
          <div className=" mt-8 flex gap-2 items-center">
            <EmojiPickerComponent
              setEmojiIcon={(v) => {
                setEmoji(v);
              }}
            >
              <Button variant="outline">{emoji ? emoji : <SmilePlus />}</Button>
            </EmojiPickerComponent>
            <Input
              placeholder="workspace Name"
              onChange={(e) => {
                setWorkspace(e.target.value);
              }}
            />
          </div>
          <div className=" mt-7 flex justify-end gap-6">
            <Button
              disabled={!workspace?.length || loading}
              onClick={OnCreateWorkspace}
            >
              Create{loading && <Loader2Icon className=" animate-spin ml-2" />}
            </Button>
            <Button variant="outline"> Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkSpacePage;
