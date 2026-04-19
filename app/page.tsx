"use client"
import { TrendingUp, ArrowRight, Award, BookOpen, Code, Palette, Database, BarChartBig, Brain, Megaphone, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { CoursesList } from "@/components/courses-list"
import { useCourses } from "@/contexts/course-context"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useSession } from "next-auth/react"
import { cn, slides } from "@/lib/utils"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
const categoryIcons = {
  "web development": { icon: Code, color: "bg-blue-500" },
  "ui/ux design": { icon: Palette, color: "bg-purple-500" },
  "database": { icon: Database, color: "bg-green-500" },
  "data science": { icon: BarChartBig, color: "bg-green-500" },
  "machine learning": { icon: Brain, color: "bg-red-500" },
  "digital marketing": { icon: Megaphone, color: "bg-orange-500" },
} as const;


export default function HomePage() {
  const router = useRouter()
  const { courses, filterCategory, setFilterCategory } = useCourses();
  const { isLoading } = useAuth();
  const { status } = useSession();

  const [startX, setStartX] = useState(0);

  const [index, setIndex] = useState(0);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current)
      clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 3000)
  }, [])

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);

  }, []);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  }, []);

  const pauseAutoSlide = useCallback(() => {
    console.log("pause")
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoSlide]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) next();       // swipe left
    if (diff < -50) prev();      // swipe right
  }, [startX, next, prev]);

  const handleCategoryClick = (categoryName: string) => {
    console.log(categoryName);
    setFilterCategory(categoryName);
    router.push("/courses/search/");
  }

  const handleBrowseCatalog = () => {
    if (filterCategory)
      setFilterCategory("");
    router.push("/courses/search/")
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Carousel Section */}
      <section
        className="relative w-full overflow-hidden bg-white"
        onMouseEnter={pauseAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        <div
          className="flex transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, i) => {

            const isActive = i === index;
            return (
              <div
                key={i}
                className="min-w-full w-full shrink-0 relative h-96 md:h-screen max-h-[600px] md:max-h-[700px] flex items-center justify-center overflow-hidden"
              >
                {/* Background Image */}
                {slide.bgImg && isActive && (
                  <Image
                    src={slide.bgImg}
                    alt={slide.alt}
                    fill
                    className="absolute inset-0 object-cover"
                    priority={i === 0}
                    sizes="100vw"
                  />
                )}

                {/* Solid background for non-image slides */}
                {!slide.bgImg && (
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
                  }} />
                )}

                {/* Professional Gradient Overlay */}
                <div className={cn(
                  "absolute inset-0 transition-opacity duration-300",
                  slide.bgImg
                    ? "bg-gradient-to-r from-black/75 via-black/60 to-black/45"
                    : "bg-gradient-to-b from-black/20 via-transparent to-black/10"
                )} />

                {/* Content Container */}
                <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-12 max-w-5xl mx-auto py-12 md:py-0">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-balance drop-shadow-xl">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg opacity-95">
                    {slide.desc}
                  </p>

                  {/* CTA Buttons - Only on first slide */}
                  {i === 0 && (
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 md:mb-12">
                      <Button
                        size="lg"
                        className="bg-white text-slate-900 hover:bg-slate-100 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold 
                      rounded-lg 
                      shadow-lg hover:shadow-2xl 
                      transition-all duration-300 
                      flex items-center gap-2 
                      w-full sm:w-auto

                      hover:scale-[1.03] 
                      active:scale-[0.98]

                      border border-transparent hover:border-slate-200
                    "
                        onClick={handleBrowseCatalog}
                      >
                        <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                        Browse Courses
                      </Button>

                    </div>
                  )}

                  {/* Stats - Only on first slide */}
                  {i === 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto mt-8 md:mt-12">
                      <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 md:p-6 border border-white/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-blue-300" />
                          <span className="text-2xl md:text-3xl font-bold">95%</span>
                        </div>
                        <p className="text-sm md:text-base text-blue-100">Success Rate</p>
                      </div>
                      <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 md:p-6 border border-white/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-blue-300" />
                          <span className="text-2xl md:text-3xl font-bold">10K+</span>
                        </div>
                        <p className="text-sm md:text-base text-blue-100">Online Courses</p>
                      </div>
                      <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 md:p-6 border border-white/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Award className="h-5 w-5 md:h-6 md:w-6 text-blue-300" />
                          <span className="text-2xl md:text-3xl font-bold">500+</span>
                        </div>
                        <p className="text-sm md:text-base text-blue-100">Expert Instructors</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 sm:p-3 md:p-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-300 shadow-lg group focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous slide"
          onMouseEnter={pauseAutoSlide}
          
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={next}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 sm:p-3 md:p-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-300 shadow-lg group focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next slide"
          onMouseEnter={pauseAutoSlide}
          

        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20"
          onMouseEnter={pauseAutoSlide}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i)
              }}
              className={cn(
                "transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50",
                i === index
                  ? "w-8 h-2.5 bg-white shadow-lg"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : "false"}
            />
          ))}
        </div>
      </section>



      {/* Categories Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Choose from our wide range of categories and start your learning journey today
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Object.entries(categoryIcons).map(([category, { icon: Icon, color }]) => (
            <Card
              key={category}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md group bg-white"
              onClick={() => handleCategoryClick(category)}
            >
              <CardContent className="p-6 text-center flex flex-col items-center">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="font-semibold text-sm md:text-base text-slate-900 group-hover:text-blue-600 transition-colors capitalize text-center leading-snug">
                  {category}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Available Courses
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                Discover our most popular courses taught by industry experts
              </p>
            </div>

            <Link href="/courses/search" className="text-lg text-blue-600 hover:underline flex items-center max-sm:hidden">
              View all courses →
            </Link>
          </div>

          {status == 'loading' || isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl bg-white p-4 space-y-3"
                >
                  {/* Top badge */}
                  <div className="h-4 w-20 bg-black opacity-10 rounded" />
                  {/* Level and rating */}
                  <div className="h-4 w-16 bg-black opacity-10 rounded" />
                  {/* Title */}
                  <div className="h-5 w-3/4 bg-black opacity-10 rounded" />
                  {/* Description */}
                  <div className="h-3 w-full bg-black opacity-10 rounded" />
                  {/* Instructor */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-8 h-8 rounded-full bg-black opacity-10" />
                    <div className="h-3 w-20 bg-black opacity-10 rounded" />
                  </div>
                  {/* Stats */}
                  <div className="flex justify-between text-sm">
                    <div className="h-3 w-8 bg-black opacity-10 rounded" />
                    <div className="h-3 w-8 bg-black opacity-10 rounded" />
                    <div className="h-3 w-8 bg-black opacity-10 rounded" />
                  </div>
                  {/* Button */}
                  <div className="h-6 w-24 bg-black opacity-10 rounded-full mt-4 ml-auto" />
                </div>
              ))}
            </div>
          ) : (<>
            <CoursesList courses={courses!.slice(0, 3)} />
            <Link href="/courses/search" className="text-lg text-blue-600 hover:underline flex items-center justify-center md:hidden mt-4">
              View all courses →
            </Link>
          </>
          )}
        </div>
      </section>

    </div>
  )
}

