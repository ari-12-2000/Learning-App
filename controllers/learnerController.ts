import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { serializeBigInt } from '@/lib/server-utils';

export class LearnerController {
  // Learner related methods
  static async getEnrolledCourses({ params }: { params: { learnerId: string } }) {
    try {
      const { learnerId } = await params;
      const enrollment = await prisma.enrollment.findMany({
        where: { learnerId: Number(learnerId) },
        include: {
          program: {
            include: {
              resources: {
                select: { //include keyword is used to include related tables and select keyword is used to select specific fields
                  moduleId: true,
                  topicId: true,
                  
                }
              },
              enrollments: {
                select: {
                  learnerId: true,
                }
              }
            },
            
          }, // Include the program details         
        },
      });
      return NextResponse.json({ success: true, data: enrollment });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch the learner enrolled courses' }, { status: 500 });
    }
  }

  //Enrollment related methods
  static async enrolInCourses(req: NextRequest, { params }: { params: { learnerId: string } }) {
    try {

      const { programId } = await req.json();
      const { learnerId } = await params;
      // Check if the learner is already enrolled
      const existingEnrollment = await prisma.enrollment.findFirst({
        where: {
          learnerId: Number(learnerId),
          programId: Number(programId),
        },
      });

      if (existingEnrollment) {
        return NextResponse.json({ error: 'Already enrolled in this course' }, { status: 400 });
      }

      // Create a new enrollment
      const enrollment = await prisma.enrollment.create({
        data: {
          learnerId: Number(learnerId),
          programId: Number(programId),
        },
      });

      return NextResponse.json({ success: true, data: enrollment });
    } catch (error) {
      console.error("Enroll in course error:", error); // LOG FULL ERROR
      return NextResponse.json({ error: 'Failed to enroll in course' }, { status: 500 });
    }
  }
  static async unenrollFromCourse(req: NextRequest, { params }: { params: { learnerId: string } }) {
    try {
      const { programId } = await req.json();
      const { learnerId } = await params;
      // Find the enrollment to delete
      const enrollment = await prisma.enrollment.findFirst({
        where: {
          learnerId: Number(learnerId),
          programId: Number(programId),
        },
      });

      if (!enrollment) {
        return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
      }

      // Delete the enrollment
      await prisma.enrollment.delete({
        where: { id: enrollment.id },
      });

      return NextResponse.json({ success: true, message: 'Unenrolled successfully' });
    } catch (error) {
      console.error("Unenroll from course error:", error); // LOG FULL ERROR
      return NextResponse.json({ error: 'Failed to unenroll from course' }, { status: 500 });
    }
  }
}