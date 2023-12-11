import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@app/utils/database";
import { User } from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: "Credentials",
    //   type: "credentials",
    //   // `credentials` is used to generate a form on the sign in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // Add logic here to look up the user from the credentials supplied
    //     // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
    //     try {
    //       await connectToDB();
    //       const user = await User.findOne({
    //         email: credentials.email,
    //       });

    //       if (user.auth_type !== "credentials")
    //         throw new Error("Try logging in with your google account");
    //       if (credentials.password !== user.password) {
    //         throw new Error("Invalid user credentials");
    //       }

    //       return user;
    //     } catch (e) {
    //       return null;
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async session({ session }) {
      console.log(session);
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      console.log(session);
      return session;
    },
    async signIn({ profile, account: { provider } }) {
      if (provider === "credentials") return true;
      try {
        await connectToDB();

        // For Provider sign in we need to check if the user has previously been signed in
        // if not then we register them on our app
        // check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        console.log(userExists);
        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            auth_type: provider,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
