"use client"

export default function Loading() {
  return (
    <div className="flex min-h-screen animate-pulse text-black">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-4">
        <div className="h-10 w-3/4 bg-black opacity-10 rounded" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 w-1/2 bg-black opacity-10 rounded" />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-12 bg-gray-50">
        {/* Search bar */}
        <div className="h-10 w-full max-w-md bg-black opacity-10 rounded mx-auto" />

        {/* Category Section */}
        <div className="text-center space-y-6">
          <div className="h-6 w-64 bg-black opacity-10 rounded mx-auto" />
          <div className="h-4 w-96 bg-black opacity-10 rounded mx-auto" />
          <div className="flex gap-6 mt-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 w-40 bg-black opacity-10 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Available Courses Heading */}
        <div className="text-center space-y-3">
          <div className="h-6 w-64 bg-black opacity-10 rounded mx-auto" />
          <div className="h-4 w-96 bg-black opacity-10 rounded mx-auto" />
        </div>

        {/* Course Cards */}
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
      </div>
    </div>
  )
}
