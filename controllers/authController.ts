import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { prisma } from '@/lib/prisma';
import { Admin, Learner } from "@/lib/generated/prisma";
import { GlobalVariables } from "@/globalVariables";
import { Course } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "123456"

export class AuthController {
  static async login(req: NextRequest) {
    try {
      const { email, password } = await req.json()

      if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
      }

      let learner = await prisma.learner.findUnique({
        where: { email }
        , include: {
          enrollments: {

            include: {
              program: {
                include: {

                  programModules: {
                    include: {
                      module: {
                        include: {
                          moduleTopics: {
                            select: {
                              topicId: true
                            }
                          }
                        }
                      }
                    }
                  },

                  enrollments: {
                    select: {
                      learnerId: true,
                    }
                  }
                },
              }
            }
          }
        }
      })
      let userType = `${GlobalVariables.non_admin}`;
      let enrolledCourses: any[] = [];
      let enrolledCourseIDs: Number[] = [];
      let admin;
      if (!learner) {
        admin = await prisma.admin.findUnique({ where: { email } })
        if (!admin) {
          return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        userType = `${GlobalVariables.admin}`
      } else {
        enrolledCourses = learner.enrollments.map((enrollment) => enrollment.program);
        enrolledCourseIDs = learner.enrollments.map((enrollment) => enrollment.program.id);
      }

      const user = admin || learner
      if (!user!.password) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }
      const isPasswordValid = await bcrypt.compare(password, user!.password as string)
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      // Update lastLogin for Admin
      if (userType === `${GlobalVariables.admin}`) {
        await prisma.admin.update({
          where: { email },
          data: { lastLogin: new Date() },
        })
      }

      const token = jwt.sign(
        {
          id: user!.id,
          email: user!.email,
          role: userType,
          adminType: userType === `${GlobalVariables.admin}` ? (user as Admin).adminType : undefined,
        },
        JWT_SECRET,
        { expiresIn: "7d" },
      )

      const userData = {
        id: user!.id,
        email: user!.email,
        first_name: user!.first_name,
        last_name: user!.last_name,
        profile_image: user!.profile_image || "",
        role: userType,
        adminType: userType === `${GlobalVariables.admin}` ? (user as Admin).adminType : undefined,
        enrolledCourses,
        enrolledCourseIDs
      }

      return NextResponse.json({ success: true, user: userData, token })

    } catch (error) {
      console.error("Login error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  }

  static async signup(req: NextRequest) {
    try {
      const { first_name, last_name, email, password, role = `${GlobalVariables.non_admin}` } = await req.json()

      if (!first_name || !last_name || !email || !password) {
        return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
      }

      const existingUser = await prisma.learner.findUnique({ where: { email } })
      const existingAdmin = await prisma.admin.findUnique({ where: { email } })

      if (existingUser || existingAdmin) {
        return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      let newUser
      if (role === `${GlobalVariables.admin}`) {
        newUser = await prisma.admin.create({
          data: {
            first_name: first_name,
            last_name: last_name,
            email,
            password: hashedPassword,
            adminType: "PartnerAdmin",
          },
        })
      } else {
        newUser = await prisma.learner.create({
          data: {
            first_name: first_name,
            last_name: last_name,
            email,
            role,
            password: hashedPassword,
          },
        })
      }

      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
          role,
          adminType: role === `${GlobalVariables.admin}` ? (newUser as Admin).adminType : undefined,
        },
        JWT_SECRET,
        { expiresIn: "7d" },
      )

      const userData = {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser!.last_name,
        email: newUser.email,
        role,
        adminType: role === `${GlobalVariables.admin}` ? (newUser as Admin).adminType : undefined,
        enrolledCourses: [],
      }

      return NextResponse.json({
        success: true,
        user: userData,
        token,
        message: "Account created successfully",
      })
    } catch (error) {
      console.error("Signup error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  }
}
