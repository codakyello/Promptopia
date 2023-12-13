"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@ui/Profile";

function MyProfile() {
  const router = useRouter();
  function handleEdit(post) {
    console.log(post);
    router.push(`/update-prompt?id=${post._id}`);

    // Get the edited data here
  }
  async function handleDelete(post) {
    console.log("here");
    try {
      const response = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Post could not be deleted");
      }

      router.push("/");
    } catch (e) {
      console.log(e.message);
    }
  }

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const { data: session } = useSession();
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);

        const session = await getSession();

        const res = await fetch(`/api/users/${session?.user.id}/posts`);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();
        setPosts(data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    (async function session() {
      const session = await getSession();
      if (session?.user?.id) fetchPosts();
    })();
  }, []);
  return (
    <Profile
      name="My"
      desc="Welcome to your personlized profile page"
      data={posts}
      isLoading={isLoading}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
