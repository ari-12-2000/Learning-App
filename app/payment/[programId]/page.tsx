import React from 'react'
import PaymentClientWrapper from '../../../components/PaymentClientWrapper';
import NotFound from '@/components/not-found';
import { CourseService } from '@/services/courseService';
import { CourseMinimal } from '@/types/course';
import { serializeCourse } from '@/lib/utils';

const PaymentPage = async ({params}: {params: Promise<{programId: string}>}) => {

  let message = '';
  let course: CourseMinimal | null = null;
  const { programId } = await params;
  try {  
    const { fetchCourseById } = CourseService;
    const unSerializedCourse = await fetchCourseById(programId);
    course = serializeCourse(unSerializedCourse);

  } catch (error: unknown) {

    console.log(error);
    message = "Internal Server Error"

  }

  if (!course)
    return <div className="min-h-screen flex items-center justify-center"><NotFound resource="course" message={message} /></div>
  else return <PaymentClientWrapper programId={programId} course={course} />
}

export default PaymentPage