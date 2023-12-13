"use client";
import "@styles/globals.css";
import Nav from "@ui/Nav";
import Provider from "@ui/Provider";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Promptopia",
//   description: "Discover & share AI Prompts",
// };

function RootLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    async function useSession() {
      const session = await getSession();

      if (!session?.user?.id) return router.push("/");
    }

    useSession();
  }, []);
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="container">
              <div className="gradient"></div>
              <Nav />
              <main className="app">{children}</main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
