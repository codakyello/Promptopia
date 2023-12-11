import "@styles/globals.css";
import Nav from "@ui/Nav";
import Provider from "@ui/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};
function RootLayout({ children }) {
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
