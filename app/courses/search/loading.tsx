export default function Loading() {
  return (
    <div className="flex min-h-screen animate-pulse bg-white text-black">
      {/* Sidebar Filters */}
      <aside className="w-72 p-6 border-r border-gray-200 space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-5 w-20 bg-black opacity-10 rounded" />
          <div className="h-4 w-16 bg-black opacity-10 rounded" />
        </div>

        {/* Price Slider */}
        <div className="space-y-3">
          <div className="h-4 w-20 bg-black opacity-10 rounded" />
          <div className="h-2 w-full bg-black opacity-10 rounded" />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-black opacity-10 rounded" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-3 w-40 bg-black opacity-10 rounded" />
          ))}
        </div>

        {/* Level */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-black opacity-10 rounded" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-3 w-32 bg-black opacity-10 rounded" />
          ))}
        </div>

        {/* Ratings */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-black opacity-10 rounded" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-3 w-36 bg-black opacity-10 rounded" />
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-10">
        {/* Search header */}
        <div className="space-y-4">
          <div className="h-6 w-64 bg-black opacity-10 rounded" />
          <div className="h-10 w-full max-w-xl bg-black opacity-10 rounded" />
          <div className="h-4 w-32 bg-black opacity-10 rounded" />
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl bg-white p-4 space-y-4"
            >
              <div className="h-4 w-16 bg-black opacity-10 rounded" /> {/* Featured badge */}
              <div className="h-4 w-16 bg-black opacity-10 rounded" /> {/* Level */}
              <div className="h-6 w-3/4 bg-black opacity-10 rounded" /> {/* Title */}
              <div className="h-4 w-full bg-black opacity-10 rounded" /> {/* Description */}

              {/* Instructor */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black opacity-10" />
                <div className="h-3 w-24 bg-black opacity-10 rounded" />
              </div>

              {/* Stats */}
              <div className="flex justify-between text-sm">
                <div className="h-3 w-8 bg-black opacity-10 rounded" />
                <div className="h-3 w-8 bg-black opacity-10 rounded" />
                <div className="h-3 w-8 bg-black opacity-10 rounded" />
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="h-3 w-1/2 bg-black opacity-10 rounded" />
                <div className="h-2 w-full bg-black opacity-10 rounded-full" />
              </div>

              {/* Button */}
              <div className="h-8 w-32 bg-black opacity-10 rounded-full" />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
