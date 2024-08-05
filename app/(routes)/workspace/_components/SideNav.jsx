"use client";
import Logo from "@/app/components/Logo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { Bell, Loader2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DocumentList from "./DocumentList";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";

const SideNav = ({ params }) => {
  const [documentList, setDocumentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    params && GetDocumentList();
  }, [params]);

  const GetDocumentList = () => {
    const q = query(
      collection(db, "workspaceDocuments"),
      where("workspaceId", "==", Number(params?.workspaceId))
    );
    setDocumentList([]);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setDocumentList((documentList) => [...documentList, doc.data()]);
      });
    });
  };
  // Create New Document
  const createNewDocument = async () => {
    setIsLoading(true);
    const docId = uuid4();
    await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
      workspaceId: Number(params?.workspaceId),
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
    setIsLoading(false);
    router.replace("/workspace/" + params?.workspaceId + "/" + docId);
  };

  return (
    <div className="h-screen md:w-72 fixed p-5  md:block   bg-blue-50 hidden">
      <div className=" flex justify-between items-center">
        <Logo />
        <Bell className=" h-5 w-5 text-gray-500" />
      </div>
      <hr className=" my-5"></hr>
      <div className=" flex justify-between items-center">
        <h2 className="  font-medium">Workspace Name</h2>
        <Button size="sm" onClick={createNewDocument}>
          {isLoading ? <Loader2Icon className=" h-4 w-4 animate-spin" /> : "+"}
        </Button>
      </div>
      {/* DOCUMENT LIST  */}
      <div>
        <DocumentList documentList={documentList} params={params} />
      </div>
    </div>
  );
};

export default SideNav;
