
export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 animate-pulse space-y-8">
      {/* Hero Section */}
      <div className="h-64 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side – Course Info & Modules */}
        <div className="lg:col-span-2 space-y-8">
          {/* About This Course */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <div className="h-6 w-48 bg-gray-300 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>

            {/* Total Topics */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="h-3 w-24 bg-gray-300 mb-2 rounded" />
                <div className="h-6 w-6 bg-gray-400 rounded" />
              </div>
            </div>
          </div>

          {/* Course Modules */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div className="h-6 w-48 bg-gray-300 rounded" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gray-300 rounded-full" />
                  <div className="h-4 w-1/2 bg-gray-300 rounded" />
                </div>
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="h-4 w-3/4 bg-gray-200 rounded ml-11" />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Instructor */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <div className="h-5 w-24 bg-gray-300 rounded" />
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full" />
              <div className="h-4 w-32 bg-gray-300 rounded" />
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <div className="h-5 w-24 bg-gray-300 rounded" />
            <div className="flex justify-between">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-8 bg-gray-300 rounded" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-300 rounded" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
