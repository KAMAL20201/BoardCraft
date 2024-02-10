"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
const EmptyBoard = () => {
  const { mutate, pending } = useApiMutation(api.board.create);
  const { organization } = useOrganization();
  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    }).then((id)=> {
      toast.success("Board created");
      //TODO: redirect to boardid
    }).catch((error)=>{
      toast.error(error.message);
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="Empty" height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create your first board</h2>
      <p className="text-muted-foreground text-sm mt-2 ">
        Start by creating a new board
      </p>
      <div className="mt-6">
        <Button disabled={pending} size="lg" onClick={onClick}>
          Create board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
