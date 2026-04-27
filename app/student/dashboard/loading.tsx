export default function DashboardSkeleton() {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 animate-pulse">
        
        {/* Header */}
        <section className="mb-6">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-2 relative overflow-hidden">
            <div className="shimmer absolute inset-0"></div>
          </div>
          <div className="h-4 w-1/2 bg-gray-200 rounded relative overflow-hidden">
            <div className="shimmer absolute inset-0"></div>
          </div>
        </section>
  
        {/* Progress Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>
          ))}
        </div>
  
        {/* Section Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-5 w-40 bg-gray-200 rounded relative overflow-hidden">
            <div className="shimmer absolute inset-0"></div>
          </div>
          <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
            <div className="shimmer absolute inset-0"></div>
          </div>
        </div>
  
        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4">
              
              <div className="h-40 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                <div className="shimmer absolute inset-0"></div>
              </div>
  
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 relative overflow-hidden">
                <div className="shimmer absolute inset-0"></div>
              </div>
  
              <div className="h-3 w-1/2 bg-gray-200 rounded relative overflow-hidden">
                <div className="shimmer absolute inset-0"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }