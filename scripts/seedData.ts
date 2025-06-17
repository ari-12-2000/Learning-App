import connectDB from "@/lib/db"
import Course from "@/models/course-content.models"
import Admin from "@/models/admin"
import User from "@/models/user-progress.models"

const sampleCourses = [
  {
    title: "React Fundamentals",
    slug: "react-fundamentals",
    description: "Master the fundamentals of React and build modern web applications",
    instructor: "Sarah Johnson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    students: 12543,
    duration: "8 weeks",
    level: "Beginner",
    price: 89,
    category: "Web Development",
    image: "bg-gradient-to-br from-blue-400 to-blue-600",
    modules: 12,
    lessons: 48,
    featured: true,
  },
  {
    title: "Complete UI/UX Design Course",
    slug: "ui-ux-design",
    description: "Learn to design beautiful and user-friendly interfaces",
    instructor: "Mike Chen",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    students: 8932,
    duration: "10 weeks",
    level: "Intermediate",
    price: 129,
    category: "UI/UX Design",
    image: "bg-gradient-to-br from-purple-400 to-pink-600",
    modules: 15,
    lessons: 62,
    featured: true,
  },
  {
    title: "Python for Data Science",
    slug: "python-data-science",
    description: "Comprehensive Python course for data analysis and machine learning",
    instructor: "Dr. Emily Rodriguez",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    students: 15678,
    duration: "12 weeks",
    level: "Intermediate",
    price: 149,
    category: "Data Science",
    image: "bg-gradient-to-br from-green-400 to-teal-600",
    modules: 18,
    lessons: 75,
    featured: true,
  },
]

export async function seedDatabase() {
  try {
    await connectDB()

    // Create a default admin
    const adminExists = await Admin.findOne({ email: "admin@example.com" })
    let adminId

    if (!adminExists) {
      const admin = new Admin({
        name: "System Admin",
        email: "admin@example.com",
        password: "admin123",
        adminType: "SystemAdmin",
        isVerified: true,
      })
      await admin.save()
      adminId = admin._id
      console.log("Default admin created")
    } else {
      adminId = adminExists._id
    }

    // Create sample courses
    const courseExists = await Course.findOne({ slug: "react-fundamentals" })
    if (!courseExists) {
      const coursesWithAuthor = sampleCourses.map((course) => ({
        ...course,
        author: adminId,
      }))

      await Course.insertMany(coursesWithAuthor)
      console.log("Sample courses created")
    }

    // Create a sample student
    const studentExists = await User.findOne({ email: "student@example.com" })
    if (!studentExists) {
      const student = new User({
        name: "Alex Johnson",
        email: "student@example.com",
        password: "student123",
        role: "student",
      })
      await student.save()
      console.log("Sample student created")
    }

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}
