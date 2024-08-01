"use client";

import CoverPicker from "@/app/components/global/CoverPicker";
import EmojiPickerComponent from "@/app/components/global/EmojiPickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { SmilePlus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const CreateWorkSpacePage = () => {
  const [coverImage, setCoverImage] = useState("/cover.png");
  const [workspace, setWorkspace] = useState([]);
  const [emoji, setEmoji] = useState();

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
            <Button disabled={!workspace?.length}>Create</Button>
            <Button variant="outline"> Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkSpacePage;
