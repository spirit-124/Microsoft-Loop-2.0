import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CoverOptions from "./CoverOptions";
import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

import EmojiPicker from "emoji-picker-react";

const CoverPicker = ({ children, setNewCover }) => {
  const [selectedCover, setSelectedCover] = useState();

  return (
    <div>
      <Dialog>
        <DialogTrigger className=" w-full">{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Cover</DialogTitle>
            <DialogDescription>
              <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
                {CoverOptions.map((cover, index) => (
                  <div
                    key={index}
                    className={`${
                      selectedCover === cover?.imageUrl &&
                      "border-primary border-2"
                    } p-1 rounded-lg`}
                    onClick={() => setSelectedCover(cover?.imageUrl)}
                  >
                    <Image
                      src={cover?.imageUrl}
                      width={300}
                      height={300}
                      alt="cover"
                      className=" h-[4rem] w-full rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={() => setNewCover(selectedCover)}>
                Update
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoverPicker;
