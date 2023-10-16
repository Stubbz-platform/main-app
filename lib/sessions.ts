import type { NextAuthOptions, User as NextUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import WikimediaProvider from "next-auth/providers/wikimedia"

import connectToDB  from "./connections";
import User from "@/Models/users";
import bcrypt from "bcryptjs"
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    WikimediaProvider({
      clientId: "print",
      clientSecret: "the",
      userinfo:
        "https://meta.wikimedia.beta.wmflabs.org/w/rest.php/oauth2/resource/profile",
      token:
        "https://meta.wikimedia.beta.wmflabs.org/w/rest.php/oauth2/access_token",
      authorization: {
        url: "https://meta.wikimedia.beta.wmflabs.org/w/rest.php/oauth2/authorize",
        params: { scope: "" },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Emal",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await connectToDB();
        try {
          const currentUser = await User.findOne({ email: credentials?.email });
          if (!currentUser) {
            return null;
          } else {
            const isPasswordCorrect = await bcrypt.compare(
              credentials?.password!,
              currentUser.password
            );
            if (isPasswordCorrect) {
              return currentUser;
            } else {
              throw new Error("Incorrect Password Entered");
            }
          }
        } catch (error) {
          console.log({ error });
        }
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;
      try {
        const sessionUser = await User.findOne({
          email: email,
        });

        const newSession = {
          ...session,
          user: {
            ...session.user,
            id: sessionUser._id.toString(),
          },
        };
        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ user, credentials }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({
          email: user?.email,
        });
        if (!userExists) {
          await User.create({
            email: user?.email,
            name: user?.name,
            image: user?.image,
            connectedWallet: false,
          });
        }
        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/login/error",
    newUser: "/sign-in",
  },
};



