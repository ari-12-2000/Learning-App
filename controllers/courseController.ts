import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import sanitizeHtml from 'sanitize-html';
import { tr } from 'date-fns/locale';
import { serializeBigInt } from '@/lib/server-utils';
export class CourseController {
  // Course related methods
  static async getAllCourses() {
    try {
      const courses = await prisma.program.findMany({
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
        orderBy: {
          createdAt: 'desc',
        },
      });
      return NextResponse.json({ success: true, data: courses });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
    }
  }

  static async getCourseById({ params }: { params: Promise<{ programId: string }> }) {
    try {
      const program = await prisma.program.findUnique({
        where: { id: Number((await params).programId) },
        include: {
          programModules: {
            include: {
              module: {
                include: {
                  moduleTopics: {
                    include: {
                      topic: {
                        include:{
                          topicResources:{
                            include:{
                              resource:{
                                select:{
                                  resourceType:true
                                }
                              }
                            }
                          }
                        }
                      }
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
        }
      });

      if (!program) {
        return NextResponse.json({ error: 'Program not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: program });
    } catch (error) {
      console.log("Get program error:", error); // LOG FULL ERROR
      return NextResponse.json({ error: 'Failed to fetch program' }, { status: 500 });
    }
  }


  static async createCourse(req: NextRequest) {
    try {
      const data = await req.json();
      const program = await prisma.program.create({ data });
      return NextResponse.json({ success: true, data: program });
    } catch (error) {
      console.error("Create program error:", error) // LOG FULL ERROR
      return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
    }
  }

  static async updateCourse(req: NextRequest, { params }: { params: Promise<{ programId: string }> }) {
    try {
      const data = await req.json();
      const updated = await prisma.program.update({
        where: { id: Number((await params).programId) },
        data,
      });
      return NextResponse.json({ success: true, data: updated });
    } catch (error) {
      console.error("Update program error:", error) // LOG FULL ERROR 
      return NextResponse.json({ error: 'Failed to update program' }, { status: 500 });
    }
  }

  static async deleteCourse(req: NextRequest, { params }: { params: Promise<{ programId: string }> }) {
    try {
      await prisma.program.delete({
        where: { id: Number((await params).programId) },
      });
      return NextResponse.json({ success: true, message: 'Program deleted' });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete program' }, { status: 500 });
    }
  }
  static async getEnrolledStudents(req: NextRequest, { params }: { params: Promise<{ programId: string }> }) {

    try {
      const { programId } = await params;
      const enrollments = await prisma.enrollment.findMany({
        where: { programId: Number(programId) },
        include: {
          learner: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              profile_image: true,
            },
          },
        },
      });

      return NextResponse.json({ success: true, data: enrollments });
    } catch (error) {
      console.error("Get enrolled students error:", error); // LOG FULL ERROR
      return NextResponse.json({ error: 'Failed to fetch enrolled students' }, { status: 500 });
    }
  }
  static async getCourseCategories() {
    try {
      const categories = await prisma.program.findMany({
        select: { category: true },
        distinct: ['category'],
      });
      return NextResponse.json({ success: true, data: categories });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
  }

  //Map programs with modules
  static async mapProgramsandmodules(req: NextRequest, { params }: { params: Promise<{ programId: string, moduleId: string }> }) {
    try {
      const { programId, moduleId } = await params;
      const { position } = await req.json();
      const mapping = await prisma.programModule.create({
        data: { programId: Number(programId), moduleId: Number(moduleId), position: Number(position) },
      });

      return NextResponse.json({ success: true, data: mapping });
    } catch (error) {
      console.error("Map modules and programs error:", error); // LOG FULL ERROR
      return NextResponse.json({ error: 'Failed to map modules and programs' }, { status: 500 });
    }
  }

  // // Map modules and resources
  // static async mapModulesAndResources(req: NextRequest, { params }: { params: Promise<{ programId: string, resourceId: string, moduleId: string, topicId: string }> }) {
  //   try {
  //     const { programId, resourceId, moduleId, topicId } = await params;

  //     const mapping = await prisma.resourceMapping.create({
  //       data: { programId: Number(programId), moduleId: Number(moduleId), resourceId: Number(resourceId), topicId: Number(topicId) },
  //     });

  //     return NextResponse.json({ success: true, data: mapping });
  //   } catch (error) {
  //     console.error("Map modules and resources error:", error); // LOG FULL ERROR
  //     return NextResponse.json({ error: 'Failed to map modules and resources' }, { status: 500 });
  //   }
  // }




}

