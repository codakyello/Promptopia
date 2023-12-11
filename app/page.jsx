import Feed from "@ui/Feed";

function Home() {
  return (
    <section className="z-20 mt-20 max-w-lg mr-auto ml-auto flex flex-col items-center">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="text-center mt-5">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      {/* <input
        className="search_input"
        placeholder="Search for a tag or a username"
      /> */}
      <Feed />
    </section>
  );
}

export default Home;
