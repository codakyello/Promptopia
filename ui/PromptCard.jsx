"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useParams } from "next/navigation";

function PromptCard({
  post,
  copied,
  setCopied,
  handleTagClick,
  handleEdit,
  handleDelete,
}) {
  const pathName = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();
  function handleCopy() {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  function handleClick() {
    router.push(
      `/profile/${post.creator._id}?username=${post.creator.username}`
    );
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            onClick={handleClick}
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div onClick={handleClick} className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>

          <div className="copy_btn" onClick={handleCopy}>
            <Image
              alt="icon"
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id &&
        (pathName === "/profile" || pathName === `/profile/${id}`) && (
          <div>
            {" "}
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              onClick={handleDelete}
              className="font inter text-sm orange_gradient cursor-pointer"
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
}

export default PromptCard;
