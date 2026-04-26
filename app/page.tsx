import HomeClientWrapper from '@/components/HomeClientWrapper';
import NotFound from '@/components/not-found';
import { serializeCourse } from '@/lib/utils';
import { CourseService } from '@/services/courseService';
import { CourseMinimal } from '@/types/course';
import React from 'react'


const HomePage = async () => {

  let message = '';
  let coursesData: CourseMinimal[] | null = null;
  let categoriesData: { category: string }[] | null = null;
  try {
    const { fetchAllCourses, fetchAllCategories } = CourseService;

    const [unSerializedCoursesData, categories] = await Promise.all([
      fetchAllCourses(),
      fetchAllCategories(),
    ]);

    coursesData = unSerializedCoursesData.map(serializeCourse)
    categoriesData = categories

  } catch (error: unknown) {

    console.log(error);
    message = "Internal Server Error"

  }

  if (!coursesData || !categoriesData)
   return <div className="min-h-screen flex items-center justify-center"><NotFound resource="courses" message={message} /></div>
  else return <HomeClientWrapper courses={coursesData} categories={categoriesData} />
}


export default HomePage;