"use client";
import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/clerk-react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  useOrganization,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  // const orgId: string | undefined = undefined;
  // if (organization.isLoaded && user.isLoaded) {
  //   orgId = organization.organization?.id ?? user.user?.id;
  // }
  const files = useQuery(
    api.files.getFiles,
    organization?.id ? { orgId: organization?.id } : "skip"
  );
  const createFile = useMutation(api.files.createFile);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}

      <Button
        onClick={() => {
          if (!organization) return;
          createFile({
            name: "hello world",
          });
        }}
      >
        Click Me
      </Button>
    </main>
  );
}
