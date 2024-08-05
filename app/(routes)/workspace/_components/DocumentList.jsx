"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import DocumentOptions from "./DocumentOptions";

const DocumentList = ({ documentList, params }) => {
  const router = useRouter();
  return (
    <div>
      {documentList.map((document, index) => (
        <div
          key={index}
          onClick={
            (router.push(
              "/workspace/" + params?.workspaceId + "/" + document?.id
            ),
            console.log("clicked"))
          }
          className={`mt-3 p-2 px-3 hover:bg-gray-200 rounded-lg cursor-pointer ${
            document?.id == params.documentId && "bg-white"
          } flex items-center justify-between`}
        >
          <div className=" flex gap-2 items-center">
            {!document?.emoji && (
              <Image
                src={"/loopdocument.svg"}
                alt="loop Document"
                height={20}
                width={20}
              />
            )}
            <h2 className=" flex gap-2">
              {document?.emoji}
              {document.documentName}
            </h2>
            {console.log(document)}
          </div>
          <div>
            <DocumentOptions />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
