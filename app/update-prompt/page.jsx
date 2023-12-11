"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@ui/Form";

function EditPrompt() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const router = useRouter();

  const searchParams = useSearchParams();

  const promptId = searchParams.get("id");

  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const getPromptDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`api/prompt/${promptId}`);

        if (!res.ok) throw new Error("Prompt not found");

        const data = await res.json();

        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPromptDetails();
  }, []);
  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
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

  if (!session?.user?.id) return router.push("/");
  if (isLoading) return <div className="spinner"></div>;
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      handleSubmit={editPrompt}
    />
  );
}

export default EditPrompt;
