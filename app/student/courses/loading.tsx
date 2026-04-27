export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 md:px-8 py-16 md:py-24 animate-pulse">
      
      {/* Header */}
      <div className="mb-10 flex flex-col items-center">
        <div className="h-8 w-72 bg-gray-200 rounded mb-3 relative overflow-hidden">
          <div className="shimmer absolute inset-0"></div>
        </div>

        <div className="h-4 w-96 max-w-full bg-gray-200 rounded relative overflow-hidden">
          <div className="shimmer absolute inset-0"></div>
        </div>
      </div>

      {/* Courses Grid (IMPORTANT: same as CoursesList layout) */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-6
      ">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 text-left">
            
            {/* Image */}
            <div className="h-40 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>

            {/* Title */}
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>

            {/* Subtitle */}
            <div className="h-3 w-1/2 bg-gray-200 rounded mb-3 relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>

            {/* Button */}
            <div className="h-8 w-24 bg-gray-200 rounded relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}