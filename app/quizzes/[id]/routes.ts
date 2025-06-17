import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { QuizModel } from "@/models/course-content.models"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await req.json()
    const updatedQuiz = await QuizModel.findByIdAndUpdate(params.id, data, { new: true })
    return NextResponse.json({ success: true, updatedQuiz, message: "Quiz updated" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update quiz" }, { status: 500 })
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const deletedQuiz = await QuizModel.findByIdAndDelete(params.id)
    if (!deletedQuiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Quiz deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete quiz" }, { status: 500 })
  }
}