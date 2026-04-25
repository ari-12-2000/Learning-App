"use client";
import { useState, createContext, useContext, type ReactNode, Dispatch, SetStateAction } from "react";
import { Course } from "@/types/course";

interface CourseContextType {
  courses: Course[] | null;
  loading: boolean;
  filterCategory: string;
  categories: any;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFilterCategory: Dispatch<SetStateAction<string>>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({
  children,
  initialCourses,
  categories,
}: {
  children: ReactNode;
  initialCourses: Course[];
  categories: { category: string }[];
}) {
  const [courses] = useState<Course[] | null>(initialCourses || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState("");

  return (
    <CourseContext.Provider
      value={{
        courses,
        categories,
        loading,
        filterCategory,
        setLoading,
        setFilterCategory,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) throw new Error("useCourses must be used within a CourseProvider");
  return context;
}
