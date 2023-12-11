"use client";
import { useState } from "react";
import PromptCard from "./PromptCard";
import Link from "next/link";
function Profile({ name, isLoading, desc, data, handleEdit, handleDelete }) {
  const [copied, setCopied] = useState("");

  if (isLoading) return <div className="spinner"></div>;
  if (!data.length)
    return <Link href="/create-prompt">Create your First Post</Link>;
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            copied={copied}
            setCopied={setCopied}
            key={post._id}
            post={post}
            handleEdit={() => handleDelete && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;
