import { prisma } from "@/lib/prisma";

export class CourseService {

    static async fetchAllCourses() {
        return prisma.program.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                description: true,
                instructor: true,
                instructorAvatar: true,
                image: true,
                totalTimeLimit:true,
                rating:true,
                level:true,
                _count: {
                    select: {
                        enrollments: true,
                        programModules: true // optional
                    }
                },
                category:true,
                programModules: {
                    select: {
                        module: {
                            select: {
                                moduleTopics:{
                                    select:{
                                        topicId:true
                                    }
                                }
                            }
                        }
                    }
                },
                quizzes: {
                    select: {
                        id: true
                    }
                }
            },
            orderBy: {
                createdAt: 'asc' // 👈 old → new
            }
        });
    }

    static async fetchCourseById(programId: string) {
        return prisma.program.findUnique({
            where: { id: Number(programId) },
            select: {
                id: true,
                title: true,
                price: true,
                description: true,
                instructor: true,
                instructorAvatar: true,
                image: true,
                totalTimeLimit:true,
                rating:true,
                level:true,
                _count: {
                    select: {
                        enrollments: true,
                        programModules: true // optional
                    }
                },
                category:true,
                programModules: {
                    select: {
                        module: {
                            select: {
                                moduleTopics:{
                                    select:{
                                        topicId:true
                                    }
                                }
                            }
                        }
                    }
                }
            },
        });
    }

    static async fetchAllCategories(){
        return prisma.program.findMany({
                select: { category: true },
                distinct: ['category'],
              });
    }
}