import NotFound from "@/components/not-found";
import SearchpageClient from "@/components/SearchpageClient";
import { serializeCourse } from "@/lib/utils";
import { CourseService } from "@/services/courseService";
import { CourseMinimal } from "@/types/course";

export default async function SearchPage() {

  let message = '';
  let coursesData: CourseMinimal[] | null = null;
  let categoriesData: { category: string }[] | null = null;
  try {
    const { fetchAllCourses, fetchAllCategories } = CourseService;

    const [unSerializedCoursesData, unSerializedCategoriesData] = await Promise.all([
      fetchAllCourses(),
      fetchAllCategories(),
    ]);

    coursesData = unSerializedCoursesData.map(serializeCourse)
    categoriesData = unSerializedCategoriesData.map(serializeCourse)

  } catch (error: unknown) {


    message = "Internal Server Error"

    if (error instanceof Error) {
      message = error.message
    }

  }

  if (!coursesData || !categoriesData)
    return <NotFound resource="courses" message={message} />

  const categories = categoriesData.map((cat: { category: string }) => cat.category)
  return (<SearchpageClient courses={coursesData} courseCategories={categories} />
  );

}
