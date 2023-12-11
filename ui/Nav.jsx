"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import useOutsideClick from "@hooks/useOutsideClick";

function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  const [toggleDropdown, settoggleDropdown] = useState(false);

  const ref = useOutsideClick(() => settoggleDropdown(false));

  useEffect(() => {
    async function setUpProviders() {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between mb-16 pt-3">
      <Link href="/" className="flex-center flex">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="nav__list-box">
        {session?.user ? (
          <div className="nav__list">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              className="black_btn"
              onClick={() => signIn(provider.id)}
              key={provider.name}
            >
              Sign In
            </button>
          ))
        )}
      </div>

      {/* {Mobile Navigation} */}
      <div className="mobile_nav">
        {session?.user ? (
          <div>
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                console.log(toggleDropdown);
                settoggleDropdown((toggle) => !toggle);
              }}
            />

            {toggleDropdown && (
              <div ref={ref} className="dropdown">
                <Link className="dropdown_link" href="/profile">
                  My Profile
                </Link>

                <Link href="/create-prompt" className="dropdown_link">
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="w-full mt-5 black_btn"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              className="black_btn"
              onClick={() => signIn(provider.id)}
              key={provider.name}
            >
              Sign In
            </button>
          ))
        )}
      </div>
    </nav>
  );
}

export default Nav;
