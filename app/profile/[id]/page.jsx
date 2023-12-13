"use client";

import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@ui/Profile";

function UserProfile({ searchParams: { username }, params }) {
  const router = useRouter();
  function handleEdit(post) {
    console.log(post);
    router.push(`/update-prompt?id=${post._id}`);
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

  // const { data: session } = useSession();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/users/${params.id}/posts`);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();
        setPosts(data);
        console.log("Post fetched");
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <Profile
      name={username}
      desc="Welcome to your personlized profile page"
      data={posts}
      isLoading={isLoading}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default UserProfile;
