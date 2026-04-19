import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { GlobalVariables } from "@/globalVariables";
import { Admin } from "@/lib/generated/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any): Promise<any> {
        try {
          let learner = await prisma.learner.findUnique({
            where: { email: credentials.email }
          })

          let userType = GlobalVariables.non_admin.role1;
          let admin

          if (!learner) {
            admin = await prisma.admin.findUnique({ where: { email: credentials.email } })
            if (!admin) {
              return null;
            }
            userType = GlobalVariables.admin
          }

          const user = admin || learner
          const isPasswordValid = await bcrypt.compare(credentials.password, user!.password!)
          if (!isPasswordValid) {
            return null;
          }

          if (userType === GlobalVariables.admin) {
            await prisma.admin.update({
              where: { email: credentials.email },
              data: { lastLogin: new Date() },
            })
          }

          const userData = {
            id: user!.id,
            email: user!.email,
            role: userType,
            adminType: userType === GlobalVariables.admin ? (user as Admin).adminType : undefined,
          }
          return userData

        } catch (err) {
          return null;
        }
      }
    }),

    // 🌐 Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/youtube.force-ssl",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {

      // Google login
      if (account?.provider === "google") {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token

        // ensure user exists in DB
        const existingUser = await prisma.learner.findUnique({
          where: { email: token.email! },
        })

        if (!existingUser) {
          const fullName = token.name?.trim() || "Google User"

          const parts = fullName.split(" ")

          const first_name = parts[0] || "User"
          const last_name = parts.slice(1).join(" ") || "User"

          if (!token.email) {
            throw new Error("Google account has no email")
          }
          const newUser = await prisma.learner.create({
            data: {
              email: token.email,
              first_name,
              last_name,
              role: GlobalVariables.non_admin.role1,
            },
          })

          token.id = newUser.id
          token.role = GlobalVariables.non_admin.role1
        } else {
          token.id = existingUser.id
          token.role = GlobalVariables.non_admin.role1
        }
      }
      if (user) {
        token.id = Number(user.id)
        token.role = user.role
        token.adminType = user.adminType
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id)
        session.user.role = token.role
        session.user.adminType = token.adminType
        session.user.email = token.email
      }

      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string

      return session
    },

  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
}