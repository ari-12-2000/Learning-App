import HomeClientWrapper from '@/components/HomeClientWrapper';
import NotFound from '@/components/not-found';
import { serializeCourse } from '@/lib/utils';
import { CourseService } from '@/services/courseService';
import { CourseMinimal } from '@/types/course';
import React from 'react'

export const revalidate= 60;

const HomePage = async () => {
  let message = '';
  let coursesData: CourseMinimal[] | null = null;
  let categoriesData: {category: string}[] | null = null;
  try {
    const { fetchAllCourses, fetchAllCategories} = CourseService;

   const [unSerializedCoursesData, categories] = await Promise.all([
      fetchAllCourses(),
      fetchAllCategories(),
    ]);

   coursesData= unSerializedCoursesData.map(serializeCourse)
   categoriesData= categories
 
  } catch (error: unknown) {


    message = "Internal Server Error"

    if (error instanceof Error) {
      message = error.message
    }

  }

  if (!coursesData || !categoriesData)
    return <NotFound resource="courses" message={message} />


  return (
    <HomeClientWrapper
      courses={coursesData}
      categories={categoriesData} // Pass preprocessed categories
    />
  );
}

export default HomePage