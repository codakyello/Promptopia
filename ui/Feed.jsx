"use client";
import { useState, useEffect } from "react";
import PromptCard from "@ui/PromptCard";

const PromptCardList = ({ data, isLoading, handleTagClick }) => {
  const [copied, setCopied] = useState("");
  if (isLoading)
    return (
      <div>
        <div className="spinner"></div>
      </div>
    );
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          copied={copied}
          setCopied={setCopied}
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setposts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleTagClick(tag) {
    setSearchText("");
    setSearchText(tag);
  }
  const filter = searchText.toLowerCase();

  const filteredPosts = posts
    .slice()
    .filter(
      (post) =>
        post.creator.username.toLowerCase().includes(filter) ||
        post.tag.toLowerCase().includes(filter) ||
        post.prompt.toLowerCase().includes(filter)
    );

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/prompt");

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();
        setposts(data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search_input peer"
        />
      </form>

      <PromptCardList
        handleTagClick={handleTagClick}
        isLoading={isLoading}
        data={filteredPosts}
      />
    </section>
  );
}

export default Feed;
