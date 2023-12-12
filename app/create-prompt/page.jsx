"use client";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@ui/Form";

function CreatePrompt() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const router = useRouter();

  const { data: session } = useSession();

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });
      if (!response.ok) {
        throw new Error("Post could not be created");
      }

      router.push("/");
    } catch (e) {
      console.log(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!session?.user?.id) return router.push("/"); //Doesn't want until render is completed
  }, [session]);

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      handleSubmit={createPrompt}
    />
  );
}

export default CreatePrompt;
